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

class PicoLLMNative {

    static native String getVersion() throws PicoLLMException;

    static native int getMaxTopChoices();

    static native String[] listHardwareDevices() throws PicoLLMException;

    static native void setSdk(String sdk) throws PicoLLMException;

    static native long init(
            String accessKey,
            String modelPath,
            String device) throws PicoLLMException;

    static native void delete(long object);

    static native PicoLLMCompletion generate(
            long object,
            String prompt,
            int completionTokenLimit,
            String[] stopPhrases,
            int seed,
            float presencePenalty,
            float frequencyPenalty,
            float temperature,
            float topP,
            int numTopChoices,
            PicoLLMStreamCallback streamCallback) throws PicoLLMException;

    static native int[] tokenize(
            long object,
            String text,
            boolean bos,
            boolean eos) throws PicoLLMException;

    static native float[] forward(long object, int token) throws PicoLLMException;

    static native void reset(long object) throws PicoLLMException;

    static native String getModel(long object) throws PicoLLMException;

    static native int getContextLength(long object) throws PicoLLMException;
}
