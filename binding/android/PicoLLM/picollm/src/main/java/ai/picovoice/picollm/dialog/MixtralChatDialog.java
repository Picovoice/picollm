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
 * `PicoLLMDialog` subclass for the `mixtral-8x7b-instruct-v0.1` model.
 */
public class MixtralChatDialog extends MistralChatDialog {

    public static class Builder extends MistralChatDialog.Builder {
        public MixtralChatDialog build() {
            return new MixtralChatDialog(this.history, this.system);
        }
    }

    MixtralChatDialog(Integer history, String system) {
        super(history, system);
    }
}
