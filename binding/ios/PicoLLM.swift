//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import PvPicoLLM

// Usage information.
public struct PicoLLMUsage: Codable {
    public let promptTokens: Int

    public let completionTokens: Int

    public init(
        promptTokens: Int,
        completionTokens: Int) {
        self.promptTokens = promptTokens
        self.completionTokens = completionTokens
    }
}

// Reasons for ending the generation process.
public enum PicoLLMEndpoint: Codable {
    case endOfSentence
    case completionTokenLimitReached
    case stopPhraseEncountered

    public static func fromC(cEndpoint: pv_picollm_endpoint_t) -> PicoLLMEndpoint? {
        switch cEndpoint {
        case PV_PICOLLM_ENDPOINT_END_OF_SENTENCE:
            return PicoLLMEndpoint.endOfSentence
        case PV_PICOLLM_ENDPOINT_COMPLETION_TOKEN_LIMIT_REACHED:
            return PicoLLMEndpoint.completionTokenLimitReached
        case PV_PICOLLM_ENDPOINT_STOP_PHRASE_ENCOUNTERED:
            return PicoLLMEndpoint.stopPhraseEncountered
        default:
            return nil
        }
    }
}

// Generated token and its log probability.
public struct PicoLLMToken: Codable {
    public let token: String

    public let logProb: Float

    public init(
        token: String,
        logProb: Float) {
        self.token = token
        self.logProb = logProb
    }
}

// Generated token within completion and top alternative tokens.
public struct PicoLLMCompletionToken: Codable {
    public let token: PicoLLMToken

    public let topChoices: [PicoLLMToken]

    public init(
        token: PicoLLMToken,
        topChoices: [PicoLLMToken]) {
        self.token = token
        self.topChoices = topChoices
    }
}

// Result object containing stats and generated tokens.
public struct PicoLLMCompletion: Codable {
    public let usage: PicoLLMUsage

    public let endpoint: PicoLLMEndpoint

    public let completionTokens: [PicoLLMCompletionToken]

    public let completion: String

    public init(
        usage: PicoLLMUsage,
        endpoint: PicoLLMEndpoint,
        completionTokens: [PicoLLMCompletionToken],
        completion: String) {
        self.usage = usage
        self.endpoint = endpoint
        self.completionTokens = completionTokens
        self.completion = completion
    }
}

// Private callback for hoisting C callback into Swift callback.
func cStreamCallback (completion: UnsafePointer<CChar>?, context: UnsafeMutableRawPointer?) {
    let object = Unmanaged<PicoLLM>.fromOpaque(context!).takeUnretainedValue()

    if object.streamCallback != nil {
        object.streamCallback!(String(cString: completion!))
    }
}

/// iOS binding for picoLLM Inference Engine. Provides a Swift interface to the picoLLM library.
public class PicoLLM {

    private var handle: OpaquePointer?
    public var streamCallback: ((String) -> Void)?

    public static let maxTopChoices = Int32(pv_picollm_max_top_choices())
    public static let version = String(cString: pv_picollm_version())
    public let model: String
    public let contextLength: Int32

    private static var sdk = "ios"

    public static func setSdk(sdk: String) {
        self.sdk = sdk
    }

    /// Constructor.
    ///
    /// - Parameters:
    ///   - accessKey: The AccessKey obtained from Picovoice Console (https://console.picovoice.ai).
    ///   - modelPath: Absolute path to the file containing LLM parameters (`.pllm`).
    ///   - device: String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`,
    ///         picoLLM picks the most suitable device. If set to `gpu`, the engine uses the first available GPU device.
    ///         To select a specific GPU device, set this argument to `gpu:${GPU_INDEX}`, where `${GPU_INDEX}` is the
    ///         index of the target GPU. If set to `cpu`, the engine will run on the CPU with the default number of
    ///         threads. To specify the number of threads, set this argument to `cpu:${NUM_THREADS}`, where
    ///         `${NUM_THREADS}` is the desired number of threads.
    /// - Throws: PicoLLMError
    public init(
        accessKey: String,
        modelPath: String,
        device: String = "best:0"
    ) throws {

        if accessKey.isEmpty {
            throw PicoLLMInvalidArgumentError("accessKey is required for PicoLLM initialization")
        }

        if modelPath.isEmpty {
            throw PicoLLMInvalidArgumentError("modelPath is required for PicoLLM initialization")
        }

        if device.isEmpty {
            throw PicoLLMInvalidArgumentError("device is required for PicoLLM initialization")
        }

        pv_set_sdk(PicoLLM.sdk)

        var status = pv_picollm_init(
            accessKey,
            modelPath,
            device,
            &handle)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM init failed", messageStack)
        }

