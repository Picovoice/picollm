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
import java.util.List;

/**
 * Represents a dialog helper specific for `mistral-7b-instruct-v0.1` and `mistral-7b-instruct-v0.2` models.
 */
public class MistralChatDialog extends PicoLLMDialog {

    /**
     * Builder class for constructing MistralChatDialog instances.
     */
    public static class Builder extends PicoLLMDialog.Builder {
        /**
         * Builds a new instance of MistralChatDialog based on the configured settings.
         *
         * @return A new instance of MistralChatDialog.
         */
        public MistralChatDialog build() {
            return new MistralChatDialog(this.history, this.system);
        }
    }

    /**
     * Constructs a MistralChatDialog instance with the specified history and system settings.
     *
     * @param history The history length for the dialog.
     * @param system  The system instruction for configuring the model's responses.
     */
    MistralChatDialog(Integer history, String system) {
        super(history, system);
    }

    /**
     * Generates a formatted prompt string based on the dialog's content and configured settings.
     *
     * @return A formatted prompt string.
     * @throws PicoLLMException If there's an issue generating the prompt.
     */
    @Override
    public String getPrompt() throws PicoLLMException {
        if (this.humanRequests.size() == this.llmResponses.size()) {
            throw new PicoLLMInvalidStateException(
                    "Cannot create a prompt without an outstanding human request"
            );
        }

        List<String> human = (this.history == null) ? this.humanRequests :
                this.humanRequests.subList(
                        this.humanRequests.size() - (this.history + 1),
                        this.humanRequests.size());
        List<String> llm = (this.history == null) ? this.llmResponses :
                (this.history == 0) ? new ArrayList<>() :
                        this.llmResponses.subList(
                                this.llmResponses.size() - this.history,
                                this.llmResponses.size());

        StringBuilder res = new StringBuilder();
        for (int i = 0; i < llm.size(); i++) {
            res.append(String.format(
                    "[INST] %s [/INST] %s</s>",
                    human.get(i).trim(),
                    llm.get(i).trim()));
        }

        res.append(String.format(
                "[INST] %s [/INST]",
                human.get(human.size() - 1).trim()));

        return res.toString();
    }
}
