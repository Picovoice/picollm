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

    private let ACCESS_KEY = "${YOUR_ACCESS_KEY_HERE}"

    private var picollm: PicoLLM?

    private var timerTick = CFAbsoluteTimeGetCurrent()
    private var timerTock = CFAbsoluteTimeGetCurrent()
    private var numTokens = 0

    static let modelLoadStatusTextDefault = """
Start by loading a `.pllm` model file.

You can download directly to your device or airdrop from a Mac.
"""
    @Published var modelLoadStatusText = modelLoadStatusTextDefault
    @Published var enableLoadModelButton = true
    @Published var showFileImporter = false
    @Published var selectedModelUrl: URL?

    @Published var picoLLMLoaded = false

    @Published var promptText = ""
    @Published var generateTemperature = 0.0
    @Published var generateCompletionTokenLimit = 128.0
    @Published var stopPhrasesText = ""
    @Published var generateTopP = 1.0
    @Published var generatePresencePenalty = 0.0
    @Published var generateFrequencyPenalty = 0.0
    @Published var generateNumTopChoices = 0.0
    @Published var enableGenerateButton = true

    @Published var completionPromptText = ""
    @Published var completionText = ""
    @Published var tpsText = ""
    @Published var statsText = ""

    @Published var errorMessage = ""

    deinit {
        if picollm != nil {
            picollm!.delete()
        }
    }

    public func extractModelFile() {
        showFileImporter = true
    }

    public func loadPicollm() {
        errorMessage = ""
        modelLoadStatusText = "Loading picoLLM..."
        enableLoadModelButton = false

        let modelAccess = selectedModelUrl!.startAccessingSecurityScopedResource()
        if !modelAccess {
            errorMessage = "Can't get permissions to access model file"
            enableLoadModelButton = true
            return
        }

        DispatchQueue.global(qos: .userInitiated).async { [self] in
            do {
                picollm = try PicoLLM(accessKey: ACCESS_KEY, modelPath: selectedModelUrl!.path)
                DispatchQueue.main.async { [self] in
                    picoLLMLoaded = true
                }
            } catch {
                DispatchQueue.main.async { [self] in
                    errorMessage = "\(error.localizedDescription)"
                }
            }

            DispatchQueue.main.async { [self] in
                selectedModelUrl!.stopAccessingSecurityScopedResource()

                modelLoadStatusText = ViewModel.modelLoadStatusTextDefault
                enableLoadModelButton = true
            }
        }
    }

    public func unloadPicollm() {
        if picollm != nil {
            picollm!.delete()
        }
        picollm = nil

        errorMessage = ""
        promptText = ""
        completionPromptText = ""
        completionText = ""
        tpsText = ""
        statsText = ""
        picoLLMLoaded = false
    }

    private func streamCallback(completion: String) {
        DispatchQueue.main.async { [self] in
            completionText += completion

            if numTokens == 0 {
                timerTick = CFAbsoluteTimeGetCurrent()
            }

            timerTock = CFAbsoluteTimeGetCurrent()
            numTokens += 1
        }
    }

    public func generate() {
        if promptText.isEmpty {
            return
        }

        errorMessage = ""

        let stopPhrases = stopPhrasesText.isEmpty ? nil : stopPhrasesText
            .split(separator: ",")
            .map({(phrase) in phrase.trimmingCharacters(in: .whitespacesAndNewlines)})

        if stopPhrases != nil && stopPhrases!.isEmpty {
            errorMessage = "Empty or all whitespace stop phrases is invalid"
            return
        }
        for phrase in stopPhrases ?? [] where phrase.isEmpty {
            errorMessage = "Empty or all whitespace stop phrase is invalid"
            return
        }

        enableGenerateButton = false
        completionPromptText = promptText
        completionText = ""
        tpsText = ""
        statsText = ""
        numTokens = 0

        DispatchQueue.global(qos: .userInitiated).async { [self] in
            do {
                let result = try picollm!.generate(
                    prompt: promptText,
                    completionTokenLimit: Int32(generateCompletionTokenLimit),
                    stopPhrases: stopPhrases,
                    presencePenalty: Float(generatePresencePenalty),
                    frequencyPenalty: Float(generateFrequencyPenalty),
                    temperature: Float(generateTemperature),
                    topP: Float(generateTopP),
                    numTopChoices: Int32(generateNumTopChoices),
                    streamCallback: streamCallback)
                DispatchQueue.main.async { [self] in
                    updateStats(result: result)
                }
            } catch {
                DispatchQueue.main.async { [self] in
                    errorMessage = "\(error.localizedDescription)"
                    enableLoadModelButton = true
                }
            }

            DispatchQueue.main.async { [self] in
                promptText = ""
                enableGenerateButton = true
            }
        }
    }

    private struct TpsStats: Codable {
        public let tokensPerSecond: Double

        public init(tokensPerSecond: Double) {
            self.tokensPerSecond = tokensPerSecond
        }
    }

    public func updateStats(result: PicoLLMCompletion) {
        let secondsElapsed: Double = (timerTock - timerTick)
        let tokensPerSecond: Double = Double(numTokens) / secondsElapsed

        tpsText = String(format: "%0.2f tokens per second", tokensPerSecond)

        do {
            let jsonEncoder = JSONEncoder()
            jsonEncoder.outputFormatting = .prettyPrinted
            var jsonData = try jsonEncoder.encode(result)
            statsText = String(data: jsonData, encoding: String.Encoding.utf8) ?? ""

            let tpsResult = TpsStats(tokensPerSecond: tokensPerSecond)
            jsonData = try jsonEncoder.encode(tpsResult)
            statsText += String(data: jsonData, encoding: String.Encoding.utf8) ?? ""
        } catch {
            DispatchQueue.main.async { [self] in
                errorMessage = "\(error.localizedDescription)"
            }
        }
    }
}
