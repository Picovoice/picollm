/*
    Copyright 2022 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/

package ai.picovoice.picollm.testapp;

import static org.junit.Assert.assertTrue;

import androidx.test.ext.junit.runners.AndroidJUnit4;

import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.File;
import java.io.IOException;

import ai.picovoice.picollm.PicoLLM;

@RunWith(AndroidJUnit4.class)
public class PerformanceTest extends BaseTest {

    int numTestIterations = 30;

    @Before
    public void Setup() throws IOException {
        super.Setup();
        String iterationString = appContext.getString(R.string.numTestIterations);

        try {
            numTestIterations = Integer.parseInt(iterationString);
        } catch (NumberFormatException ignored) { }
    }

    @Test
    public void testInitPerformance() throws Exception {
        String initThresholdString = appContext.getString(R.string.initPerformanceThresholdSec);
        Assume.assumeNotNull(initThresholdString);
        Assume.assumeFalse(initThresholdString.equals(""));
        double initPerformanceThresholdSec = Double.parseDouble(initThresholdString);

        long totalNSec = 0;
        for (int i = 0; i < numTestIterations + 1; i++) {
            long before = System.nanoTime();
            PicoLLM picollm = new PicoLLM.Builder().setAccessKey(accessKey)
                    .setModelPath(defaultModelPath)
                    .build(appContext);
            long after = System.nanoTime();

            // throw away first run to account for cold start
            if (i > 0) {
                totalNSec += (after - before);
            }

            picollm.delete();
        }

        double avgNSec = totalNSec / (double) numTestIterations;
        double avgSec = ((double) Math.round(avgNSec * 1e-6)) / 1000.0;
        assertTrue(
                String.format("Expected threshold (%.3fs), init took (%.3fs)", initPerformanceThresholdSec, avgSec),
                avgSec <= initPerformanceThresholdSec
        );
    }

    @Test
    public void testProcPerformance() throws Exception {
        String procThresholdString = appContext.getString(R.string.procPerformanceThresholdSec);
        Assume.assumeNotNull(procThresholdString);
        Assume.assumeFalse(procThresholdString.equals(""));

        double procPerformanceThresholdSec = Double.parseDouble(procThresholdString);

        PicoLLM picollm = new PicoLLM.Builder().setAccessKey(accessKey)
                .setModelPath(defaultModelPath)
                .build(appContext);

        File audioFile = new File(testResourcesPath, "audio_samples/test.wav");

        long totalNSec = 0;
        for (int i = 0; i < numTestIterations + 1; i++) {
            long before = System.nanoTime();
            picollm.processFile(audioFile.getAbsolutePath());
            long after = System.nanoTime();

            // throw away first run to account for cold start
            if (i > 0) {
                totalNSec += (after - before);
            }
        }
        picollm.delete();

        double avgNSec = totalNSec / (double) numTestIterations;
        double avgSec = ((double) Math.round(avgNSec * 1e-6)) / 1000.0;
        assertTrue(
                String.format("Expected threshold (%.3fs), process took (%.3fs)", procPerformanceThresholdSec, avgSec),
                avgSec <= procPerformanceThresholdSec
        );
    }
}