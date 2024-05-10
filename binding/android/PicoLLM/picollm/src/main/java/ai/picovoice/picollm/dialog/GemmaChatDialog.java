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
 * `PicoLLMDialog` subclass for `gemma-2b-it` and `gemma-7b-it` models.
 */
public class GemmaChatDialog extends PicoLLMDialog {

    public static class Builder extends PicoLLMDialog.Builder {
        public GemmaChatDialog build() {
            return new GemmaChatDialog(this.history, this.system);
        }
    }

    GemmaChatDialog(Integer history, String system) {
        super(history, system);
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
                    "<start_of_turn>user\n%s<end_of_turn>\n",
                    human.get(i).trim()));
            res.append(String.format(
                    "<start_of_turn>model\n%s<end_of_turn>\n",
                    llm.get(i).trim()));
        }
        res.append(String.format(
                "<start_of_turn>user\n%s<end_of_turn>\n<start_of_turn>model",
                human.get(human.size() - 1).trim()));

        return res.toString();
    }
}
