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

//    func testModelLoadSuccess() throws {
//        let m = try PicoLLM.init(deviceString: "best:0")
//
//        try self.downloadFileSync(url: weightsURL!) { (path, _) in
//            try m.loadModelFile(filepath: path!)
//            XCTAssert(try m.matrixDimensions().matrix_n > 0)
//            XCTAssert(try m.matrixDimensions().matrix_m > 0)
//        }
//
//        m.delete()
//    }
//
//    func testChainMultiplySuccess() throws {
//        let m = try PicoLLM.init(deviceString: "best:0")
//
//        try self.downloadFileSync(url: weightsURL!) { (path, _) in
//            try m.loadModelFile(filepath: path!)
//
//            let matrixDimensions = try m.matrixDimensions()
//            var vector: [Float32] = Array(repeating: 1.0, count: Int(matrixDimensions.matrix_n))
//
//            let resultVector = try m.chainMultiply(vector: vector)
//
//            XCTAssert(vector.count == resultVector.count)
//        }
//
//        m.delete()
//    }
}
