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
 * Represents a dialog helper for the 'phi-2' model within PicoLLM.
 * This is a base class that provides functionalities common to both 'chat' and 'qa' modes
 */
public class Phi2Dialog extends PicoLLMDialog {

    private final String humanTag;

    private final String llmTag;

    /**
     * Builder class for constructing Phi2Dialog instances.
     */
    protected static class Builder extends PicoLLMDialog.Builder {

        /**
         * Builds a new instance of Phi2Dialog based on the configured settings.
         *
         * @param humanTag The tag representing human input.
         * @param llmTag   The tag representing LLM output.
         * @return A new instance of Phi2Dialog.
         */
        protected Phi2Dialog build(String humanTag, String llmTag) {
            return new Phi2Dialog(humanTag, llmTag, this.history, this.system);
        }
    }

    /**
     * Constructs a Phi2Dialog instance with the specified history, system, human tag, and LLM tag.
     *
     * @param humanTag The tag representing human input.
     * @param llmTag   The tag representing LLM output.
     * @param history  The history length for the dialog.
     * @param system   The system instruction for configuring the model's responses.
     */
    protected Phi2Dialog(String humanTag, String llmTag, Integer history, String system) {
        super(history, system);
        this.humanTag = humanTag;
        this.llmTag = llmTag;
    }

    /**
     * Generates a prompt string based on the human requests and LLM responses.
     *
     * @return The formatted prompt string.
     * @throws PicoLLMException If there is an issue generating the prompt.
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
                    "%s: %s\n%s: %s\n",
                    this.humanTag,
                    human.get(i).trim(),
                    this.llmTag,
                    llm.get(i).trim()));
        }

        res.append(String.format(
                "%s: %s\n%s:",
                this.humanTag,
                human.get(human.size() - 1).trim(),
                this.llmTag));

        return res.toString();
    }
}
