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
 * Represents a dialog helper specific for the `phi3.5` model.
 */
public class Llama32ChatDialog extends Llama3ChatDialog {

    /**
     * Builder class for constructing Llama32ChatDialog instances.
     */
    public static class Builder extends PicoLLMDialog.Builder {
        /**
         * Builds a new instance of Llama32ChatDialog based on the configured settings.
         *
         * @return A new instance of Llama32ChatDialog.
         */
        public Llama32ChatDialog build() {
            return new Llama32ChatDialog(this.history, this.system);
        }
    }

    /**
     * Constructs a Llama32ChatDialog instance with the specified history and system settings.
     *
     * @param history The history length for the dialog.
     * @param system  The system instruction for configuring the model's responses.
     */
    Llama32ChatDialog(Integer history, String system) {
        super(history, system);
    }
}
