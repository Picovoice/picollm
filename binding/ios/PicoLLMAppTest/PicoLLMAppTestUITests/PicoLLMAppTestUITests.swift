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

    private var handle: PicoLLM?

    override func setUpWithError() throws {
        handle = try PicoLLM.init(accessKey: accessKey, modelPath: modelPath)
        try super.setUpWithError()
    }

    override func tearDown() {
        tearDownHelper()
    }

    func tearDownHelper() {
        if handle != nil {
            handle!.delete()
            handle = nil
        }
    }

    func testInitWithInvalidAccessKey() throws {
        tearDownHelper()

        XCTAssertThrowsError(try PicoLLM.init(accessKey: "invalid==", modelPath: modelPath)) { error in
            XCTAssert(error is PicoLLMInvalidArgumentError)
        }
    }

    func testInitWithInvalidModelPath() throws {
        tearDownHelper()

        XCTAssertThrowsError(try PicoLLM.init(accessKey: accessKey, modelPath: "/invalid.pllm")) { error in
            XCTAssert(error is PicoLLMIOError)
        }
    }

    func testInitWithInvalidDevice() throws {
        tearDownHelper()

        XCTAssertThrowsError(try PicoLLM.init(accessKey: accessKey, modelPath: modelPath, device: "cpu:nan")) { error in
            XCTAssert(error is PicoLLMInvalidArgumentError)
        }
    }

    func verifyCompletionHelper(res: PicoLLMCompletion, expectation: PicoLLMExpectation) throws -> Bool {
        if res.usage.promptTokens != expectation.numPromptTokens {
            return false
        }

        if res.usage.completionTokens != expectation.numCompletionTokens {
            return false
        }

        if res.endpoint != expectation.endpoint {
            return false
        }

        for i in 0..<res.completionTokens.count {
            let completionToken = res.completionTokens[i]

            if completionToken.token.token.isEmpty {
                return false
            }
            if completionToken.token.logProb > 0.0 {
                return false
            }

            if completionToken.topChoices.count != expectation.numTopChoices {
                return false
            }

            for j in 0..<completionToken.topChoices.count {
                let topChoice = completionToken.topChoices[j]

                if topChoice.token.isEmpty {
                    return false
                }
                if topChoice.logProb > 0.0 {
                    return false
                }
            }

            if completionToken.topChoices.count > 0 {
                let sum = completionToken.topChoices.reduce(0.0, {(result, token) in
                    return result + exp(token.logProb)
                })
                if sum > 1.0 {
                    return false
                }
            }
        }

        if res.completionTokens.allSatisfy({(completionToken) in !completionToken.token.token.contains("\\x")}) {
            let tokenCompletion = res.completionTokens.reduce("", {(res, completionToken) in
                    res + completionToken.token.token })
            if tokenCompletion != expectation.completion {
                return false
            }
        }

        if res.completion != expectation.completion {
            return false
        }

        return true
    }

    func verifyCompletion(res: PicoLLMCompletion, expectations: [TestExpectation]) throws {
        XCTAssert(try expectations.contains(where: { expectation in
            switch expectation {
            case .obj(let expectation):
                return try verifyCompletionHelper(res: res, expectation: expectation)
            case .str(let expectation):
                let expectationObj = PicoLLMExpectation(
                    numPromptTokens: res.usage.promptTokens,
                    numCompletionTokens: res.usage.completionTokens,
                    endpoint: res.endpoint,
                    numTopChoices: 0,
                    completion: expectation)
                print("VS `\(res.completion)` `\(expectation)`")
                return try verifyCompletionHelper(res: res, expectation: expectationObj)
            }
        }))
    }

    func testGenerateDefault() throws {
        let testCase = PicollmTestCase(name: "default", data: self.picollmTestData!)

        let result = try handle!.generate(prompt: testCase.prompt)
        try verifyCompletion(res: result, expectations: testCase.expectations)
    }

    func testGenerateWithCompletionTokenLimit() throws {
        let testCase = PicollmTestCase(name: "with-completion-token-limit", data: self.picollmTestData!)

        let completionTokenLimit = testCase.parameters["completion-token-limit"] as! Int32

        let result = try handle!.generate(
            prompt: testCase.prompt,
            completionTokenLimit: completionTokenLimit)
        try verifyCompletion(res: result, expectations: testCase.expectations)
    }

    func testGenerateWithStopPhrases() throws {
        let testCase = PicollmTestCase(name: "with-stop-phrases", data: self.picollmTestData!)

        let stopPhrases = testCase.parameters["stop-phrases"] as! [String]

        let result = try handle!.generate(
            prompt: testCase.prompt,
            stopPhrases: stopPhrases)
        try verifyCompletion(res: result, expectations: testCase.expectations)
    }

    func testGenerateWithPresencePenalty() throws {
        let testCase = PicollmTestCase(name: "with-presence-penalty", data: self.picollmTestData!)

        let presencePenalty = testCase.parameters["presence-penalty"] as! Double

        let result = try handle!.generate(
            prompt: testCase.prompt,
            presencePenalty: Float(presencePenalty))
        try verifyCompletion(res: result, expectations: testCase.expectations)
    }

    func testGenerateWithFrequencyPenalty() throws {
        let testCase = PicollmTestCase(name: "with-frequency-penalty", data: self.picollmTestData!)

        let frequencyPenalty = testCase.parameters["frequency-penalty"] as! Double

        let result = try handle!.generate(
            prompt: testCase.prompt,
            frequencyPenalty: Float(frequencyPenalty))
        try verifyCompletion(res: result, expectations: testCase.expectations)
    }

    func testGenerateWithTemperature() throws {
        let testCase = PicollmTestCase(name: "with-temperature", data: self.picollmTestData!)

        let completionTokenLimit = testCase.parameters["completion-token-limit"] as! Int32
        let seeds = testCase.parameters["seeds"] as! [Int32]
        let temperature = testCase.parameters["temperature"] as! Double

        let result1 = try handle!.generate(
            prompt: testCase.prompt,
            completionTokenLimit: completionTokenLimit,
            seed: seeds[0],
            temperature: Float(temperature))

        let result2 = try handle!.generate(
            prompt: testCase.prompt,
            completionTokenLimit: completionTokenLimit,
            seed: seeds[1],
            temperature: Float(temperature))

        let numPromptTokens = try handle!.tokenize(text: testCase.prompt, bos: true, eos: false).count

        try verifyCompletion(
            res: result1,
            expectations: [
                TestExpectation.obj(
                    PicoLLMExpectation(
                        numPromptTokens: numPromptTokens,
                        numCompletionTokens: result1.usage.completionTokens,
                        endpoint: result1.endpoint,
                        numTopChoices: 0,
                        completion: result1.completion
                    ))
            ])

        try verifyCompletion(
            res: result2,
            expectations: [
                TestExpectation.obj(
                    PicoLLMExpectation(
                        numPromptTokens: numPromptTokens,
                        numCompletionTokens: result2.usage.completionTokens,
                        endpoint: result2.endpoint,
                        numTopChoices: 0,
                        completion: result2.completion
                    ))
            ])

        XCTAssert(result1.completion != result2.completion)
    }

    func testGenerateWithTemperatureAndIdenticalSeeds() throws {
        let testCase = PicollmTestCase(name: "with-temperature-and-identical-seeds", data: self.picollmTestData!)

        let completionTokenLimit = testCase.parameters["completion-token-limit"] as! Int32
        let seed = testCase.parameters["seed"] as! Int32
        let temperature = testCase.parameters["temperature"] as! Double

        let result1 = try handle!.generate(
            prompt: testCase.prompt,
            completionTokenLimit: completionTokenLimit,
            seed: seed,
            temperature: Float(temperature))

        let result2 = try handle!.generate(
            prompt: testCase.prompt,
            completionTokenLimit: completionTokenLimit,
            seed: seed,
            temperature: Float(temperature))

        let numPromptTokens = try handle!.tokenize(text: testCase.prompt, bos: true, eos: false).count

        try verifyCompletion(
            res: result1,
            expectations: [
                TestExpectation.obj(
                    PicoLLMExpectation(
                        numPromptTokens: numPromptTokens,
                        numCompletionTokens: result1.usage.completionTokens,
                        endpoint: result1.endpoint,
                        numTopChoices: 0,
                        completion: result1.completion
                    ))
            ])

        try verifyCompletion(
            res: result2,
            expectations: [
                TestExpectation.obj(
                    PicoLLMExpectation(
                        numPromptTokens: numPromptTokens,
                        numCompletionTokens: result2.usage.completionTokens,
                        endpoint: result2.endpoint,
                        numTopChoices: 0,
                        completion: result2.completion
                    ))
            ])

        XCTAssert(result1.completion == result2.completion)
    }

    func testGenerateWithTemperatureAndTopP() throws {
        let testCase = PicollmTestCase(name: "with-temperature-and-top-p", data: self.picollmTestData!)

        let completionTokenLimit = testCase.parameters["completion-token-limit"] as! Int32
        let seed = testCase.parameters["seed"] as! Int32
        let temperature = testCase.parameters["temperature"] as! Double
        let top_p = testCase.parameters["top-p"] as! Double

        let result = try handle!.generate(
            prompt: testCase.prompt,
            completionTokenLimit: completionTokenLimit,
            seed: seed,
            temperature: Float(temperature),
            topP: Float(top_p))

        try verifyCompletion(
            res: result,
            expectations: testCase.expectations)
    }

    func testGenerateWithTopChoices() throws {
        let testCase = PicollmTestCase(name: "with-top-choices", data: self.picollmTestData!)

        let numTopChoices = testCase.parameters["num-top-choices"] as! Int32

        let result = try handle!.generate(
            prompt: testCase.prompt,
            numTopChoices: numTopChoices)
        try verifyCompletion(res: result, expectations: testCase.expectations)
    }

    func testGenerateWithStreamCallback() throws {
        let testCase = PicollmTestCase(name: "default", data: self.picollmTestData!)

        var pieces = ""

        let streamCallback = {(completion: String) in
            pieces.append(completion)
        }

        let result = try handle!.generate(
            prompt: testCase.prompt,
            streamCallback: streamCallback)
        try verifyCompletion(res: result, expectations: testCase.expectations)

        let expected: String = {
            switch testCase.expectations[0] {
            case .obj(let expectation):
                return expectation.completion
            default:
                return ""
            }
        }()

        XCTAssertEqual(pieces, expected)
    }

    func testTokenize() throws {
        let tokenizeData = self.picollmTestData!["tokenize"] as! [String: Any]
        let text = tokenizeData["text"] as! String
        let expectedTokens = tokenizeData["tokens"] as! [Int32]

        let tokens = try self.handle!.tokenize(text: text, bos: true, eos: false)

        for i in 0..<tokens.count {
            XCTAssertEqual(tokens[i], expectedTokens[i])
        }
    }

    func testForward() throws {
        let logits = try self.handle!.forward(token: 79)
        XCTAssertGreaterThan(logits.count, 0)
    }

    func testReset() throws {
        let initialLogits = try self.handle!.forward(token: 79)
        try self.handle!.reset()

        let afterLogits = try self.handle!.forward(token: 79)
        XCTAssertEqual(initialLogits.count, afterLogits.count)

        for i in 0..<initialLogits.count {
            XCTAssertEqual(initialLogits[i], afterLogits[i])
        }
    }

    func testModel() throws {
        XCTAssertEqual(self.handle!.model, "phi2 [2.90 v1]")
    }

    func testContextLength() throws {
        XCTAssertEqual(self.handle!.contextLength, 2048)
    }

    func testMaxTopChoices() throws {
        XCTAssertGreaterThan(PicoLLM.maxTopChoices, 0)
    }

    func testGetDialog() throws {
        XCTAssertNotNil(try self.handle!.getDialog())
    }

    func testVersion() throws {
        XCTAssert(!PicoLLM.version.isEmpty)
    }

    func verifyDialogPrompt(testName: String, history: Int32? = nil, system: String? = nil) throws {
        let dialogClasses: [String: PicoLLMDialog.Type] = [
            "gemma-chat-dialog": GemmaChatDialog.self,
            "llama-2-chat-dialog": Llama2ChatDialog.self,
            "llama-3-chat-dialog": Llama3ChatDialog.self,
            "mistral-chat-dialog": MistralChatDialog.self,
            "phi2-chat-dialog": Phi2ChatDialog.self,
            "phi2-qa-dialog": Phi2QADialog.self
        ]
        let dialogPrompts = self.dialogTestData![testName] as! [String: String]

        let conversation = self.dialogTestData!["conversation"] as! [[String]]

        for (dialogClassName, dialogClassType) in dialogClasses {
            let prompt = dialogPrompts[dialogClassName]

            let dialog = try dialogClassType.init(history: history, system: system)
            for i in 0..<(conversation.count - 1) {
                try dialog.addHumanRequest(content: conversation[i][0])
                try dialog.addLLMResponse(content: conversation[i][1])
            }
            try dialog.addHumanRequest(content: conversation.last![0])
            XCTAssertEqual(try dialog.prompt(), prompt)
        }

    }

    func testDialogPrompt() throws {
        try verifyDialogPrompt(testName: "prompts")
    }

    func testDialogPromptWithSystem() throws {
        let system = self.dialogTestData!["system"] as! String

        try verifyDialogPrompt(testName: "prompts-with-system", system: system)
    }

    func testDialogPromptWithHistory() throws {
        try verifyDialogPrompt(testName: "prompts-with-history", history: 0)
    }

    func testDialogPromptWithSystemHistory() throws {
        let system = self.dialogTestData!["system"] as! String

        try verifyDialogPrompt(testName: "prompts-with-system-and-history", history: 0, system: system)
    }

    func testGetAvailableDevices() throws {
        let devices = try PicoLLM.getAvailableDevices()
        XCTAssert(!devices.isEmpty)
        for device in devices {
            XCTAssert(!device.isEmpty)
        }
    }

    func testMessageStack() throws {
        tearDownHelper()

        var first_error: String = ""
        do {
            let pllm = try PicoLLM.init(accessKey: "invalid", modelPath: modelPath)
            XCTAssertNil(pllm)
        } catch {
            first_error = "\(error.localizedDescription)"
            XCTAssert(first_error.count < 1024)
        }

        do {
            let pllm = try PicoLLM.init(accessKey: "invalid", modelPath: modelPath)
            XCTAssertNil(pllm)
        } catch {
            XCTAssert("\(error.localizedDescription)".count == first_error.count)
        }
    }
}

