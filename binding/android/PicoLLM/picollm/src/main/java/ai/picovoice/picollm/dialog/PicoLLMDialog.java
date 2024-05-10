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

    public static class Builder {
        protected Integer history = null;
        protected String system = null;

        public Builder setHistory(Integer history) {
            if (history != null && history < 0) {
                throw new IllegalArgumentException("History should be a non-negative integer.");
            }
            this.history = history;
            return this;
        }

        public Builder setSystem(String system) {
            this.system = system;
            return this;
        }

        public PicoLLMDialog build() {
            return new PicoLLMDialog(history, system);
        }
    }

    protected PicoLLMDialog(Integer history, String system) {
        this.history = history;
        this.system = system;
        this.humanRequests = new ArrayList<>();
        this.llmResponses = new ArrayList<>();
    }

    public void addHumanRequest(String content) throws PicoLLMInvalidStateException {
        if (this.humanRequests.size() > this.llmResponses.size()) {
            throw new PicoLLMInvalidStateException(
                    "Entering a human request without entering the last LLM response is invalid."
            );
        }
        this.humanRequests.add(content);
    }

    public void addLLMResponse(String content) throws PicoLLMInvalidStateException {
        if (this.humanRequests.size() == this.llmResponses.size()) {
            throw new PicoLLMInvalidStateException(
                    "Entering an LLM response without entering the human request is invalid."
            );
        }
        this.llmResponses.add(content);
    }

    public String getPrompt() throws PicoLLMException {
        throw new PicoLLMException("Only base classes of PicoLLMDialog can return create prompts");
    }
}

