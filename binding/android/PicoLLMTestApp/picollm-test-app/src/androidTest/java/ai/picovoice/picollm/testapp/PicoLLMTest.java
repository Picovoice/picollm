/*
    Copyright 2022-2023 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/

package ai.picovoice.picollm.testapp;

import static org.junit.Assert.*;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.junit.Test;
import org.junit.experimental.runners.Enclosed;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import ai.picovoice.picollm.PicoLLM;
import ai.picovoice.picollm.PicoLLMCompletion;
import ai.picovoice.picollm.PicoLLMException;


@RunWith(Enclosed.class)
public class PicoLLMTest {

    public static class StandardTests extends BaseTest {

        @Test
        public void getVersion() throws PicoLLMException {
            PicoLLM picollm = new PicoLLM.Builder()
                    .setAccessKey(accessKey)
                    .setModelPath(defaultModelPath)
                    .build();

            assertTrue(picollm.getVersion() != null && !picollm.getVersion().equals(""));

            picollm.delete();
        }

        @Test
        public void testInitFailWithInvalidAccessKey() {
            boolean didFail = false;
            try {
                new PicoLLM.Builder()
                        .setAccessKey("")
                        .setModelPath(defaultModelPath)
                        .build();
            } catch (PicoLLMException e) {
                didFail = true;
            }

            assertTrue(didFail);
        }

        @Test
        public void generate() throws PicoLLMException {
            PicoLLM picollm = new PicoLLM.Builder()
                    .setAccessKey(accessKey)
                    .setModelPath(defaultModelPath)
                    .build();

            PicoLLMCompletion result = new PicoLLM.GenerateBuilder()
                    .setCompletionTokenLimit(10)
                    .generate(picollm, "Hello my name is");

            assertTrue(result.getCompletion() == " John and I am a student at XYZ school");

            picollm.delete();
        }
    }
}
