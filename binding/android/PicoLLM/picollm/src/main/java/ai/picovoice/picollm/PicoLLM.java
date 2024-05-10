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

import java.util.HashMap;
import java.util.Map;

/**
 * Android binding for picoLLM.
 */
public class PicoLLM {

    static {
        System.loadLibrary("pv_picollm");
    }

    private static final Map<String, Object> DIALOGS = new HashMap<>();

    static {
        DIALOGS.put("gemma-2b-it", GemmaChatDialog.class);
        DIALOGS.put("gemma-7b-it", GemmaChatDialog.class);
        DIALOGS.put("llama-2-7b-chat", Llama2ChatDialog.class);
        DIALOGS.put("llama-2-13b-chat", Llama2ChatDialog.class);
        DIALOGS.put("llama-2-70b-chat", Llama2ChatDialog.class);
        DIALOGS.put("llama-3-8b-instruct", Llama3ChatDialog.class);
        DIALOGS.put("llama-3-70b-instruct", Llama3ChatDialog.class);
        DIALOGS.put("mistral-7b-instruct-v0.1", MistralChatDialog.class);
        DIALOGS.put("mistral-7b-instruct-v0.2", MistralChatDialog.class);
        DIALOGS.put("mixtral-8x7b-instruct-v0.1", MixtralChatDialog.class);

        Map<String, Class<? extends PicoLLMDialog>> phi2Map = new HashMap<>();
        phi2Map.put("default", Phi2QADialog.class);
        phi2Map.put("qa", Phi2QADialog.class);
        phi2Map.put("chat", Phi2ChatDialog.class);
        DIALOGS.put("phi2", phi2Map);
    }

    private long handle;

    private final String model;

    private final int contextLength;

    public static String getVersion() throws PicoLLMException {
        return PicoLLMNative.getVersion();
    }

    public static int getMaxTopChoices() throws PicoLLMException {
        return PicoLLMNative.getMaxTopChoices();
    }

    public static String[] getAvailableDevices() throws PicoLLMException {
        return PicoLLMNative.listHardwareDevices();
    }

    private PicoLLM(
            String accessKey,
            String modelPath,
            String device) throws PicoLLMException {
        handle = PicoLLMNative.init(
                accessKey,
                modelPath,
                device);
        model = PicoLLMNative.getModel(handle);
        contextLength = PicoLLMNative.getContextLength(handle);
    }

    public void delete() {
        if (handle != 0) {
            PicoLLMNative.delete(handle);
            handle = 0;
        }
    }

    public PicoLLMCompletion generate(
            String prompt,
            PicoLLMGenerateParams generateParams) throws PicoLLMException {
        return PicoLLMNative.generate(
                handle,
                prompt,
                generateParams.getCompletionTokenLimit(),
                generateParams.getStopPhrases(),
                generateParams.getSeed(),
                generateParams.getPresencePenalty(),
                generateParams.getFrequencyPenalty(),
                generateParams.getTemperature(),
                generateParams.getTopP(),
                generateParams.getNumTopChoices(),
                generateParams.getStreamCallback());
    }

    public int[] tokenize(
            String text,
            boolean bos,
            boolean eos) throws PicoLLMException {
        return PicoLLMNative.tokenize(
                handle,
                text,
                bos,
                eos);
    }

    public float[] forward(int token) throws PicoLLMException {
        return PicoLLMNative.forward(handle, token);
    }

    public void reset() throws PicoLLMException {
        PicoLLMNative.reset(handle);
    }

    public String getModel() throws PicoLLMException {
        return this.model;
    }

    public int getContextLength() throws PicoLLMException {
        return this.contextLength;
    }

    public DialogBuilder getDialogBuilder() {
        return new DialogBuilder();
    }

    public class DialogBuilder {

        private String mode = null;
        private int history = 0;
        private String system = null;

        public DialogBuilder setMode(String mode) {
            this.mode = mode;
            return this;
        }

        public DialogBuilder setHistory(int history) {
            this.history = history;
            return this;
        }

        public DialogBuilder setSystem(String system) {
            this.system = system;
            return this;
        }

        private PicoLLMDialog instantiateDialog(
                Class<? extends PicoLLMDialog> dialogClass,
                Integer history,
                String system) throws PicoLLMException {
            try {
                return dialogClass
                        .getDeclaredConstructor(Integer.class, String.class)
                        .newInstance(history, system);
            } catch (Exception e) {
                throw new PicoLLMRuntimeException(e);
            }
        }

        @SuppressWarnings(value = "unchecked")
        public PicoLLMDialog build() throws PicoLLMException {
            String modelKey = model.split(" ")[0].toLowerCase();
            if (!DIALOGS.containsKey(modelKey)) {
                throw new PicoLLMInvalidArgumentException(
                        String.format(
                                "`%s` does not have a corresponding dialog implementation or is not instruction-tuned",
                                model));
            }

            Object dialog = DIALOGS.get(modelKey);
            if (dialog instanceof Map) {
                Map<String, Class<? extends PicoLLMDialog>> dialogModeMap = (Map<String, Class<? extends PicoLLMDialog>>) dialog;
                if (mode == null) {
                    if (!dialogModeMap.containsKey("default")) {
                        throw new PicoLLMInvalidArgumentException(
                                String.format(
                                        "`%s` requires a mode. Available modes are: %s",
                                        model,
                                        String.join(", ", dialogModeMap.keySet())));
                    }
                    return instantiateDialog(dialogModeMap.get("default"), history, system);
                } else {
                    if (!dialogModeMap.containsKey(mode)) {
                        throw new PicoLLMInvalidArgumentException(
                                String.format(
                                        "`%s` doesn't have a `%s` mode. Available modes are: %s",
                                        model,
                                        mode,
                                        String.join(", ", dialogModeMap.keySet())));
                    }
                    return instantiateDialog(dialogModeMap.get(mode), history, system);
                }
            } else {
                if (mode != null) {
                    throw new PicoLLMInvalidArgumentException(
                            String.format(
                                    "`%s` doesn't accept a mode parameter, set it to `null`",
                                    model));
                }
                return instantiateDialog((Class<? extends PicoLLMDialog>) dialog, history, system);
            }
        }
    }

    public static class Builder {

        private String accessKey = null;
        private String modelPath = null;
        private String device = null;

        public Builder setAccessKey(String accessKey) {
            this.accessKey = accessKey;
            return this;
        }

        public Builder setModelPath(String modelPath) {
            this.modelPath = modelPath;
            return this;
        }

        public Builder setDevice(String device) {
            this.device = device;
            return this;
        }

        public PicoLLM build() throws PicoLLMException {
            if (accessKey == null || accessKey.equals("")) {
                throw new PicoLLMInvalidArgumentException("No AccessKey provided to picoLLM.");
            }

            if (modelPath == null || modelPath.equals("")) {
                throw new PicoLLMInvalidArgumentException("No model path provided to picoLLM.");
            }

            if (device == null || device.equals("")) {
                device = "best";
            }

            return new PicoLLM(accessKey, modelPath, device);
        }
    }
}
