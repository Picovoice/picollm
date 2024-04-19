//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import PvPicoLLM

public struct PicoLLMUsage {
    public let promptTokens: Int

    public let completionTokens: Int

    public init(
        promptTokens: Int,
        completionTokens: Int) {
        self.promptTokens = promptTokens
        self.completionTokens = completionTokens
    }
}

public enum PicoLLMEndpoint {
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

public struct PicoLLMToken {
    public let token: String

    public let logProb: Float

    public init(
        token: String,
        logProb: Float) {
        self.token = token
        self.logProb = logProb
    }
}

public struct PicoLLMCompletionToken {
    public let token: PicoLLMToken

    public let topChoices: [PicoLLMToken]

    public init(
        token: PicoLLMToken,
        topChoices: [PicoLLMToken]) {
        self.token = token
        self.topChoices = topChoices
    }
}

public struct PicoLLMCompletion {
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

private var streamCallbackFunc: ((String) -> Void)?
private func cStreamCallback (completion: UnsafePointer<CChar>?) {
    if streamCallbackFunc != nil {
        streamCallbackFunc!(String(cString: completion!))
    }
}

/// Low-level iOS binding for PicoLLM wake word engine. Provides a Swift interface to the PicoLLM library.
public class PicoLLM {

    static let resourceBundle: Bundle = {
        let myBundle = Bundle(for: PicoLLM.self)

        guard let resourceBundleURL = myBundle.url(
             forResource: "PicoLLMResources", withExtension: "bundle")
        else { fatalError("PicoLLMResources.bundle not found") }

        guard let resourceBundle = Bundle(url: resourceBundleURL)
            else { fatalError("Could not open PicoLLMResources.bundle") }

        return resourceBundle
    }()

    private var handle: OpaquePointer?
    public static let maxTopChoices = Int32(pv_picollm_max_top_choices())
    public static let version = String(cString: pv_picollm_version())
    private static var sdk = "ios"

    public static func setSdk(sdk: String) {
        self.sdk = sdk
    }

    /// Constructor.
    ///
    /// - Throws: PicoLLMError
    public init(
        accessKey: String,
        modelPath: String,
        device: String = "best:0"
    ) throws {

        if device.count == 0 {
            throw PicoLLMInvalidArgumentError("device is required for PicoLLM initialization")
        }

        pv_set_sdk(PicoLLM.sdk)

        let status = pv_picollm_init(
            accessKey,
            modelPath,
            device,
            &handle)

        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM init failed", messageStack)
        }
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

    public func generate(
        prompt: String,
        completionTokenLimit: Int32 = -1,
        stopPhrases: [String]? = nil,
        seed: Int32 = -1,
        presencePenalty: Float = 0.0,
        frequencyPenalty: Float = 0.0,
        temperature: Float = 0.0,
        topP: Float = 0.9,
        numTopChoices: Int32 = 0,
        streamCallback: ((String) -> Void)? = nil
    ) throws -> PicoLLMCompletion {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized before processing")
        }

        let stopPhrasesArg = (stopPhrases != nil) ? stopPhrases!.map { UnsafePointer(strdup($0)) } : nil
        let numStopPhrasesArg = (stopPhrases != nil) ? Int32(stopPhrases!.count) : 0

        streamCallbackFunc = streamCallback

        var cUsage: pv_picollm_usage_t = pv_picollm_usage_t()
        var cEndpoint: pv_picollm_endpoint_t = pv_picollm_endpoint_t(0)
        var cCompletionTokens: UnsafeMutablePointer<pv_picollm_completion_token_t>?
        var numCompletionTokens: Int32 = 0
        var cCompletion: UnsafeMutablePointer<Int8>?

        let status = pv_picollm_generate(
            self.handle,
            prompt,
            completionTokenLimit,
            stopPhrasesArg,
            numStopPhrasesArg,
            seed,
            presencePenalty,
            frequencyPenalty,
            temperature,
            topP,
            numTopChoices,
            cStreamCallback,
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

    public func tokenize(
        text: String,
        bos: Bool,
        eos: Bool
    ) throws -> [Int32] {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized before processing")
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
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM generate failed", messageStack)
        }

        var tokens = [Int32]()
        for cToken in UnsafeBufferPointer(start: cTokens, count: Int(numTokens)) {
            tokens.append(cToken)
        }

        pv_picollm_delete_tokens(cTokens)

        return tokens
    }

    public func forward(
        token: Int32
    ) throws -> [Float] {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized before processing")
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
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM generate failed", messageStack)
        }

        var logits = [Float]()
        for cLogit in UnsafeBufferPointer(start: cLogits, count: Int(numLogits)) {
            logits.append(cLogit)
        }

        pv_picollm_delete_logits(cLogits)

        return logits
    }

    public func reset() throws {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized before processing")
        }

        let status = pv_picollm_reset(self.handle)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM generate failed", messageStack)
        }
    }

    public func model() throws -> String {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized before processing")
        }

        var cModel: UnsafePointer<Int8>?

        let status = pv_picollm_model(
            self.handle,
            &cModel)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM generate failed", messageStack)
        }

        return String(cString: cModel!)
    }

    public func contextLength() throws -> Int32 {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized before processing")
        }

        var contextLength: Int32 = 0

        let status = pv_picollm_context_length(
            self.handle,
            &contextLength)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try PicoLLM.getMessageStack()
            throw PicoLLM.pvStatusToPicoLLMError(status, "PicoLLM generate failed", messageStack)
        }

        return contextLength
    }

    public static func listHardwareDevices() throws -> [String] {
        var cHardwareDevices: UnsafeMutablePointer<UnsafeMutablePointer<Int8>?>?
        var numHardwareDevices: Int32 = 0
        let status = pv_picollm_list_hardware_devices(&cHardwareDevices, &numHardwareDevices)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try getMessageStack()
            throw pvStatusToPicoLLMError(status, "PicoLLM generate failed", messageStack)
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
}
