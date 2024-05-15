//
//  Copyright 2024 Picovoice Inc.
//  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
//  file accompanying this source.
//  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
//  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  specific language governing permissions and limitations under the License.
//

/// Protocol representing the picoLLM dialog interface.
public protocol PicoLLMDialog {
    init(history: Int32?, system: String?) throws

    func addHumanRequest(content: String) throws
    func addLLMResponse(content: String) throws
    func prompt() throws -> String
}

/// BasePicoLLMDialog is a helper class that stores a chat dialog and formats it according to an instruction-tuned
/// LLM's chat template.
/// BasePicoLLMDialog is the base class. Each supported instruction-tuned LLM has an accompanying concrete subclass.
public class BasePicoLLMDialog: PicoLLMDialog {
    internal var history: Int32?
    internal var system: String?

    internal var humanRequests: [String]
    internal var llmResponses: [String]

    /// Constructor.
    ///
    /// - Parameters:
    ///   - history: History refers to the number of latest back-and-forths to include in the prompt. Setting history
    ///         to `nil` will embed the entire dialog in the prompt.
    ///   - system: System instruction to embed in the prompt for configuring the model's responses.
    /// - Throws: PicoLLMError
    required public init(
        history: Int32? = nil,
        system: String? = nil
    ) throws {

        if (history ?? 0) < 0 {
            throw PicoLLMInvalidArgumentError("`history` should be nil or a non-negative integer")
        }

        self.history = history
        self.system = system

        self.humanRequests = []
        self.llmResponses = []
    }

    /// Adds humanRequests's request to the dialog.
    ///
    /// - Parameters:
    ///   - content: Human's request.
    /// - Throws: PicoLLMError
    public func addHumanRequest(content: String) throws {
        if self.humanRequests.count > self.llmResponses.count {
            throw PicoLLMInvalidStateError(
                "Entering a human request without entering the last LLM response is invalid.")
        }

        self.humanRequests.append(content)
    }

    /// Adds LLM's response to the dialog.
    ///
    /// - Parameters:
    ///   - content: LLM's response.
    /// - Throws: PicoLLMError
    public func addLLMResponse(content: String) throws {
        if self.humanRequests.count == self.llmResponses.count {
            throw PicoLLMInvalidStateError("Entering a llm response without entering the human request is invalid.")
        }

        self.llmResponses.append(content)
    }

    /// Creates a prompt string given parameters passed the constructor and dialog's content.
    ///
    /// - Throws: PicoLLMError
    /// - Returns: Formatted prompt.
    public func prompt() throws -> String {
        throw PicoLLMInvalidStateError("Only subclasses of PicoLLMDialog can return create prompts.")
    }
}

/// Dialog helper for `phi-2`. This is a base class, use one of the mode-specific subclasses.
public class Phi2Dialog: BasePicoLLMDialog {
    private var humanRequestsTag: String
    private var llmResponsesTag: String

    public init(
        humanRequestsTag: String,
        llmResponsesTag: String,
        history: Int32? = nil,
        system: String? = nil
    ) throws {
        self.humanRequestsTag = humanRequestsTag
        self.llmResponsesTag = llmResponsesTag

        try super.init(history: history, system: system)
    }

    required public init(history: Int32? = nil, system: String? = nil) throws {
        throw PicoLLMRuntimeError("init(history:system:) has not been implemented")
    }

    public override func prompt() throws -> String {
        if self.humanRequests.count == self.llmResponses.count {
            throw PicoLLMInvalidStateError("Only subclasses of PicoLLMDialog can return create prompts.")
        }

        let humanRequests = (self.history == nil) ?
            self.humanRequests[...] :
            self.humanRequests[(self.humanRequests.count - Int(self.history!) - 1)...]
        let llmResponses = (self.history == nil) ?
            self.llmResponses[...] :
            self.llmResponses[(self.llmResponses.count - Int(self.history!))...]

        var res = ""
        for i in 0..<llmResponses.count {
            res += String(
              format: "%@: %@\n%@: %@\n",
              self.humanRequestsTag,
              humanRequests[i].trimmingCharacters(in: .whitespacesAndNewlines),
              self.llmResponsesTag,
              llmResponses[i].trimmingCharacters(in: .whitespacesAndNewlines)
            )
        }

        res += String(
          format: "%@: %@\n%@:",
          self.humanRequestsTag,
          humanRequests.last!.trimmingCharacters(in: .whitespacesAndNewlines),
          self.llmResponsesTag
        )

        return res
    }
}

/// Dialog helper for `phi-2` `qa` mode.
public class Phi2QADialog: Phi2Dialog {
    public required init(
        history: Int32? = nil,
        system: String? = nil
    ) throws {
        try super.init(humanRequestsTag: "Instruct", llmResponsesTag: "Output", history: history, system: system)
    }
}

/// Dialog helper for `phi-2` `chat` mode.
public class Phi2ChatDialog: Phi2Dialog {
    public required init(
        history: Int32? = nil,
        system: String? = nil
    ) throws {
        try super.init(humanRequestsTag: "Human", llmResponsesTag: "AI", history: history, system: system)
    }
}

