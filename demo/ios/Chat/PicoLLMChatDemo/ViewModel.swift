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
    private var dialog: PicoLLMDialog?

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
    @Published var enableGenerateButton = true

    @Published var chatText: [Message] = []

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
                dialog = try picollm!.getDialog()
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
        chatText.removeAll()
        picoLLMLoaded = false
    }

    private func streamCallback(completion: String) {
        DispatchQueue.main.async { [self] in
            chatText[chatText.count - 1].append(text: completion)

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

        enableGenerateButton = false
        numTokens = 0

        DispatchQueue.global(qos: .userInitiated).async { [self] in
            do {
                try dialog!.addHumanRequest(content: promptText)

                DispatchQueue.main.async { [self] in
                    chatText.append(Message(speaker: "You", msg: promptText))
                    chatText.append(Message(speaker: "picoLLM", msg: ""))
                }

                let result = try picollm!.generate(
                    prompt: dialog!.prompt(),
                    completionTokenLimit: 128,
                    streamCallback: streamCallback)

                try dialog!.addLLMResponse(content: result.completion)
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

    public func clearText() {
        promptText = ""
        chatText.removeAll()
    }
}

struct Message: Equatable {
    var speaker: String
    var msg: String

    mutating func append(text: String) {
        self.msg.append(text)
    }
}
