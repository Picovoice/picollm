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
 * `PicoLLMDialog` subclass for `llama-2-7b-chat`, `llama-2-13b-chat`, and `llama-2-70b-chat` models.
 */
public class Llama2ChatDialog extends PicoLLMDialog {

    public static class Builder extends PicoLLMDialog.Builder {
        public Llama2ChatDialog build() {
            return new Llama2ChatDialog(this.history, this.system);
        }
    }

    Llama2ChatDialog(Integer history, String system) {
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
            String instruction = human.get(i).trim();

            if (system != null && i == 0) {
                instruction = String.format("<<SYS>>\n%s\n<</SYS>>\n\n%s", system, instruction);
            }

            res.append(String.format("<s>[INST] %s [/INST] %s </s>", instruction, llm.get(i).trim()));
        }

        String instruction = human.get(human.size() - 1).trim();
        if (system != null && human.size() == 1) {
            instruction = String.format("<<SYS>>\n%s\n<</SYS>>\n\n%s", system, instruction);
        }
        res.append(String.format("<s>[INST] %s [/INST]", instruction));

        return res.toString();
    }
}