/// Dialog helper for `mistral-7b-instruct-v0.1` and `mistral-7b-instruct-v0.2`.
public class MistralChatDialog: BasePicoLLMDialog {
    public override func prompt() throws -> String {
        if self.humanRequests.count == self.llmResponses.count {
            throw PicoLLMInvalidStateError("Only subclasses of PicoLLMDialog can return create prompts.")
        }

        let humanRequests = (self.history == nil) ?
            self.humanRequests[...] :
            self.humanRequests[(self.humanRequests.count - Int(self.history!) - 1)...]
        let llmResponses = (self.history == nil) ?
            self.llmResponses[...] :
            self.llmResponses[(self.llmResponses.count - Int(self.history!))...]

        var res = ""
        for i in 0..<llmResponses.count {
            res += String(
              format: "[INST] %@ [/INST] %@</s>",
              humanRequests[i].trimmingCharacters(in: .whitespacesAndNewlines),
              llmResponses[i].trimmingCharacters(in: .whitespacesAndNewlines)
            )
        }

        res += String(
          format: "[INST] %@ [/INST]",
          humanRequests.last!.trimmingCharacters(in: .whitespacesAndNewlines)
        )

        return res
    }
}

///  Dialog helper for `mixtral-8x7b-instruct-v0.1`.
public class MixtralChatDialog: MistralChatDialog {

}

/// Dialog helper for `llama-2-7b-chat`, `llama-2-13b-chat`, and `llama-2-70b-chat`.
public class Llama2ChatDialog: BasePicoLLMDialog {
    public override func prompt() throws -> String {
        if self.humanRequests.count == self.llmResponses.count {
            throw PicoLLMInvalidStateError("Only subclasses of PicoLLMDialog can return create prompts.")
        }

        let humanRequests = (self.history == nil) ?
            self.humanRequests[...] :
            self.humanRequests[(self.humanRequests.count - Int(self.history!) - 1)...]
        let llmResponses = (self.history == nil) ?
            self.llmResponses[...] :
            self.llmResponses[(self.llmResponses.count - Int(self.history!))...]

        var res = ""
        for i in 0..<llmResponses.count {
            var instruction = humanRequests[i].trimmingCharacters(in: .whitespacesAndNewlines)
            if system != nil && i == 0 {
                instruction = String(format: "<<SYS>>\n%@\n<</SYS>>\n\n%@", system!, instruction)
            }

            res += String(
              format: "<s>[INST] %@ [/INST] %@ </s>",
              instruction,
              llmResponses[i].trimmingCharacters(in: .whitespacesAndNewlines)
            )
        }

        var instruction = humanRequests.last!.trimmingCharacters(in: .whitespacesAndNewlines)
        if system != nil && humanRequests.count == 1 {
            instruction = String(format: "<<SYS>>\n%@\n<</SYS>>\n\n%@", system!, instruction)
        }

        res += String(
          format: "<s>[INST] %@ [/INST]",
          instruction
        )

        return res
    }
}

/// Dialog helper for `llama-3-8b-instruct` and `llama-3-70b-instruct`.
public class Llama3ChatDialog: BasePicoLLMDialog {
    public override func prompt() throws -> String {
        if self.humanRequests.count == self.llmResponses.count {
            throw PicoLLMInvalidStateError("Only subclasses of PicoLLMDialog can return create prompts.")
        }

        let humanRequests = (self.history == nil) ?
            self.humanRequests[...] :
            self.humanRequests[(self.humanRequests.count - Int(self.history!) - 1)...]
        let llmResponses = (self.history == nil) ?
            self.llmResponses[...] :
            self.llmResponses[(self.llmResponses.count - Int(self.history!))...]

        var res = "<|begin_of_text|>"
        for i in 0..<llmResponses.count {
            res += String(
                format: "<|start_header_id|>user<|end_header_id|>\n\n%@<|eot_id|>",
                humanRequests[i].trimmingCharacters(in: .whitespacesAndNewlines)
            )
            res += String(
                format: "<|start_header_id|>assistant<|end_header_id|>\n\n%@<|eot_id|>",
                llmResponses[i].trimmingCharacters(in: .whitespacesAndNewlines)
            )
        }

        res += String(
            format: "<|start_header_id|>user<|end_header_id|>\n\n%@<|eot_id|>",
            humanRequests.last!.trimmingCharacters(in: .whitespacesAndNewlines)
        )
        res += String(
            format: "<|start_header_id|>assistant<|end_header_id|>\n\n"
        )

        return res
    }
}

/// Dialog helper for `gemma-2b-it` and `gemma-7b-it`.
public class GemmaChatDialog: BasePicoLLMDialog {
    public override func prompt() throws -> String {
        if self.humanRequests.count == self.llmResponses.count {
            throw PicoLLMInvalidStateError("Only subclasses of PicoLLMDialog can return create prompts.")
        }

        let humanRequests = (self.history == nil) ?
            self.humanRequests[...] :
            self.humanRequests[(self.humanRequests.count - Int(self.history!) - 1)...]
        let llmResponses = (self.history == nil) ?
            self.llmResponses[...] :
            self.llmResponses[(self.llmResponses.count - Int(self.history!))...]

        var res = ""
        for i in 0..<llmResponses.count {
            res += String(
                format: "<start_of_turn>user\n%@<end_of_turn>\n",
                humanRequests[i].trimmingCharacters(in: .whitespacesAndNewlines)
            )
            res += String(
                format: "<start_of_turn>model\n%@<end_of_turn>\n",
                llmResponses[i].trimmingCharacters(in: .whitespacesAndNewlines)
            )
        }

        res += String(
            format: "<start_of_turn>user\n%@<end_of_turn>\n<start_of_turn>model",
            humanRequests.last!.trimmingCharacters(in: .whitespacesAndNewlines)
        )

        return res
    }
}
