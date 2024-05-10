/*
    Copyright 2024 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/

package ai.picovoice.picollm;

import java.util.ArrayList;

/**
 * `PicoLLMDialog` is a helper class that stores a chat dialog and formats it according
 * to an instruction-tuned LLM's chat template. `PicoLLMDialog` is the base class.
 * Each supported instruction-tuned LLM has an accompanying concrete subclass.
 */
public class PicoLLMDialog {

    protected final Integer history;

    protected final String system;

    protected final ArrayList<String> humanRequests;

    protected final ArrayList<String> llmResponses;

    /**
     * Builder class for constructing instances of PicoLLMDialog.
     */
    public static class Builder {
        protected Integer history = null;
        protected String system = null;

        /**
         * Sets the history length for the builder.
         *
         * @param history The history length to set. History refers to the number of latest
         *                back-and-forths to include in the prompt. Setting history to `null` will embed the
         *                entire dialog in the prompt.
         * @return Builder instance.
         */
        public Builder setHistory(Integer history) {
            if (history != null && history < 0) {
                throw new IllegalArgumentException("History should be a non-negative integer.");
            }
            this.history = history;
            return this;
        }

        /**
         * Sets the system instruction for the builder.
         *
         * @param system The system instruction to set. System instruction to embed in the
         *               prompt for configuring the model's responses.
         * @return Builder instance.
         */
        public Builder setSystem(String system) {
            this.system = system;
            return this;
        }

        /**
         * Builds a new instance of PicoLLMDialog based on the configured settings.
         *
         * @return A new instance of PicoLLMDialog.
         */
        public PicoLLMDialog build() {
            return new PicoLLMDialog(history, system);
        }
    }

    /**
     * Constructs a new instance of PicoLLMDialog with the specified history and system settings.
     *
     * @param history The history length for the dialog.
     * @param system  The system instruction for configuring the model's responses.
     */
    protected PicoLLMDialog(Integer history, String system) {
        this.history = history;
        this.system = system;
        this.humanRequests = new ArrayList<>();
        this.llmResponses = new ArrayList<>();
    }

    /**
     * Adds a human request to the dialog.
     *
     * @param content The human request to add.
     * @throws PicoLLMInvalidStateException if adding a human request without a corresponding LLM response.
     */
    public void addHumanRequest(String content) throws PicoLLMInvalidStateException {
        if (this.humanRequests.size() > this.llmResponses.size()) {
            throw new PicoLLMInvalidStateException(
                    "Entering a human request without entering the last LLM response is invalid."
            );
        }
        this.humanRequests.add(content);
    }

    /**
     * Adds an LLM response to the dialog.
     *
     * @param content The LLM response to add.
     * @throws PicoLLMInvalidStateException if adding an LLM response without a corresponding human request.
     */
    public void addLLMResponse(String content) throws PicoLLMInvalidStateException {
        if (this.humanRequests.size() == this.llmResponses.size()) {
            throw new PicoLLMInvalidStateException(
                    "Entering an LLM response without entering the human request is invalid."
            );
        }
        this.llmResponses.add(content);
    }

    /**
     * Creates a prompt string given parameters passed the constructor and dialog's content.
     *
     * @return Formatted prompt.
     * @throws PicoLLMException if called from the base PicoLLMDialog class.
     */
    public String getPrompt() throws PicoLLMException {
        throw new PicoLLMException("Only base classes of PicoLLMDialog can return create prompts");
    }
}

