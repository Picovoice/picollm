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
 * `PicoLLMDialog` subclass for `phi-2` models.
 * This is a base class, use one of the mode-specific subclasses.
 */
public class Phi2Dialog extends PicoLLMDialog {

    private final String humanTag;

    private final String llmTag;

    protected static class Builder extends PicoLLMDialog.Builder {

        protected Phi2Dialog build(String humanTag, String llmTag) {
            return new Phi2Dialog(humanTag, llmTag, this.history, this.system);
        }
    }

    protected Phi2Dialog(String humanTag, String llmTag, Integer history, String system) {
        super(history, system);
        this.humanTag = humanTag;
        this.llmTag = llmTag;
    }

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
