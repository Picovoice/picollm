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
 * Represents a dialog helper specific for the `mixtral-8x7b-instruct-v0.1` model.
 */
public class MixtralChatDialog extends MistralChatDialog {

    /**
     * Builder class for constructing MixtralChatDialog instances.
     */
    public static class Builder extends MistralChatDialog.Builder {
        /**
         * Builds a new instance of MixtralChatDialog based on the configured settings.
         *
         * @return A new instance of MixtralChatDialog.
         */
        public MixtralChatDialog build() {
            return new MixtralChatDialog(this.history, this.system);
        }
    }

    /**
     * Constructs a MixtralChatDialog instance with the specified history and system settings.
     *
     * @param history The history length for the dialog.
     * @param system  The system instruction for configuring the model's responses.
     */
    MixtralChatDialog(Integer history, String system) {
        super(history, system);
    }
}
