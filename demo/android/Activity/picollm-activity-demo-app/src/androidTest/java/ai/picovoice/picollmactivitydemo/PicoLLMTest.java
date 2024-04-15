/*
    Copyright 2024 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/

package ai.picovoice.picollmactivitydemo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import android.content.Context;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import ai.picovoice.picollm.PicoLLM;
import ai.picovoice.picollm.PicoLLMMatrixDimensions;

@RunWith(AndroidJUnit4.class)
public class PicoLLMTest {

    private int picollmIterations = 10;
    private File picollmFile;

    Context appContext;

    @Before
    public void Setup() throws Exception {
        appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();

        final String picollmFilePath = appContext.getString(R.string.picollmFilePath);
        if (picollmFilePath.equals("")) {
            throw new Exception("`picollmFilePath` was empty");
        }
        picollmFile = new File(picollmFilePath);

        final String picollmIterationsString = appContext.getString(R.string.picollmIterations);
        try {
            picollmIterations = Integer.parseInt(picollmIterationsString);
        } catch (NumberFormatException ignored) {
        }

        final String picollmDownloadUrl = appContext.getString(R.string.picollmDownloadUrl);
        if (!picollmDownloadUrl.equals("")) {
            downloadPicoLLMFile(picollmDownloadUrl, picollmFile);
        }
    }

    @Test
    public void testPicoLLM() throws Exception {
        assertTrue(PicoLLM.getMinChunkSize() > 0);
        assertTrue(PicoLLM.getMaxChunkSize() > PicoLLM.getMinChunkSize());
        assertTrue(PicoLLM.getVersion() != null && !PicoLLM.getVersion().equals(""));

        PicoLLM picollm = new PicoLLM.Builder().build();
        picollm.loadModelFile(picollmFile.getAbsolutePath());

        PicoLLMMatrixDimensions dim = picollm.getMatrixDimensions();
        assertTrue(dim.getM() > 0);
        assertTrue(dim.getN() > 0);

        float[] vector = new float[dim.getN()];

        float[] result = picollm.chainMultiply(
                vector,
                picollmIterations);
        assertEquals(vector.length, result.length);
        for (float f : result) {
            assertEquals(0.0f, f, 0.001f);
        }
    }

    private void downloadPicoLLMFile(String srcUrl, File dstFile) throws Exception {
        HttpURLConnection urlConnection = (HttpURLConnection) new URL(srcUrl).openConnection();
        urlConnection.setRequestMethod("GET");
        urlConnection.setDoOutput(false);
        urlConnection.connect();

        if (urlConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
            InputStream inputStream = urlConnection.getInputStream();

            if (!dstFile.exists()) {
                if (!dstFile.createNewFile()) {
                    throw new IOException("Could not create picollm destination file");
                }
            }
            FileOutputStream outputStream = new FileOutputStream(dstFile);
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            inputStream.close();
            outputStream.close();

        } else {
            throw new Exception(String.format(
                    "File server responded with %d: %s",
                    urlConnection.getResponseCode(),
                    urlConnection.getResponseMessage()));
        }
        urlConnection.disconnect();
    }
}
