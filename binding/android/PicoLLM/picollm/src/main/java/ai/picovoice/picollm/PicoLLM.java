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

import java.io.File;

/**
 * Android binding for PicoLLM.
 */
public class PicoLLM {

    static {
        System.loadLibrary("pv_picollm");
    }

    private long handle;

    public static String getVersion() throws PicoLLMException {
        return PicoLLMNative.getVersion();
    }

    public static int getMaxTopChoices() throws PicoLLMException {
        return PicoLLMNative.getMaxTopChoices();
    }

    public static String[] listHardwareDevices() throws PicoLLMException {
        return PicoLLMNative.listHardwareDevices();
    }

    private PicoLLM(
            String accessKey,
            String modelPath,
            String device) throws PicoLLMException {
        handle = PicoLLMNative.init(accessKey, modelPath, device);
    }

    public void delete() {
        if (handle != 0) {
            PicoLLMNative.delete(handle);
            handle = 0;
        }
    }

    public PicoLLMCompletion generate(
            String prompt,
            int completionTokenLimit,
            String[] stopPhrases,
            int seed,
            float presencePenalty,
            float frequencyPenalty,
            float temperature,
            float topP,
            int numTopChoices,
            PicoLLMStreamCallback streamCallback) throws PicoLLMException {
        return PicoLLMNative.generate(
            handle,
            prompt,
            completionTokenLimit,
            stopPhrases,
            seed,
            presencePenalty,
            frequencyPenalty,
            temperature,
            topP,
            numTopChoices,
            streamCallback);
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
        return PicoLLMNative.getModel(handle);
    }

    public int getContextLength() throws PicoLLMException {
        return PicoLLMNative.getContextLength(handle);
    }

    public static class Builder {

        private String device = "best:0";

        public Builder setDevice(String device) {
            this.device = device;
            return this;
        }

        public PicoLLM build(String accessKey, String modelPath) throws PicoLLMException {

            if (device == null || device.equals("")) {
                throw new PicoLLMInvalidArgumentException("No device provided to PicoLLM.");
            }

            return new PicoLLM(accessKey, modelPath, device);
        }
    }

    public static class GenerateBuilder {

        private int completionTokenLimit = -1;
        private String[] stopPhrases = null;
        private int seed = -1;
        private float presencePenalty = 0;
        private float frequencyPenalty = 0;
        private float temperature = 0;
        private float topP = 1;
        private int numTopChoices = 0;
        private PicoLLMStreamCallback streamCallback = null;

        public GenerateBuilder setCompletionTokenLimit(int completionTokenLimit) {
            this.completionTokenLimit = completionTokenLimit;
            return this;
        }

        public GenerateBuilder setStopPhrases(String[] stopPhrases) {
            this.stopPhrases = stopPhrases;
            return this;
        }

        public GenerateBuilder setSeed(int seed) {
            this.seed = seed;
            return this;
        }

        public GenerateBuilder setPresencePenalty(float presencePenalty) {
            this.presencePenalty = presencePenalty;
            return this;
        }

        public GenerateBuilder setFrequencyPenalty(float frequencyPenalty) {
            this.frequencyPenalty = frequencyPenalty;
            return this;
        }

        public GenerateBuilder setTemperature(float temperature) {
            this.temperature = temperature;
            return this;
        }

        public GenerateBuilder setTopP(float topP) {
            this.topP = topP;
            return this;
        }

        public GenerateBuilder setNumTopChoices(int numTopChoices) {
            this.numTopChoices = numTopChoices;
            return this;
        }

        public GenerateBuilder setStreamCallback(PicoLLMStreamCallback streamCallback) {
            this.streamCallback = streamCallback;
            return this;
        }

        public PicoLLMCompletion generate(PicoLLM object, String prompt) throws PicoLLMException {
            return object.generate(
                prompt,
                completionTokenLimit,
                stopPhrases,
                seed,
                presencePenalty,
                frequencyPenalty,
                temperature,
                topP,
                numTopChoices,
                streamCallback);
        }
    }
}
