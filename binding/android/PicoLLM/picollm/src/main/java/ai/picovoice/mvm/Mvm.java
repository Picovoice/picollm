/*
    Copyright 2024 Picovoice Inc.
    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.
    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/

package ai.picovoice.mvm;

import java.io.File;

/**
 * Android binding for Mvm.
 */
public class Mvm {

    static {
        System.loadLibrary("pv_mvm");
    }

    private long handle;

    private boolean isModelLoadComplete;

    public static int getMinChunkSize() {
        return MvmNative.getMinChunkSize();
    }

    public static int getMaxChunkSize() {
        return MvmNative.getMaxChunkSize();
    }

    public static String getVersion() throws MvmException {
        return MvmNative.getVersion();
    }

    private Mvm(String deviceString) throws MvmException {
        handle = MvmNative.init(deviceString);

    }

    public void delete() {
        if (handle != 0) {
            MvmNative.delete(handle);
            handle = 0;
            isModelLoadComplete = false;
        }
    }

    public boolean getIsModelLoadComplete() {
        return isModelLoadComplete;
    }

    public MvmMatrixDimensions getMatrixDimensions() throws MvmException {
        if (handle == 0) {
            throw new MvmInvalidStateException(
                    "Attempted to call `getMatrixDimensions` after delete."
            );
        }

        if (!isModelLoadComplete) {
            throw new MvmInvalidStateException(
                    "Attempted to call `getMatrixDimensions` before a model has been fully loaded."
            );
        }

        return MvmNative.getMatrixDimensions(handle);
    }

    public void loadModelFile(String filepath) throws MvmException {
        loadModelFile(filepath, 1024 * 1024);
    }

    public void loadModelFile(
            String filepath,
            int chunkSizeBytes) throws MvmException {
        if (handle == 0) {
            throw new MvmInvalidStateException(
                    "Attempted to call `loadModelFile` after delete."
            );
        }

        if (isModelLoadComplete) {
            throw new MvmInvalidStateException(
                    "Attempted to call `loadModelFile` after a model has already been loaded."
            );
        }

        File f = new File(filepath);
        if (!f.exists()) {
            throw new MvmIOException(
                    String.format("File `%s` does not exist on device", filepath));
        }

        MvmNative.loadModelFile(
                handle,
                filepath,
                chunkSizeBytes);

        isModelLoadComplete = true;
    }

    public boolean loadModelChunk(byte[] chunk) throws MvmException {
        return loadModelChunk(chunk, chunk.length);
    }

    public boolean loadModelChunk(
            byte[] chunk,
            int chunkSizeBytes) throws MvmException {
        if (handle == 0) {
            throw new MvmInvalidStateException(
                    "Attempted to call `loadModelChunk` after delete."
            );
        }

        if (isModelLoadComplete) {
            throw new MvmInvalidStateException(
                    "Attempted to call `loadModelChunk` after a model has already been loaded."
            );
        }

        isModelLoadComplete = MvmNative.loadModelChunk(
                handle,
                chunk,
                chunkSizeBytes);

        return isModelLoadComplete;
    }

    public float[] chainMultiply(
            float[] vector,
            int iterations) throws MvmException {
        if (handle == 0) {
            throw new MvmInvalidStateException(
                    "Attempted to call `chainMultiply` after delete."
            );
        }

        if (!isModelLoadComplete) {
            throw new MvmInvalidStateException(
                    "Attempted to call `chainMultiply` without a model fully loaded."
            );
        }

        return MvmNative.chainMultiply(
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

        public Mvm build() throws MvmException {

            if (deviceString == null || deviceString.equals("")) {
                throw new MvmInvalidArgumentException("No device string provided to Mvm.");
            }

            return new Mvm(deviceString);
        }
    }
}
