//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import XCTest
import Foundation

import PicoLLM

class BaseTest: XCTestCase {

    let accessKey: String = "{TESTING_ACCESS_KEY_HERE}"
    let modelURL = URL(string: "{TESTING_MODEL_URL_HERE}")

    let cleanModel = false

    var modelPath: String = ""
    var picollmTestData: [String: Any]?
    var dialogTestData: [String: Any]?

    override func setUp() async throws {
        do {
            try await downloadFileAsync(url: modelURL!) { (path, _) in
                self.modelPath = path!
            }
        } catch {
            print("Failed to fetch initial model file")
        }

       do {
           try getTestData()
       } catch {
           print("Failed to get test data file")
       }

        try await super.setUp()
        continueAfterFailure = false
    }

    func downloadFileAsync(url: URL, completion: @escaping (String?, Error?) throws -> Void) async throws {
        let documentsUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
        let destinationUrl = documentsUrl.appendingPathComponent(url.lastPathComponent)

        if FileManager().fileExists(atPath: destinationUrl.path) && !cleanModel {
            print("Using cached file...")
            try completion(destinationUrl.path, nil)
        } else {
            let session = URLSession.shared

            do {
                let (downloadedURL, _) = try await session.download(from: url)
                try FileManager().copyItem(at: downloadedURL, to: destinationUrl)
                print("File Downloaded...")
                try completion(destinationUrl.path, nil)
            } catch {
                let error = NSError(domain: "Error fetching file", code: 1001, userInfo: nil)
                try completion(destinationUrl.path, error)
            }
        }
    }

    func getTestData() throws {
        let bundle = Bundle(for: type(of: self))
        let testDataJsonUrl = bundle.url(
            forResource: "test_data",
            withExtension: "json")!

        let testDataJsonData = try Data(contentsOf: testDataJsonUrl)
        let testData = try JSONSerialization.jsonObject(with: testDataJsonData) as! [String: Any]

        picollmTestData = (testData["picollm"] as! [String: Any])
        dialogTestData = (testData["dialog"] as! [String: Any])
    }
}
