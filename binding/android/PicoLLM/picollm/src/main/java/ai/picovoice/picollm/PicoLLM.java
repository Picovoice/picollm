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

    private boolean isModelLoadComplete;

    public static int getMinChunkSize() {
        return PicoLLMNative.getMinChunkSize();
    }

    public static int getMaxChunkSize() {
        return PicoLLMNative.getMaxChunkSize();
    }

    public static String getVersion() throws PicoLLMException {
        return PicoLLMNative.getVersion();
    }

    private PicoLLM(String deviceString) throws PicoLLMException {
        handle = PicoLLMNative.init(deviceString);

    }

    public void delete() {
        if (handle != 0) {
            PicoLLMNative.delete(handle);
            handle = 0;
            isModelLoadComplete = false;
        }
    }

    public boolean getIsModelLoadComplete() {
        return isModelLoadComplete;
    }

    public PicoLLMMatrixDimensions getMatrixDimensions() throws PicoLLMException {
        if (handle == 0) {
            throw new PicoLLMInvalidStateException(
                    "Attempted to call `getMatrixDimensions` after delete."
            );
        }

        if (!isModelLoadComplete) {
            throw new PicoLLMInvalidStateException(
                    "Attempted to call `getMatrixDimensions` before a model has been fully loaded."
            );
        }

        return PicoLLMNative.getMatrixDimensions(handle);
    }

    public void loadModelFile(String filepath) throws PicoLLMException {
        loadModelFile(filepath, 1024 * 1024);
    }

    public void loadModelFile(
            String filepath,
            int chunkSizeBytes) throws PicoLLMException {
        if (handle == 0) {
            throw new PicoLLMInvalidStateException(
                    "Attempted to call `loadModelFile` after delete."
            );
        }

        if (isModelLoadComplete) {
            throw new PicoLLMInvalidStateException(
                    "Attempted to call `loadModelFile` after a model has already been loaded."
            );
        }

        File f = new File(filepath);
        if (!f.exists()) {
            throw new PicoLLMIOException(
                    String.format("File `%s` does not exist on device", filepath));
        }

        PicoLLMNative.loadModelFile(
                handle,
                filepath,
                chunkSizeBytes);

        isModelLoadComplete = true;
    }

    public boolean loadModelChunk(byte[] chunk) throws PicoLLMException {
        return loadModelChunk(chunk, chunk.length);
    }

    public boolean loadModelChunk(
            byte[] chunk,
            int chunkSizeBytes) throws PicoLLMException {
        if (handle == 0) {
            throw new PicoLLMInvalidStateException(
                    "Attempted to call `loadModelChunk` after delete."
            );
        }

        if (isModelLoadComplete) {
            throw new PicoLLMInvalidStateException(
                    "Attempted to call `loadModelChunk` after a model has already been loaded."
            );
        }

        isModelLoadComplete = PicoLLMNative.loadModelChunk(
                handle,
                chunk,
                chunkSizeBytes);

        return isModelLoadComplete;
    }

    public float[] chainMultiply(
            float[] vector,
            int iterations) throws PicoLLMException {
        if (handle == 0) {
            throw new PicoLLMInvalidStateException(
                    "Attempted to call `chainMultiply` after delete."
            );
        }

        if (!isModelLoadComplete) {
            throw new PicoLLMInvalidStateException(
                    "Attempted to call `chainMultiply` without a model fully loaded."
            );
        }

        return PicoLLMNative.chainMultiply(
                handle,
                vector,
                iterations);
    }

    public static class Builder {

        private String deviceString = "best:0";

        public Builder setDeviceString(String deviceString) {
            this.deviceString = deviceString;
            return this;
        }

        public PicoLLM build() throws PicoLLMException {

            if (deviceString == null || deviceString.equals("")) {
                throw new PicoLLMInvalidArgumentException("No device string provided to PicoLLM.");
            }

            return new PicoLLM(deviceString);
        }
    }
}
