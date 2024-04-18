//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import XCTest

import PicoLLM

class BaseTest: XCTestCase {

    let accessKey: String = "{TESTING_ACCESS_KEY_HERE}"
    let modelURL = URL(string: "{TESTING_MODEL_URL_HERE}")

    override func setUp() {
        super.setUp()
        continueAfterFailure = false
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
            let error = NSError(domain: "Error downloading file", code: 1002, userInfo: nil)
            try completion(destinationUrl.path, error)
        }
    }
}
