/*
    Copyright 2026 Picovoice Inc.

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
 * Represents a dialog helper specific for `gemma-3-270m-it` models.
 */
public class Gemma3ChatDialog extends GemmaChatDialog {

    /**
     * Builder class for constructing Gemma3ChatDialog instances.
     */
    public static class Builder extends PicoLLMDialog.Builder {

        /**
         * Builds a new instance of Gemma3ChatDialog based on the configured settings.
         *
         * @return A new instance of Gemma3ChatDialog.
         */
        public Gemma3ChatDialog build() {
            return new Gemma3ChatDialog(this.history, this.system);
        }
    }

    /**
     * Constructs a Gemma3ChatDialog instance with the specified history and system settings.
     *
     * @param history The history length for the dialog.
     * @param system  The system instruction for configuring the model's responses.
     */
    Gemma3ChatDialog(Integer history, String system) {
        super(history, system);
    }
}
