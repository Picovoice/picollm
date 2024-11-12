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

import ai.picovoice.picollm.dialog.Phi3ChatDialog;

/**
 * Represents a dialog helper specific for the `phi3.5` model.
 */
public class Phi35ChatDialog extends Phi3ChatDialog {

    /**
     * Builder class for constructing Phi35ChatDialog instances.
     */
    public static class Builder extends PicoLLMDialog.Builder {
        /**
         * Builds a new instance of Phi35ChatDialog based on the configured settings.
         *
         * @return A new instance of Phi35ChatDialog.
         */
        public Phi35ChatDialog build() {
            return new Phi35ChatDialog(this.history, this.system);
        }
    }

    /**
     * Constructs a Phi35ChatDialog instance with the specified history and system settings.
     *
     * @param history The history length for the dialog.
     * @param system  The system instruction for configuring the model's responses.
     */
    Phi35ChatDialog(Integer history, String system) {
        super(history, system);
    }
}
