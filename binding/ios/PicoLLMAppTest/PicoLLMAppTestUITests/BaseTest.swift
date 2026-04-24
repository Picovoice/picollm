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
    let imageModelURL = URL(string: "{TESTING_IMAGE_MODEL_URL_HERE}")
    let embeddingModelURL = URL(string: "{TESTING_EMBEDDING_MODEL_URL_HERE}")
    let ocrModelURL = URL(string: "{TESTING_OCR_MODEL_URL_HERE}")
    let device: String = "{TESTING_DEVICE_HERE}"

    let cleanModel = false

    var modelPath: String = ""
    var imageModelPath: String = ""
    var embeddingModelPath: String = ""
    var ocrModelPath: String = ""

    var picollmTestData: [String: Any]?
    var dialogTestData: [String: Any]?
    var embeddingTestData: [String: Any]?
    var withImageTestData: [String: Any]?
    var ocrTestData: [String: Any]?

    var smallImage: PicollmImage?
    var largeImage: PicollmImage?

    override func setUp() async throws {
        do {
            try await downloadFileAsync(url: modelURL!) { (path, _) in
                self.modelPath = path!
            }
        } catch {
            print("Failed to fetch initial model file")
        }

        do {
            try await downloadFileAsync(url: imageModelURL!) { (path, _) in
                self.imageModelPath = path!
            }
        } catch {
            print("Failed to fetch initial image model file")
        }

        do {
            try await downloadFileAsync(url: embeddingModelURL!) { (path, _) in
                self.embeddingModelPath = path!
            }
        } catch {
            print("Failed to fetch initial embedding model file")
        }

        do {
            try await downloadFileAsync(url: ocrModelURL!) { (path, _) in
                self.ocrModelPath = path!
            }
        } catch {
            print("Failed to fetch initial ocr model file")
        }

        do {
            try getTestData()
        } catch {
            print("Failed to get test data file")
        }

        do {
            try getTestImage()
        } catch {
            print("Failed to get test image file")
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
        embeddingTestData = (testData["generate_embedding"] as! [String: Any])
        withImageTestData = ["with-image": testData["generate_with_image"]!]
        ocrTestData = [
            "default": testData["generate_ocr"]!,
            "large": testData["generate_ocr_large"]!
        ]
    }

    func getTestImage() throws {
        let bundle = Bundle(for: type(of: self))
        let smallImageURL = bundle.url(
            forResource: "test_image",
            withExtension: "png")!
        let largeImageURL = bundle.url(
            forResource: "test_image_large",
            withExtension: "png")!

        self.smallImage = try PicollmImage(url: smallImageURL)
        self.largeImage = try PicollmImage(url: largeImageURL)
    }
}

public struct PicollmImage {
    let width: Int
    let height: Int
    let data: [UInt8]

    init(url: URL) throws {
        let testImageData = try Data(contentsOf: url)
        let cgprovider = CGDataProvider(data: testImageData as CFData)!
        let cgimg = CGImage(
            pngDataProviderSource: cgprovider,
            decode: nil,
            shouldInterpolate: false,
            intent: .defaultIntent)!

        let iw = cgimg.width
        let ih = cgimg.height
        var im = [UInt8](repeating: 0, count: iw * ih * 4)

        let cgspace = CGColorSpaceCreateDeviceRGB()
        let cgcontext = CGContext(
            data: &im,
            width: iw,
            height: ih,
            bitsPerComponent: 8,
            bytesPerRow: 4 * iw,
            space: cgspace,
            bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
        cgcontext.draw(
            cgimg,
            in: CGRect(
                x: 0.0,
                y: 0.0,
                width: CGFloat(iw),
                height: CGFloat(ih)))

        var imageData = [UInt8](repeating: 0, count: iw * ih * 3)

        for i in 0..<iw*ih {
            imageData[i * 3 + 0] = im[i * 4 + 0]
            imageData[i * 3 + 1] = im[i * 4 + 1]
            imageData[i * 3 + 2] = im[i * 4 + 2]
        }

        self.width = iw
        self.height = ih
        self.data = imageData
    }
}