struct PicollmTestCase {
    var prompt: String
    var parameters: [String: Any]
    var expectations: [TestExpectation]

    init(name: String, data: [String: Any]) {
        let testData = data[name] as! [String: Any]

        self.prompt = testData["prompt"] as! String

        self.parameters = [:]
        let parameterData = testData["parameters"] as? [String: Any]
        let parameterNames = [
            "completion-token-limit",
            "stop-phrases",
            "presence-penalty",
            "frequency-penalty",
            "seeds",
            "seed",
            "temperature",
            "top-p",
            "num-top-choices"
        ]
        for name in parameterNames {
            let value = parameterData?[name] as? Any
            if value != nil {
                self.parameters[name] = value!
            }
        }

        self.expectations = []
        let expectationData = testData["expectations"] as? [Any]
        for expectation in expectationData ?? [] {
            if expectation is String {
                self.expectations.append(TestExpectation.str(expectation as! String))
            } else {
                self.expectations.append(TestExpectation.obj(PicoLLMExpectation(data: expectation as! [String: Any])))
            }
        }
    }
}

enum TestExpectation {
    case str (String)
    case obj (PicoLLMExpectation)
}

struct PicoLLMExpectation {
    var numPromptTokens: Int
    var numCompletionTokens: Int
    var endpoint: PicoLLMEndpoint
    var numTopChoices: Int
    var completion: String

    init(data: [String: Any]) {
        self.numPromptTokens = data["num-prompt-tokens"] as! Int
        self.numCompletionTokens = data["num-completion-tokens"] as! Int
        let endpoint = data["endpoint"] as! String
        self.endpoint = {
            switch endpoint {
            case "END_OF_SENTENCE":
                return PicoLLMEndpoint.endOfSentence
            case "COMPLETION_TOKEN_LIMIT_REACHED":
                return PicoLLMEndpoint.completionTokenLimitReached
            case "STOP_PHRASE_ENCOUNTERED":
                return PicoLLMEndpoint.stopPhraseEncountered
            default:
                return PicoLLMEndpoint.completionTokenLimitReached
            }
        }()
        self.numTopChoices = data["num-top-choices"] as! Int
        self.completion = data["completion"] as! String
    }

    init(
        numPromptTokens: Int,
        numCompletionTokens: Int,
        endpoint: PicoLLMEndpoint,
        numTopChoices: Int,
        completion: String
    ) {
        self.numPromptTokens = numPromptTokens
        self.numCompletionTokens = numCompletionTokens
        self.endpoint = endpoint
        self.numTopChoices = numTopChoices
        self.completion = completion

    }
}
