//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import PvMvm

/// Low-level iOS binding for Mvm wake word engine. Provides a Swift interface to the Mvm library.
public class Mvm {

    static let resourceBundle: Bundle = {
        let myBundle = Bundle(for: Mvm.self)

        guard let resourceBundleURL = myBundle.url(
             forResource: "MvmResources", withExtension: "bundle")
        else { fatalError("MvmResources.bundle not found") }

        guard let resourceBundle = Bundle(url: resourceBundleURL)
            else { fatalError("Could not open MvmResources.bundle") }

        return resourceBundle
    }()

    private var handle: OpaquePointer?
    public static let minChunkSize = Int32(pv_mvm_min_chunk_size())
    public static let maxChunkSize = Int32(pv_mvm_max_chunk_size())
    public static let version = String(cString: pv_mvm_version())
    private static var sdk = "ios"

    public static func setSdk(sdk: String) {
        self.sdk = sdk
    }

    /// Constructor.
    ///
    /// - Throws: MvmError
    public init(
        deviceString: String = "best:0"
    ) throws {

        if deviceString.count == 0 {
            throw MvmInvalidArgumentError("deviceString is required for Mvm initialization")
        }

        pv_set_sdk(Mvm.sdk)

        let status = pv_mvm_init(
            deviceString,
            &handle)

        if status != PV_STATUS_SUCCESS {
            let messageStack = try getMessageStack()
            throw pvStatusToMvmError(status, "Mvm init failed", messageStack)
        }
    }

    deinit {
        self.delete()
    }

    /// Releases native resources that were allocated to Mvm
    public func delete() {
        if handle != nil {
            pv_mvm_delete(handle)
            handle = nil
        }
    }

    public func loadModelFile(
        filepath: String,
        chunk_size_bytes: Int32 = Mvm.maxChunkSize
    ) throws {
        if handle == nil {
            throw MvmInvalidStateError("Mvm must be initialized before processing")
        }

        var chunk_size_bytes_inner: Int32 = chunk_size_bytes

        let status = pv_mvm_load_model_file(self.handle, filepath, chunk_size_bytes_inner)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try getMessageStack()
            throw pvStatusToMvmError(status, "Mvm load model file failed", messageStack)
        }
    }

    public func loadModelChunk(
        filepath: String,
        chunk: [UInt8],
        chunk_size_bytes: Int32? = nil
    ) throws -> Bool {
        if handle == nil {
            throw MvmInvalidStateError("Mvm must be initialized before processing")
        }

        var  chunk_size_bytes_inner: Int32 = Int32(chunk.count)
        if chunk_size_bytes != nil {
            chunk_size_bytes_inner = chunk_size_bytes!
        }

        var mutable_chunk = chunk
        var is_model_complete: Bool = false
        let status = pv_mvm_load_model_chunk(
            self.handle,
            &mutable_chunk,
            chunk_size_bytes_inner,
            &is_model_complete)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try getMessageStack()
            throw pvStatusToMvmError(status, "Mvm load model chunk failed", messageStack)
        }

        return is_model_complete
    }

    public func chainMultiply(vector: [Float32], iterations: Int32 = 10) throws -> [Float32] {
        if handle == nil {
            throw MvmInvalidStateError("Mvm must be initialized before processing")
        }

        var iterations_inner: Int32 = iterations

        var resultVector: [Float32] = Array(repeating: 0.0, count: vector.count)
        let status = pv_mvm_chain_multiply(self.handle, vector, iterations_inner, &resultVector)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try getMessageStack()
            throw pvStatusToMvmError(status, "Mvm chain multiply failed", messageStack)
        }

        return resultVector
    }

    public func matrixDimensions() throws -> (matrix_m: Int32, matrix_n: Int32) {
        if handle == nil {
            throw MvmInvalidStateError("Mvm must be initialized before processing")
        }

        var matrix_m: Int32 = 0
        var matrix_n: Int32 = 0

        let status = pv_mvm_matrix_dimensions(self.handle, &matrix_m, &matrix_n)
        if status != PV_STATUS_SUCCESS {
            let messageStack = try getMessageStack()
            throw pvStatusToMvmError(status, "Mvm chain multiply failed", messageStack)
        }

        return (matrix_m: matrix_m, matrix_n: matrix_n)
    }

    private func pvStatusToMvmError(
        _ status: pv_status_t,
        _ message: String,
        _ messageStack: [String] = []) -> MvmError {
        switch status {
        case PV_STATUS_OUT_OF_MEMORY:
            return MvmMemoryError(message, messageStack)
        case PV_STATUS_IO_ERROR:
            return MvmIOError(message, messageStack)
        case PV_STATUS_INVALID_ARGUMENT:
            return MvmInvalidArgumentError(message, messageStack)
        case PV_STATUS_STOP_ITERATION:
            return MvmStopIterationError(message, messageStack)
        case PV_STATUS_KEY_ERROR:
            return MvmKeyError(message, messageStack)
        case PV_STATUS_INVALID_STATE:
            return MvmInvalidStateError(message, messageStack)
        case PV_STATUS_RUNTIME_ERROR:
            return MvmRuntimeError(message, messageStack)
        case PV_STATUS_ACTIVATION_ERROR:
            return MvmActivationError(message, messageStack)
        case PV_STATUS_ACTIVATION_LIMIT_REACHED:
            return MvmActivationLimitError(message, messageStack)
        case PV_STATUS_ACTIVATION_THROTTLED:
            return MvmActivationThrottledError(message, messageStack)
        case PV_STATUS_ACTIVATION_REFUSED:
            return MvmActivationRefusedError(message, messageStack)
        default:
            let pvStatusString = String(cString: pv_status_to_string(status))
            return MvmError("\(pvStatusString): \(message)", messageStack)
        }
    }

    private func getMessageStack() throws -> [String] {
        var messageStackRef: UnsafeMutablePointer<UnsafeMutablePointer<Int8>?>?
        var messageStackDepth: Int32 = 0
        let status = pv_get_error_stack(&messageStackRef, &messageStackDepth)
        if status != PV_STATUS_SUCCESS {
            throw pvStatusToMvmError(status, "Unable to get Mvm error state")
        }

        var messageStack: [String] = []
        for i in 0..<messageStackDepth {
            messageStack.append(String(cString: messageStackRef!.advanced(by: Int(i)).pointee!))
        }

        pv_free_error_stack(messageStackRef)

        return messageStack
    }
}
