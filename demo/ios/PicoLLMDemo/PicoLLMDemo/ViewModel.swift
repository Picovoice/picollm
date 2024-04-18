//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import PicoLLM
import Combine

class ViewModel: ObservableObject {

    private let MODEL_FILE_URL = URL(string: "${YOUR_MODEL_FILE_URL_HERE}")

    private var picollm: PicoLLM!

    private var timer: Timer?

    @Published var errorMessage = ""
    @Published var statusText = ""

    init() {
        do {
            try picollm = PicoLLM(deviceString: "gpu")
        } catch let error as PicoLLMInvalidArgumentError {
            errorMessage = error.localizedDescription
        } catch {
            errorMessage = "\(error)"
        }
    }

    deinit {
        picollm.delete()
    }

    func downloadFileSync(url: URL, completion: @escaping (String?, Error?) throws -> Void) throws {
        let documentsUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
        let destinationUrl = documentsUrl.appendingPathComponent(url.lastPathComponent)

        if FileManager().fileExists(atPath: destinationUrl.path) {
            try completion(destinationUrl.path, nil)
        } else if let dataFromURL = NSData(contentsOf: url) {
            if dataFromURL.write(to: destinationUrl, atomically: true) {
                try completion(destinationUrl.path, nil)
            } else {
                let error = NSError(domain: "Error saving file", code: 1001, userInfo: nil)
                try completion(destinationUrl.path, error)
            }
        } else {
            let error = NSError(domain: "Error downloading file ", code: 1002, userInfo: nil)
            try completion(destinationUrl.path, error)
        }
    }

    public func start() {
        do {
            self.statusText = "Downloading model to device"
            var filePath = ""
            try downloadFileSync(url: MODEL_FILE_URL!) { (path, _ ) in
                filePath = path!
            }

            self.statusText = "Loading model"
            try self.picollm.loadModelFile(filepath: filePath)

            self.statusText = "Running chain multiply"
            let matrixDimensions = try self.picollm.matrixDimensions()
            var vector: [Float32] = Array(repeating: 1.0, count: Int(matrixDimensions.matrix_n))

            let resultVector = try self.picollm.chainMultiply(vector: vector)

            self.statusText = "Done!"
        } catch {
            self.errorMessage = "Failed to run chain multiply."
        }
    }
}
