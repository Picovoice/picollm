//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

import AVFoundation
import XCTest

import PicoLLM

class PicoLLMAppTestUITests: BaseTest {
    
    func testInitSuccess() throws {
        var modelPath: String = ""
        try downloadFileSync(url: modelURL!) { (path, _) in
            modelPath = path!
        }
        
        let m = try PicoLLM.init(accessKey: accessKey, modelPath: modelPath)
        XCTAssert(PicoLLM.version != "")
        XCTAssert(try m.model() != "")
        m.delete()
    }

    func testGenerate() throws {
        var modelPath: String = ""
        try downloadFileSync(url: modelURL!) { (path, _) in
            modelPath = path!
        }
        
        let m = try PicoLLM.init(accessKey: accessKey, modelPath: modelPath)
        
        let result = try m.generate(prompt: "Hello my name is", completionTokenLimit: 10)
        XCTAssert(result.completion == " John and I am a student at XYZ school")
        
        m.delete()
    }
}
