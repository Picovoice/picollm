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

    @Published var promptText = ""

    @Published var completionText = ""
    @Published var statsText = ""

    @Published var errorMessage = ""

    @Published var showFileImporter = false
    @Published var enableLoadModelButton = true
    @Published var enableGenerateButton = false
    @Published var selectedModelUrl: URL?

    deinit {
        if picollm != nil {
            picollm!.delete()
        }
    }

    public func extractModelFile() {
        showFileImporter = true
    }

    public func loadPicollm() {
        completionText = "Loading Picollm..."
        enableLoadModelButton = false
        enableGenerateButton = false

        let modelAccess = selectedModelUrl!.startAccessingSecurityScopedResource()
        if !modelAccess {
            errorMessage = "Cann't get permissions to access model file"
            enableLoadModelButton = true
            return
        }

        DispatchQueue.global(qos: .userInitiated).async { [self] in
            do {
                picollm = try PicoLLM(accessKey: ACCESS_KEY, modelPath: selectedModelUrl!.path)
                DispatchQueue.main.async { [self] in
                    completionText = "Enter prompt!"
                    enableGenerateButton = true
                }
            } catch {
                DispatchQueue.main.async { [self] in
                    errorMessage = "\(error)"
                    enableLoadModelButton = true
                }
            }

            DispatchQueue.main.async { [self] in
                selectedModelUrl!.stopAccessingSecurityScopedResource()
            }
        }
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
        enableGenerateButton = false
        completionText = promptText
        numTokens = 0

        DispatchQueue.global(qos: .userInitiated).async { [self] in
            do {
                let result = try picollm!.generate(
                    prompt: promptText,
                    completionTokenLimit: 20,
                    streamCallback: streamCallback)
                DispatchQueue.main.async { [self] in
                    updateStats(result: result)
                }
            } catch {
                DispatchQueue.main.async { [self] in
                    errorMessage = "\(error)"
                    enableLoadModelButton = true
                }
            }

            DispatchQueue.main.async { [self] in
                enableGenerateButton = true
            }
        }
    }

    public func updateStats(result: PicoLLMCompletion) {
        let secondsElapsed: Double = (timerTock - timerTick)
        let tokensPerSecond: Double = Double(numTokens) / secondsElapsed

        statsText = """
Usage:
\t \(result.usage.promptTokens) prompt tokens
\t \(result.usage.completionTokens) completion tokens
Perormance:
\t \(tokensPerSecond) tokens per second
"""

    }
}
