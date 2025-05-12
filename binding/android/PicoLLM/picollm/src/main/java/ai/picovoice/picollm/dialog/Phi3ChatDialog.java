/*
    Copyright 2024-2025 Picovoice Inc.

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

import ai.picovoice.picollm.PicoLLMDialog;
import ai.picovoice.picollm.PicoLLMException;
import ai.picovoice.picollm.PicoLLMInvalidStateException;

/**
 * Represents a dialog helper specific for the `phi3` model.
 */
public class Phi3ChatDialog extends PicoLLMDialog {

    /**
     * Builder class for constructing Phi3ChatDialog instances.
     */
    public static class Builder extends PicoLLMDialog.Builder {
        /**
         * Builds a new instance of Phi3ChatDialog based on the configured settings.
         *
         * @return A new instance of Phi3ChatDialog.
         */
        public Phi3ChatDialog build() {
            return new Phi3ChatDialog(this.history, this.system);
        }
    }

    /**
     * Constructs a Phi3ChatDialog instance with the specified history and system settings.
     *
     * @param history The history length for the dialog.
     * @param system  The system instruction for configuring the model's responses.
     */
    Phi3ChatDialog(Integer history, String system) {
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
        if (this.system != null) {
            res.append(String.format("<|system|>\n%s<|end|>\n", this.system.trim()));
        }

        for (int i = 0; i < llm.size(); i++) {
            res.append(String.format(
                    "<|user|>\n%s<|end|>\n",
                    human.get(i).trim()));
            res.append(String.format("<|assistant|>\n%s<|end|>\n",
                    llm.get(i).trim()));
        }

        res.append(String.format(
                "<|user|>\n%s<|end|>\n",
                human.get(human.size() - 1).trim()));
        res.append("<|assistant|>\n");

        return res.toString();
    }
}