        var cModel: UnsafePointer<Int8>?
        status = pv_picollm_model(
            self.handle,
            &cModel)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM init failed", messageStack)
        }
        self.model = String(cString: cModel!)

        var contextLength: Int32 = 0
        status = pv_picollm_context_length(
            self.handle,
            &contextLength)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM init failed", messageStack)
        }
        self.contextLength = contextLength
    }

    deinit {
        self.delete()
    }

    /// Releases native resources that were allocated to PicoLLM
    public func delete() {
        if handle != nil {
            pv_picollm_delete(handle)
            handle = nil
        }
    }

    /// Given a text prompt and a set of generation parameters, creates a completion text and relevant metadata.
    ///
    /// - Parameters:
    ///   - prompt: Prompt.
    ///   - completionTokenLimit: Maximum number of tokens in the completion. If the generation process stops due to
    ///         reaching this limit, the `endpoint` output argument will be
    ///         `PicoLLMEndpoint.completionTokenLimitReached`. Set to `nil` to impose no limit.
    ///   - stopPhrase: The generation process stops when it encounters any of these phrases in the completion. The
    ///         already generated completion, including the encountered stop phrase, will be returned. The `endpoint`
    ///         output argument will be `PicoLLMEndpoint.stopPhraseEncountered`. Set to `nil` to turn off this feature.
    ///   - seed: The internal random number generator uses it as its seed if set to a positive integer value. Seeding
    ///         enforces deterministic outputs. Set to `nil` for randomized outputs for a given prompt.
    ///   - presencePenalty: It penalizes logits already appearing in the partial completion if set to a positive value.
    ///         If set to `0.0`, it has no effect.
    ///   - frequencyPenalty: If set to a positive floating-point value, it penalizes logits proportional to the
    ///         frequency of their appearance in the partial completion. If set to `0.0`, it has no effect.
    ///   - temperature: Sampling temperature. Temperature is a non-negative floating-point value that controls the
    ///         randomness of the sampler. A higher temperature smoothens the samplers' output, increasing the
    ///         randomness. In contrast, a lower temperature creates a narrower distribution and reduces variability.
    ///         Setting it to `0` selects the maximum logit during sampling.
    ///   - topP: A positive floating-point number within (0, 1]. It restricts the sampler's choices to high-probability
    ///         logits that form the `top_p` portion of the probability mass. Hence, it avoids randomly selecting
    ///         unlikely logits. A value of `1.` enables the sampler to pick any token with non-zero probability,
    ///         turning off the feature.
    ///   - numTopChoices: If set to a positive value, picoLLM returns the list of the highest probability tokens for
    ///         any generated token. Set to `0` to turn off the feature. The maximum number of top choices is
    ///   - streamCallback: If not set to `nil`, picoLLM executes this callback every time a new piece of completion
    ///         string becomes available.
    /// - Throws: PicoLLMError
    /// - Returns: PicoLLMCompletion containing stats and generated tokens.
    public func generate(
        prompt: String,
        completionTokenLimit: Int32? = nil,
        stopPhrases: [String]? = nil,
        seed: Int32? = nil,
        presencePenalty: Float = 0.0,
        frequencyPenalty: Float = 0.0,
        temperature: Float = 0.0,
        topP: Float = 1.0,
        numTopChoices: Int32 = 0,
        streamCallback: ((String) -> Void)? = nil
    ) throws -> PicoLLMCompletion {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized calling generate")
        }

        let stopPhrasesArg = (stopPhrases != nil) ? stopPhrases!.map { UnsafePointer(strdup($0)) } : nil
        let numStopPhrasesArg = (stopPhrases != nil) ? Int32(stopPhrases!.count) : 0

        self.streamCallback = streamCallback

        var cUsage: pv_picollm_usage_t = pv_picollm_usage_t()
        var cEndpoint: pv_picollm_endpoint_t = pv_picollm_endpoint_t(0)
        var cCompletionTokens: UnsafeMutablePointer<pv_picollm_completion_token_t>?
        var numCompletionTokens: Int32 = 0
        var cCompletion: UnsafeMutablePointer<Int8>?

        let status = pv_picollm_generate(
            self.handle,
            prompt,
            (completionTokenLimit != nil) ? completionTokenLimit! : -1,
            stopPhrasesArg,
            numStopPhrasesArg,
            (seed != nil) ? seed! : -1,
            presencePenalty,
            frequencyPenalty,
            temperature,
            topP,
            numTopChoices,
            cStreamCallback,
            Unmanaged.passUnretained(self).toOpaque(),
            &cUsage,
            &cEndpoint,
            &cCompletionTokens,
            &numCompletionTokens,
            &cCompletion)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM generate failed", messageStack)
        }

        let usage = PicoLLMUsage(
            promptTokens: Int(cUsage.prompt_tokens),
            completionTokens: Int(cUsage.completion_tokens))

        let endpoint = PicoLLMEndpoint.fromC(cEndpoint: cEndpoint)!

        var completionTokens = [PicoLLMCompletionToken]()
        for cCompletionToken in UnsafeBufferPointer(start: cCompletionTokens, count: Int(numCompletionTokens)) {
            let token = PicoLLMToken(
                token: String(cString: cCompletionToken.token.token),
                logProb: cCompletionToken.token.log_prob)
            var topChoices = [PicoLLMToken]()
            for cTopChoice in UnsafeBufferPointer(
                    start: cCompletionToken.top_choices,
                    count: Int(cCompletionToken.num_top_choices)) {
                let topChoice = PicoLLMToken(
                    token: String(cString: cTopChoice.token),
                    logProb: cTopChoice.log_prob)
                topChoices.append(topChoice)
            }

            let completionToken = PicoLLMCompletionToken(token: token, topChoices: topChoices)
            completionTokens.append(completionToken)
        }

        let completion = String(cString: cCompletion!)

        pv_picollm_delete_completion_tokens(cCompletionTokens, numCompletionTokens)
        pv_picollm_delete_completion(cCompletion)

        return PicoLLMCompletion(
            usage: usage,
            endpoint: endpoint,
            completionTokens: completionTokens,
            completion: completion)
    }

    /// Tokenizes a given text using the model's tokenizer.
    /// This is a low-level function meant for benchmarking and advanced usage.
    /// `.generate()` should be used when possible.
    ///
    /// - Parameters:
    ///   - text: Text.
    ///   - bos: If set to `true`, the tokenizer prepends the beginning of the sentence token to the result.
    ///   - eos: If set to `true`, the tokenizer appends the end of the sentence token to the result.
    /// - Throws: PicoLLMError
    /// - Returns: Tokens representing the input text.
    public func tokenize(
        text: String,
        bos: Bool,
        eos: Bool
    ) throws -> [Int32] {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized before calling tokenize")
        }

        var numTokens: Int32 = 0
        var cTokens: UnsafeMutablePointer<Int32>?

        let status = pv_picollm_tokenize(
            self.handle,
            text,
            bos,
            eos,
            &numTokens,
            &cTokens)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM tokenize failed", messageStack)
        }

        var tokens = [Int32]()
        for cToken in UnsafeBufferPointer(start: cTokens, count: Int(numTokens)) {
            tokens.append(cToken)
        }

        pv_picollm_delete_tokens(cTokens)

        return tokens
    }

    /// Performs a single forward pass given a token and returns the logits.
    /// This is a low-level function meant for benchmarking and advanced usage.
    /// `.generate()` should be used when possible.
    ///
    /// - Parameters:
    ///   - token: Input token.
    /// - Throws: PicoLLMError
    /// - Returns: Logits.
    public func forward(
        token: Int32
    ) throws -> [Float] {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized before calling forward")
        }

        var numLogits: Int32 = 0
        var cLogits: UnsafeMutablePointer<Float>?

        let status = pv_picollm_forward(
            self.handle,
            token,
            &numLogits,
            &cLogits)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM forward failed", messageStack)
        }

        var logits = [Float]()
        for cLogit in UnsafeBufferPointer(start: cLogits, count: Int(numLogits)) {
            logits.append(cLogit)
        }

        pv_picollm_delete_logits(cLogits)

        return logits
    }

    /// Resets the internal state of LLM. It should be called in conjunction with `.forward()` when processing
    /// new sequence of tokens.
    /// This is a low-level function meant for benchmarking and advanced usage.
    /// `.generate()` should be used when possible.
    ///
    /// - Throws: PicoLLMError
    public func reset() throws {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized before calling reset")
        }

        let status = pv_picollm_reset(self.handle)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM reset failed", messageStack)
        }
    }

    /// Gets a list of hardware devices that can be specified when constructing.
    ///
    /// - Throws: PicoLLMError
    /// - Returns: Array of available hardware devices.
    public static func getAvailableDevices() throws -> [String] {
        var cHardwareDevices: UnsafeMutablePointer<UnsafeMutablePointer<Int8>?>?
        var numHardwareDevices: Int32 = 0
        let status = pv_picollm_list_hardware_devices(&cHardwareDevices, &numHardwareDevices)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try getMessageStack()
            throw pvStatusToPicoLLMError(status, "PicoLLM getAvailableDevices failed", messageStack)
        }

        var hardwareDevices: [String] = []
        for i in 0..<numHardwareDevices {
            hardwareDevices.append(String(cString: cHardwareDevices!.advanced(by: Int(i)).pointee!))
        }

        pv_picollm_free_hardware_devices(cHardwareDevices, numHardwareDevices)

        return hardwareDevices
    }

    private static func pvStatusToPicoLLMError(
        _ status: pv_status_t,
        _ message: String,
        _ messageStack: [String] = []) -> PicoLLMError {
        switch status {
        case PV_STATUS_OUT_OF_MEMORY:
            return PicoLLMMemoryError(message, messageStack)
        case PV_STATUS_IO_ERROR:
            return PicoLLMIOError(message, messageStack)
        case PV_STATUS_INVALID_ARGUMENT:
            return PicoLLMInvalidArgumentError(message, messageStack)
        case PV_STATUS_STOP_ITERATION:
            return PicoLLMStopIterationError(message, messageStack)
        case PV_STATUS_KEY_ERROR:
            return PicoLLMKeyError(message, messageStack)
        case PV_STATUS_INVALID_STATE:
            return PicoLLMInvalidStateError(message, messageStack)
        case PV_STATUS_RUNTIME_ERROR:
            return PicoLLMRuntimeError(message, messageStack)
        case PV_STATUS_ACTIVATION_ERROR:
            return PicoLLMActivationError(message, messageStack)
        case PV_STATUS_ACTIVATION_LIMIT_REACHED:
            return PicoLLMActivationLimitError(message, messageStack)
        case PV_STATUS_ACTIVATION_THROTTLED:
            return PicoLLMActivationThrottledError(message, messageStack)
        case PV_STATUS_ACTIVATION_REFUSED:
            return PicoLLMActivationRefusedError(message, messageStack)
        default:
            let pvStatusString = String(cString: pv_status_to_string(status))
            return PicoLLMError("\(pvStatusString): \(message)", messageStack)
        }
    }

    private static func getMessageStack() throws -> [String] {
        var messageStackRef: UnsafeMutablePointer<UnsafeMutablePointer<Int8>?>?
        var messageStackDepth: Int32 = 0
        let status = pv_get_error_stack(&messageStackRef, &messageStackDepth)
        if status != PV_STATUS_SUCCESS {
            throw pvStatusToPicoLLMError(status, "Unable to get PicoLLM error state")
        }

        var messageStack: [String] = []
        for i in 0..<messageStackDepth {
            messageStack.append(String(cString: messageStackRef!.advanced(by: Int(i)).pointee!))
        }

        pv_free_error_stack(messageStackRef)

        return messageStack
    }

    private static let dialogs: [String: PicoLLMDialog.Type] = [
        "gemma-2b-it": GemmaChatDialog.self,
        "gemma-7b-it": GemmaChatDialog.self,
        "llama-2-7b-chat": Llama2ChatDialog.self,
        "llama-2-13b-chat": Llama2ChatDialog.self,
        "llama-2-70b-chat": Llama2ChatDialog.self,
        "llama-3-8b-chat": Llama3ChatDialog.self,
        "llama-3-70b-chat": Llama3ChatDialog.self,
        "mistral-7b-instruct-v0.1": MistralChatDialog.self,
        "mistral-7b-instruct-v0.2": MistralChatDialog.self,
        "mixtral-8x7b-instruct-v0.1": MixtralChatDialog.self
    ]

    private static let phi2Dialogs: [String: Phi2Dialog.Type] = [
        "default": Phi2QADialog.self,
        "qa": Phi2QADialog.self,
        "chat": Phi2ChatDialog.self
    ]

    /// Return the Dialog object corresponding to the loaded model. The model needs to be instruction-tuned and have a
    /// specific chat template.
    ///
    /// - Parameters:
    ///   - mode: Some models (e.g., `phi-2`) define multiple chat template models. For example, `phi-2` allows both
    ///         `qa` and `chat` templates.
    ///   - history: History refers to the number of latest back-and-forths to include in the prompt. Setting history
    ///         to `None` will embed the entire dialog in the prompt.
    ///   - system: System instruction to embed in the prompt for configuring the model's responses.
    /// - Throws: PicoLLMError
    /// - Returns: Dialog object.
    public func getDialog(
        mode: String? = nil,
        history: Int32? = 0,
        system: String? = nil
    ) throws -> PicoLLMDialog {
        let model = self.model.split(separator: " ")[0].lowercased()

        if PicoLLM.dialogs[model] != nil {
            return try PicoLLM.dialogs[model]!.init(history: history, system: system)
        } else if model == "phi2" {
            if PicoLLM.phi2Dialogs[mode ?? "default"] == nil {
                throw PicoLLMInvalidArgumentError("`\(model)` does not have a corresponding mode `\(mode ?? "")`")
            }

            return try PicoLLM.phi2Dialogs[mode ?? "default"]!.init(history: history, system: system)
        }

        throw PicoLLMInvalidArgumentError("`\(model)` does not have a corresponding dialog or is not instruction-tuned")
    }
}
