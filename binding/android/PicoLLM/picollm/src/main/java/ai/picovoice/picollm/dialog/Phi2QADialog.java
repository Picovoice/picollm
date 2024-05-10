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

/**
 * Represents a dialog helper specific for `phi-2` models in `qa` mode.
 */
public class Phi2QADialog extends Phi2Dialog {

    /**
     * Builder class for constructing Phi2QADialog instances.
     */
    public static class Builder extends Phi2Dialog.Builder {

        /**
         * Builds a new instance of Phi2QADialog based on the configured settings.
         *
         * @return A new instance of Phi2QADialog.
         */
        public Phi2QADialog build() {
            return new Phi2QADialog(this.history, this.system);
        }
    }

    /**
     * Constructs a Phi2QADialog instance with the specified history, system, human tag, and LLM tag.
     *
     * @param history The history length for the dialog.
     * @param system  The system instruction for configuring the model's responses.
     */
    Phi2QADialog(Integer history, String system) {
        super("Instruct", "Output", history, system);
    }
}
