/*
    Copyright 2025 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
    file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
    an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

using System;
using System.Collections.Generic;
using System.Linq;

namespace Pv
{
    /// <summary>
    /// PicoLLMDialog is a helper class that stores a chat dialog and formats it according to an instruction-tuned
    /// LLM's chat template. PicoLLMDialog is the base class. Each supported instruction-tuned LLM has an accompanying concrete subclass.
    /// </summary>
    public class PicoLLMDialog
    {
        protected readonly int? _history;
        protected readonly string _system;

        protected readonly List<string> _humanRequests;
        protected readonly List<string> _llmResponses;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="history">_history refers to the number of latest back-and-forths to include in the prompt. Setting history
        ///         to `null` will embed the entire dialog in the prompt.</param>
        /// <param name="system">_system instruction to embed in the prompt for configuring the model's responses.</param>
        /// <exception cref="PicoLLMInvalidArgumentException">Throws if history is negative.</exception>
        protected PicoLLMDialog(int? history = null, string system = null)
        {
            if (history != null && history < 0)
            {
                throw new PicoLLMInvalidArgumentException("`history` should be null or a non-negative integer");
            }

            _history = history;
            _system = system;
            _humanRequests = new List<string>();
            _llmResponses = new List<string>();
        }

        /// <summary>
        /// Adds humanRequests's request to the dialog.
        /// </summary>
        /// <param name="content">Human's request.</param>
        /// <exception cref="PicoLLMInvalidStateException">Throws if a human request is added without a previous LLM response.</exception>
        public void AddHumanRequest(string content)
        {
            if (_humanRequests.Count > _llmResponses.Count)
            {
                throw new PicoLLMInvalidStateException("Entering a human request without entering the last LLM response is invalid.");
            }

            _humanRequests.Add(content);
        }

        /// <summary>
        /// Adds LLM's response to the dialog.
        /// </summary>
        /// <param name="content">LLM's response.</param>
        /// <exception cref="PicoLLMInvalidStateException">Throws if an LLM response is added without a previous human request.</exception>
        public void AddLLMResponse(string content)
        {
            if (_humanRequests.Count == _llmResponses.Count)
            {
                throw new PicoLLMInvalidStateException("Entering an LLM response without entering the human request is invalid.");
            }

            _llmResponses.Add(content);
        }

        /// <summary>
        /// Creates a prompt string given parameters passed to the constructor and dialog's content.
        /// </summary>
        /// <returns>Formatted prompt.</returns>
        /// <exception cref="PicoLLMException">Throws if prompt creation is not implemented.</exception>
        public virtual string Prompt()
        {
            throw new PicoLLMException("Only subclasses of PicoLLMDialog can create prompts.");
        }
    }

    /// <summary>
    /// Dialog helper for `phi-2`. This is a base class; use one of the mode-specific subclasses.
    /// </summary>
    public class Phi2Dialog : PicoLLMDialog
    {
        private readonly string _humanRequestsTag;
        private readonly string _llmResponsesTag;

        protected Phi2Dialog(
            string humanRequestsTag,
            string llmResponsesTag,
            int? history = null,
            string system = null)
            : base(history, system)
        {
            _humanRequestsTag = humanRequestsTag;
            _llmResponsesTag = llmResponsesTag;
        }

        public override string Prompt()
        {
            if (_humanRequests.Count == _llmResponses.Count)
            {
                throw new PicoLLMInvalidStateException("Cannot create a prompt without an outstanding human request");
            }

            List<string> humanRequests = _history == null
                ? _humanRequests
                : _humanRequests.Skip(_humanRequests.Count - (int)_history - 1).ToList();
            List<string> llmResponses = _history == null
                ? _llmResponses
                : _llmResponses.Skip(_llmResponses.Count - (int)_history).ToList();

            string result = string.Empty;
            for (int i = 0; i < llmResponses.Count; i++)
            {
                result += $"{_humanRequestsTag}: {humanRequests[i].Trim()}\n{_llmResponsesTag}: {llmResponses[i].Trim()}\n";
            }

            result += $"{_humanRequestsTag}: {humanRequests.Last().Trim()}\n{_llmResponsesTag}:";

            return result;
        }
    }

    /// <summary>
    /// Dialog helper for `phi-2` `qa` mode.
    /// </summary>
    public class Phi2QADialog : Phi2Dialog
    {
        public Phi2QADialog(int? history = null, string system = null)
            : base("Instruct", "Output", history, system)
        {
        }
    }

    /// <summary>
    /// Dialog helper for `phi-2` `chat` mode.
    /// </summary>
    public class Phi2ChatDialog : Phi2Dialog
    {
        public Phi2ChatDialog(int? history = null, string system = null)
            : base("Human", "AI", history, system)
        {
        }
    }

    /// <summary>
    /// Dialog helper for `phi3`.
    /// </summary>
    public class Phi3ChatDialog : PicoLLMDialog
    {
        public Phi3ChatDialog(int? history = null, string system = null) : base(history, system) { }

        public override string Prompt()
        {
            if (_humanRequests.Count == _llmResponses.Count)
            {
                throw new PicoLLMInvalidStateException("Only subclasses of IPicoLLMDialog can create prompts.");
            }

            List<string> humanRequests = _history == null
                ? _humanRequests
                : _humanRequests.Skip(_humanRequests.Count - (int)_history - 1).ToList();
            List<string> llmResponses = _history == null
                ? _llmResponses
                : _llmResponses.Skip(_llmResponses.Count - (int)_history).ToList();

            string result = "";
            if (_system != null)
            {
                result += $"<|system|>\n{_system.Trim()}<|end|>\n";
            }

            for (int i = 0; i < llmResponses.Count; i++)
            {
                result += $"<|user|>\n{humanRequests[i].Trim()}<|end|>\n";
                result += $"<|assistant|>\n{llmResponses[i].Trim()}<|end|>\n";
            }

            result += $"<|user|>\n{humanRequests.Last().Trim()}<|end|>\n";
            result += "<|assistant|>\n";

            return result;
        }
    }

    /// <summary>
    /// Dialog helper for `phi3.5`.
    /// </summary>
    public class Phi35ChatDialog : Phi3ChatDialog
    {
        public Phi35ChatDialog(int? history = null, string system = null) : base(history, system) { }
    }

    /// <summary>
    /// Dialog helper for `mistral-7b-instruct-v0.1` and `mistral-7b-instruct-v0.2`.
    /// </summary>
    public class MistralChatDialog : PicoLLMDialog
    {
        public MistralChatDialog(int? history = null, string system = null) : base(history, system) { }

        public override string Prompt()
        {
            if (_humanRequests.Count == _llmResponses.Count)
            {
                throw new PicoLLMInvalidStateException("Cannot create a prompt without an outstanding human request");
            }

            List<string> humanRequests = _history == null
                ? _humanRequests
                : _humanRequests.Skip(_humanRequests.Count - (int)_history - 1).ToList();
            List<string> llmResponses = _history == null
                ? _llmResponses
                : _llmResponses.Skip(_llmResponses.Count - (int)_history).ToList();

            string result = string.Empty;
            for (int i = 0; i < llmResponses.Count; i++)
            {
                result += $"[INST] {humanRequests[i].Trim()} [/INST] {llmResponses[i].Trim()}</s>";
            }

            result += $"[INST] {humanRequests.Last().Trim()} [/INST]";

            return result;
        }
    }

    /// <summary>
    /// Dialog helper for `mixtral-8x7b-instruct-v0.1`.
    /// </summary>
    public class MixtralChatDialog : MistralChatDialog
    {
        public MixtralChatDialog(int? history = null, string system = null) : base(history, system) { }
    }

    /// <summary>
    /// Dialog helper for `llama-2-7b-chat`, `llama-2-13b-chat`, and `llama-2-70b-chat`.
    /// </summary>
    public class Llama2ChatDialog : PicoLLMDialog
    {
        public Llama2ChatDialog(int? history = null, string system = null) : base(history, system) { }

        public override string Prompt()
        {
            if (_humanRequests.Count == _llmResponses.Count)
            {
                throw new PicoLLMInvalidStateException("Cannot create a prompt without an outstanding human request");
            }

            List<string> humanRequests = _history == null
                ? _humanRequests
                : _humanRequests.Skip(_humanRequests.Count - (int)_history - 1).ToList();
            List<string> llmResponses = _history == null
                ? _llmResponses
                : _llmResponses.Skip(_llmResponses.Count - (int)_history).ToList();

            string result = string.Empty;
            for (int i = 0; i < llmResponses.Count; i++)
            {
                string instruction = humanRequests[i].Trim();
                if (_system != null && i == 0)
                {
                    instruction = $"<<SYS>>\n{_system.Trim()}\n<</SYS>>\n\n{instruction}";
                }

                result += $"<s>[INST] {instruction} [/INST] {llmResponses[i].Trim()} </s>";
            }

            string lastInstruction = humanRequests.Last().Trim();
            if (_system != null && humanRequests.Count == 1)
            {
                lastInstruction = $"<<SYS>>\n{_system.Trim()}\n<</SYS>>\n\n{lastInstruction}";
            }

            result += $"<s>[INST] {lastInstruction} [/INST]";

            return result;
        }
    }

    /// <summary>
    /// Dialog helper for `llama-3-8b-instruct` and `llama-3-70b-instruct`.
    /// </summary>
    public class Llama3ChatDialog : PicoLLMDialog
    {
        public Llama3ChatDialog(int? history = null, string system = null) : base(history, system) { }

        public override string Prompt()
        {
            if (_humanRequests.Count == _llmResponses.Count)
            {
                throw new PicoLLMInvalidStateException("Only subclasses of IPicoLLMDialog can create prompts.");
            }

            List<string> humanRequests = _history == null
                ? _humanRequests
                : _humanRequests.Skip(_humanRequests.Count - (int)_history - 1).ToList();
            List<string> llmResponses = _history == null
                ? _llmResponses
                : _llmResponses.Skip(_llmResponses.Count - (int)_history).ToList();

            string result = "<|begin_of_text|>";
            if (_system != null)
            {
                result += $"<|start_header_id|>system<|end_header_id|>\n\n{_system.Trim()}<|eot_id|>";
            }
            for (int i = 0; i < llmResponses.Count; i++)
            {
                result += $"<|start_header_id|>user<|end_header_id|>\n\n{humanRequests[i].Trim()}<|eot_id|>";
                result += $"<|start_header_id|>assistant<|end_header_id|>\n\n{llmResponses[i].Trim()}<|eot_id|>";
            }

            result += $"<|start_header_id|>user<|end_header_id|>\n\n{humanRequests.Last().Trim()}<|eot_id|>";
            result += "<|start_header_id|>assistant<|end_header_id|>\n\n";

            return result;
        }
    }

    /// <summary>
    /// Dialog helper for `llama-3.2-1b-instruct` and `llama-3.2-3b-instruct`.
    /// </summary>
    public class Llama32ChatDialog : Llama3ChatDialog
    {
        public Llama32ChatDialog(int? history = null, string system = null) : base(history, system) { }
    }

    /// <summary>
    /// Dialog helper for `gemma-2b-it` and `gemma-7b-it`.
    /// </summary>
    public class GemmaChatDialog : PicoLLMDialog
    {
        public GemmaChatDialog(int? history = null, string system = null) : base(history, system) { }

        public override string Prompt()
        {
            if (_humanRequests.Count == _llmResponses.Count)
            {
                throw new PicoLLMInvalidStateException("Only subclasses of IPicoLLMDialog can create prompts.");
            }

            List<string> humanRequests = _history == null
                ? _humanRequests
                : _humanRequests.Skip(_humanRequests.Count - (int)_history - 1).ToList();
            List<string> llmResponses = _history == null
                ? _llmResponses
                : _llmResponses.Skip(_llmResponses.Count - (int)_history).ToList();

            string result = string.Empty;
            for (int i = 0; i < llmResponses.Count; i++)
            {
                result += $"<start_of_turn>user\n{humanRequests[i].Trim()}<end_of_turn>\n";
                result += $"<start_of_turn>model\n{llmResponses[i].Trim()}<end_of_turn>\n";
            }

            result += $"<start_of_turn>user\n{humanRequests.Last().Trim()}<end_of_turn>\n<start_of_turn>model";

            return result;
        }
    }

}