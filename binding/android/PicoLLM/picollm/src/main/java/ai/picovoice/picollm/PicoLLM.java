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

    private static String _sdk = "android";

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

    public static void setSdk(String sdk) {
        PicoLLM._sdk = sdk;
    }

    private long handle;

    private final String model;

    private final int contextLength;

    /**
     * Retrieves the version of the picoLLM library.
     *
     * @return Version of the picoLLM library.
     * @throws PicoLLMException if getting the version fails.
     */
    public static String getVersion() throws PicoLLMException {
        return PicoLLMNative.getVersion();
    }

    /**
     * Retrieves the maximum number of top choices allowed during generation.
     *
     * @return Maximum number of top choices allowed during generation.
     */
    public static int getMaxTopChoices() {
        return PicoLLMNative.getMaxTopChoices();
    }

    /**
     * Lists all available devices that picoLLM can use for inference.
     * Each entry in the list can be the `device` when initializing picoLLM.
     *
     * @return Array of all available devices that picoLLM can be used for inference.
     * @throws PicoLLMException if getting available devices fails.
     */
    public static String[] getAvailableDevices() throws PicoLLMException {
        return PicoLLMNative.listHardwareDevices();
    }

    /**
     * Constructs a new PicoLLM instance.
     *
     * @param accessKey AccessKey obtained from <a href="https://console.picovoice.ai/">Picovoice Console</a>
     * @param modelPath Absolute path to the file containing LLM parameters.
     * @param device    String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`,
     *                  picoLLM picks the most suitable device. If set to `gpu`, the engine uses the first available
     *                  GPU device. To select a specific GPU device, set this argument to `gpu:${GPU_INDEX}`, where
     *                  `${GPU_INDEX}` is the index of the target GPU. If set to `cpu`, the engine will run on the
     *                  CPU with the default number of threads. To specify the number of threads, set this argument
     *                  to `cpu:${NUM_THREADS}`, where `${NUM_THREADS}` is the desired number of threads.
     * @throws PicoLLMException if initialization fails.
     */
    private PicoLLM(
            String accessKey,
            String modelPath,
            String device) throws PicoLLMException {
        PicoLLMNative.setSdk(PicoLLM._sdk);
        handle = PicoLLMNative.init(
                accessKey,
                modelPath,
                device);
        model = PicoLLMNative.getModel(handle);
        contextLength = PicoLLMNative.getContextLength(handle);
    }

    /**
     * Deletes the resources acquired by picoLLM.
     */
    public void delete() {
        if (handle != 0) {
            PicoLLMNative.delete(handle);
            handle = 0;
        }
    }

    /**
     * Generates completion text and relevant metadata given a text prompt and a
     * set of generation parameters.
     *
     * @param prompt         Text prompt.
     * @param generateParams Generation parameters.
     * @return Completion result.
     * @throws PicoLLMException if generation fails.
     */
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

    /**
     * Tokenizes a given text using the model's tokenizer. This is a low-level function meant for
     * benchmarking and advanced usage. `.generate()` should be used when possible.
     *
     * @param text Text.
     * @param bos  If set to `true`, the tokenizer prepends the beginning of the sentence token to the result.
     * @param eos  If set to `true`, the tokenizer appends the end of the sentence token to the result.
     * @return Tokens representing the input text.
     * @throws PicoLLMException if tokenization fails.
     */
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

    /**
     * Performs a single forward pass given a token and returns the logits. This is a low-level
     * function for benchmarking and advanced usage. `.generate()` should be used when possible.
     *
     * @param token Input token.
     * @return Logits.
     * @throws PicoLLMException if the forward pass fails.
     */
    public float[] forward(int token) throws PicoLLMException {
        return PicoLLMNative.forward(handle, token);
    }

    /**
     * Resets the internal state of LLM. It should be called in conjunction with `.forward()` when
     * processing a new sequence of tokens. This is a low-level function for benchmarking and
     * advanced usage. `.generate()` should be used when possible.
     *
     * @throws PicoLLMException if resetting fails.
     */
    public void reset() throws PicoLLMException {
        PicoLLMNative.reset(handle);
    }

    /**
     * Getter for model's name.
     *
     * @return Model's name.
     */
    public String getModel() {
        return this.model;
    }

    /**
     * Getter for model's context length.
     *
     * @return Model's context length.
     */
    public int getContextLength() {
        return this.contextLength;
    }

    /**
     * Retrieves a new instance of DialogBuilder for constructing dialog objects from the
     * currently loaded picoLLM model.
     *
     * @return A new instance of DialogBuilder.
     */
    public DialogBuilder getDialogBuilder() {
        return new DialogBuilder();
    }

    /**
     * Builder class for creating a `PicoLLMDialog` instance.
     */
    public class DialogBuilder {

        private String mode = null;
        private int history = 0;
        private String system = null;

        /**
         * Sets the mode for the dialog builder.
         *
         * @param mode The mode to set. Some models (e.g., `phi-2`) define multiple chat
         *             template modes. For example, `phi-2` allows both `qa` and `chat` modes.
         * @return DialogBuilder instance.
         */
        public DialogBuilder setMode(String mode) {
            this.mode = mode;
            return this;
        }

        /**
         * Sets the history length for the dialog builder.
         *
         * @param history The history length to set. History refers to the number of latest
         *                back-and-forths to include in the prompt. Setting history to `null` will embed the
         *                entire dialog in the prompt.
         * @return DialogBuilder instance.
         */
        public DialogBuilder setHistory(int history) {
            this.history = history;
            return this;
        }

        /**
         * Sets the system instruction for the dialog builder.
         *
         * @param system The system instruction to set. System instruction to embed in the
         *               prompt for configuring the model's responses.
         * @return DialogBuilder instance.
         */
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

        /**
         * Constructs a PicoLLMDialog instance based on the configured settings.
         *
         * @return A new instance of PicoLLMDialog.
         * @throws PicoLLMException If there's an issue constructing the dialog.
         */
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
                Map<String, Class<? extends PicoLLMDialog>> dialogModeMap =
                        (Map<String, Class<? extends PicoLLMDialog>>) dialog;
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

    /**
     * Builder class for creating a `PicoLLM` instance.
     */
    public static class Builder {

        private String accessKey = null;
        private String modelPath = null;
        private String device = null;

        /**
         * Sets the AccessKey.
         *
         * @param accessKey AccessKey obtained from Picovoice Console (https://console.picovoice.ai/)
         * @return Builder instance.
         */
        public Builder setAccessKey(String accessKey) {
            this.accessKey = accessKey;
            return this;
        }


        /**
         * Sets the model path.
         *
         * @param modelPath Absolute path to the file containing LLM parameters (`.pllm`).
         * @return Builder instance.
         */
        public Builder setModelPath(String modelPath) {
            this.modelPath = modelPath;
            return this;
        }

        /**
         * Sets the device to use for inference.
         *
         * @param device String representation of the device (e.g., CPU or GPU) to use for inference.
         *               If set to `best`, picoLLM picks the most suitable device. If set to `gpu`, the engine uses
         *               the first available GPU device. To select a specific GPU device, set this argument to
         *               `gpu:${GPU_INDEX}`, where `${GPU_INDEX}` is the index of the target GPU. If set to `cpu`,
         *               the engine will run on the CPU with the default number of threads. To specify the number
         *               of threads, set this argument to `cpu:${NUM_THREADS}`, where `${NUM_THREADS}` is the desired
         *               number of threads.
         * @return Builder instance.
         */
        public Builder setDevice(String device) {
            this.device = device;
            return this;
        }

        /**
         * Builds a new PicoLLM instance using values defined by the builder.
         *
         * @return Constructed PicoLLM instance.
         * @throws PicoLLMException if initialization fails.
         */
        public PicoLLM build() throws PicoLLMException {
            if (accessKey == null || accessKey.equals("")) {
                throw new PicoLLMInvalidArgumentException("No AccessKey provided to picoLLM.");
            }

            if (modelPath == null || modelPath.equals("")) {
                throw new PicoLLMInvalidArgumentException("No model path provided to picoLLM.");
            }

            if (device == null || device.equals("")) {
                device = "cpu:2";
            } else {
                String[] deviceSplit = device.split(":");
                if (deviceSplit.length >= 1) {
                    if (deviceSplit[0].equals("cpu") || deviceSplit[0].equals("best")) {
                        if (deviceSplit.length == 1) {
                            device = deviceSplit[0] + ":2";
                        }
                    } else {
                        throw new PicoLLMInvalidArgumentException(
                                String.format(
                                        "`%s` is not a valid device string. Only `cpu` and " +
                                                "`best` are currently available for Android.",
                                        deviceSplit[0]
                                ));
                    }
                }
            }

            return new PicoLLM(accessKey, modelPath, device);
        }
    }
}
