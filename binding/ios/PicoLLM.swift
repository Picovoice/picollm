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

    public init(
        usage: PicoLLMUsage,
        endpoint: PicoLLMEndpoint,
        completionTokens: [PicoLLMCompletionToken]) {
        self.usage = usage
        self.endpoint = endpoint
        self.completionTokens = completionTokens
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
            let messageStack = try getMessageStack()
            throw pvStatusToPicoLLMError(status, "PicoLLM init failed", messageStack)
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
        streamCallback: ((String) -> Void)? = nil)
    ) throws {
        if handle == nil {
            throw PicoLLMInvalidStateError("PicoLLM must be initialized before processing")
        }

        let stopPhrasesArg = stopPhrases ? stopPhrases.map { UnsafePointer(strdup($0)) } : nil
        let numStopPhrasesArg = stopPhrases ? Int32(stopPhrases.count) : 0

        var cUsage: pv_picollm_usage_t
        var cEndpoint: pv_picollm_endpoint_t
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
            let messageStack = try getMessageStack()
            throw pvStatusToPicoLLMError(status, "PicoLLM generate failed", messageStack)
        }
    }

    // public func loadModelChunk(
    //     filepath: String,
    //     chunk: [UInt8],
    //     chunk_size_bytes: Int32? = nil
    // ) throws -> Bool {
    //     if handle == nil {
    //         throw PicoLLMInvalidStateError("PicoLLM must be initialized before processing")
    //     }

    //     var  chunk_size_bytes_inner: Int32 = Int32(chunk.count)
    //     if chunk_size_bytes != nil {
    //         chunk_size_bytes_inner = chunk_size_bytes!
    //     }

    //     var mutable_chunk = chunk
    //     var is_model_complete: Bool = false
    //     let status = pv_picollm_load_model_chunk(
    //         self.handle,
    //         &mutable_chunk,
    //         chunk_size_bytes_inner,
    //         &is_model_complete)
    //     if status != PV_STATUS_SUCCESS {
    //         let messageStack = try getMessageStack()
    //         throw pvStatusToPicoLLMError(status, "PicoLLM load model chunk failed", messageStack)
    //     }

    //     return is_model_complete
    // }

    // public func chainMultiply(vector: [Float32], iterations: Int32 = 10) throws -> [Float32] {
    //     if handle == nil {
    //         throw PicoLLMInvalidStateError("PicoLLM must be initialized before processing")
    //     }

    //     var iterations_inner: Int32 = iterations

    //     var resultVector: [Float32] = Array(repeating: 0.0, count: vector.count)
    //     let status = pv_picollm_chain_multiply(self.handle, vector, iterations_inner, &resultVector)
    //     if status != PV_STATUS_SUCCESS {
    //         let messageStack = try getMessageStack()
    //         throw pvStatusToPicoLLMError(status, "PicoLLM chain multiply failed", messageStack)
    //     }

    //     return resultVector
    // }

    // public func matrixDimensions() throws -> (matrix_m: Int32, matrix_n: Int32) {
    //     if handle == nil {
    //         throw PicoLLMInvalidStateError("PicoLLM must be initialized before processing")
    //     }

    //     var matrix_m: Int32 = 0
    //     var matrix_n: Int32 = 0

    //     let status = pv_picollm_matrix_dimensions(self.handle, &matrix_m, &matrix_n)
    //     if status != PV_STATUS_SUCCESS {
    //         let messageStack = try getMessageStack()
    //         throw pvStatusToPicoLLMError(status, "PicoLLM chain multiply failed", messageStack)
    //     }

    //     return (matrix_m: matrix_m, matrix_n: matrix_n)
    // }

    private func pvStatusToPicoLLMError(
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

    private func getMessageStack() throws -> [String] {
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
