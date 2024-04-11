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

class MvmNative {

    static native String getVersion() throws MvmException;

    static native int getMinChunkSize();

    static native int getMaxChunkSize();

    static native long init(String deviceString) throws MvmException;

    static native void delete(long object);

    static native void loadModelFile(
            long object,
            String filepath,
            int chunkSizeBytes) throws MvmException;

    static native boolean loadModelChunk(
            long object,
            byte[] chunk,
            int chunkSizeBytes) throws MvmException;

    static native MvmMatrixDimensions getMatrixDimensions(long object) throws MvmException;

    static native float[] chainMultiply(
            long object,
            float[] vector,
            int iterations) throws MvmException;
}
