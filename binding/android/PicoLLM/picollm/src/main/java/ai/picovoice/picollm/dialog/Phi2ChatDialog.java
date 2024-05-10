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
 * Represents a dialog helper specific for `phi-2` models in `chat` mode.
 */
public class Phi2ChatDialog extends Phi2Dialog {

    /**
     * Builder class for constructing Phi2ChatDialog instances.
     */
    public static class Builder extends Phi2Dialog.Builder {

        /**
         * Builds a new instance of Phi2ChatDialog based on the configured settings.
         *
         * @return A new instance of Phi2ChatDialog.
         */
        public Phi2ChatDialog build() {
            return new Phi2ChatDialog(this.history, this.system);
        }
    }

    /**
     * Constructs a Phi2ChatDialog instance with the specified history and system settings.
     *
     * @param history The history length for the dialog.
     * @param system  The system instruction for configuring the model's responses.
     */
    Phi2ChatDialog(Integer history, String system) {
        super("Human", "AI", history, system);
    }
}
