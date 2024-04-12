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
import ai.picovoice.picollm.PicoLLMException;


@RunWith(Enclosed.class)
public class PicoLLMTest {

    public static class StandardTests extends BaseTest {

        @Test
        public void testInitFailWithInvalidAccessKey() {
            boolean didFail = false;
            try {
                new PicoLLM.Builder()
                        .setAccessKey("")
                        .setModelPath(defaultModelPath)
                        .build();
                        // .build(appContext);
            } catch (PicoLLMException e) {
                didFail = true;
            }

            assertTrue(didFail);
        }

    //     @Test
    //     public void testInitFailWithMissingAccessKey() {
    //         boolean didFail = false;
    //         try {
    //             new PicoLLM.Builder()
    //                     .setModelPath(defaultModelPath)
    //                     .build(appContext);
    //         } catch (PicoLLMException e) {
    //             didFail = true;
    //         }

    //         assertTrue(didFail);
    //     }

    //     @Test
    //     public void testInitFailWithInvalidModelPath() {
    //         boolean didFail = false;
    //         File modelPath = new File(testResourcesPath, "bad_path/bad_path.pv");
    //         try {
    //             new PicoLLM.Builder()
    //                     .setAccessKey(accessKey)
    //                     .setModelPath(modelPath.getAbsolutePath())
    //                     .build(appContext);
    //         } catch (PicoLLMException e) {
    //             didFail = true;
    //         }

    //         assertTrue(didFail);
    //     }

    //     @Test
    //     public void testInitFailWithMissingModelPath() {
    //         boolean didFail = false;
    //         try {
    //             new PicoLLM.Builder()
    //                     .setAccessKey(accessKey)
    //                     .build(appContext);
    //         } catch (PicoLLMException e) {
    //             didFail = true;
    //         }

    //         assertTrue(didFail);
    //     }

    //     @Test
    //     public void getVersion() throws PicoLLMException {
    //         PicoLLM picollm = new PicoLLM.Builder().setAccessKey(accessKey)
    //                 .setModelPath(defaultModelPath)
    //                 .build(appContext);

    //         assertTrue(picollm.getVersion() != null && !picollm.getVersion().equals(""));

    //         picollm.delete();
    //     }

    //     @Test
    //     public void getSampleRate() throws PicoLLMException {
    //         PicoLLM picollm = new PicoLLM.Builder().setAccessKey(accessKey)
    //                 .setModelPath(defaultModelPath)
    //                 .build(appContext);

    //         assertTrue(picollm.getSampleRate() > 0);

    //         picollm.delete();
    //     }

    //     @Test
    //     public void testErrorStack() {
    //         String[] error = {};
    //         try {
    //             new PicoLLM.Builder()
    //                     .setAccessKey("invalid")
    //                     .setModelPath(defaultModelPath)
    //                     .build(appContext);
    //         } catch (PicoLLMException e) {
    //             error = e.getMessageStack();
    //         }

    //         assertTrue(0 < error.length);
    //         assertTrue(error.length <= 8);

    //         try {
    //             new PicoLLM.Builder()
    //                     .setAccessKey("invalid")
    //                     .setModelPath(defaultModelPath)
    //                     .build(appContext);
    //         } catch (PicoLLMException e) {
    //             for (int i = 0; i < error.length; i++) {
    //                 assertEquals(e.getMessageStack()[i], error[i]);
    //             }
    //         }
    //     }
    // }

    // @RunWith(Parameterized.class)
    // public static class LanguageTests extends BaseTest {
    //     @Parameterized.Parameter(value = 0)
    //     public String language;

    //     @Parameterized.Parameter(value = 1)
    //     public String modelFile;

    //     @Parameterized.Parameter(value = 2)
    //     public String testAudioFile;

    //     @Parameterized.Parameter(value = 3)
    //     public String expectedTranscript;

    //     @Parameterized.Parameter(value = 4)
    //     public String expectedTranscriptWithPunctuation;

    //     @Parameterized.Parameter(value = 5)
    //     public float errorRate;

    //     @Parameterized.Parameter(value = 6)
    //     public PicoLLMTranscript.Word[] expectedWords;

    //     @Parameterized.Parameters(name = "{0}")
    //     public static Collection<Object[]> initParameters() throws IOException {
    //         String testDataJsonString = getTestDataString();

    //         JsonParser parser = new JsonParser();
    //         JsonObject testDataJson = parser.parse(testDataJsonString).getAsJsonObject();
    //         JsonArray languageTests = testDataJson
    //                 .getAsJsonObject("tests")
    //                 .getAsJsonArray("language_tests");

    //         List<Object[]> parameters = new ArrayList<>();
    //         for (int i = 0; i < languageTests.size(); i++) {
    //             JsonObject testData = languageTests.get(i).getAsJsonObject();

    //             String language = testData.get("language").getAsString();
    //             String audioFile = testData.get("audio_file").getAsString();
    //             String transcript = testData.get("transcript").getAsString();
    //             String transcriptWithPunctuation = testData.get("transcript_with_punctuation").getAsString();
    //             float errorRate = testData.get("error_rate").getAsFloat();
    //             JsonArray words = testData.get("words").getAsJsonArray();

    //             String modelFile;
    //             if (language.equals("en")) {
    //                 modelFile = "model_files/picollm_params.pv";
    //             } else {
    //                 modelFile = String.format("model_files/picollm_params_%s.pv", language);
    //             }

    //             String testAudioFile = String.format("audio_samples/%s", audioFile);

    //             PicoLLMTranscript.Word[] paramWords = new PicoLLMTranscript.Word[words.size()];
    //             for (int j = 0; j < words.size(); j++) {
    //                 JsonObject wordObject = words.get(j).getAsJsonObject();

    //                 String word = wordObject.get("word").getAsString();
    //                 float confidence = wordObject.get("confidence").getAsFloat();
    //                 float startSec = wordObject.get("start_sec").getAsFloat();
    //                 float endSec = wordObject.get("end_sec").getAsFloat();
    //                 int speakerTag = wordObject.get("speaker_tag").getAsInt();

    //                 paramWords[j] = new PicoLLMTranscript.Word(
    //                     word,
    //                     confidence,
    //                     startSec,
    //                     endSec,
    //                     speakerTag
    //                 );
    //             }

    //             parameters.add(new Object[]{
    //                     language,
    //                     modelFile,
    //                     testAudioFile,
    //                     transcript,
    //                     transcriptWithPunctuation,
    //                     errorRate,
    //                     paramWords
    //             });
    //         }

    //         return parameters;
    //     }


    //     @Test
    //     public void testTranscribeAudioFile() throws Exception {
    //         String modelPath = new File(testResourcesPath, modelFile).getAbsolutePath();
    //         PicoLLM picollm = new PicoLLM.Builder()
    //                 .setAccessKey(accessKey)
    //                 .setModelPath(modelPath)
    //                 .build(appContext);

    //         File audioFile = new File(testResourcesPath, testAudioFile);
    //         boolean useCER = language.equals("ja");

    //         PicoLLMTranscript result = picollm.processFile(audioFile.getAbsolutePath());

    //         assertTrue(getWordErrorRate(result.getTranscriptString(), expectedTranscript, useCER) < errorRate);
    //         validateMetadata(
    //                 result.getWordArray(),
    //                 expectedWords,
    //                 false
    //         );

    //         picollm.delete();
    //     }

    //     @Test
    //     public void testTranscribeAudioFileWithPunctuation() throws Exception {
    //         String modelPath = new File(testResourcesPath, modelFile).getAbsolutePath();
    //         PicoLLM picollm = new PicoLLM.Builder()
    //                 .setAccessKey(accessKey)
    //                 .setModelPath(modelPath)
    //                 .setEnableAutomaticPunctuation(true)
    //                 .build(appContext);

    //         File audioFile = new File(testResourcesPath, testAudioFile);
    //         boolean useCER = language.equals("ja");

    //         PicoLLMTranscript result = picollm.processFile(audioFile.getAbsolutePath());
    //         assertTrue(getWordErrorRate(
    //                 result.getTranscriptString(), expectedTranscriptWithPunctuation, useCER) < errorRate);

    //         validateMetadata(
    //                 result.getWordArray(),
    //                 expectedWords,
    //                 false
    //         );

    //         picollm.delete();
    //     }

    //     @Test
    //     public void testTranscribeAudioData() throws Exception {
    //         String modelPath = new File(testResourcesPath, modelFile).getAbsolutePath();
    //         PicoLLM picollm = new PicoLLM.Builder()
    //                 .setAccessKey(accessKey)
    //                 .setModelPath(modelPath)
    //                 .build(appContext);

    //         File audioFile = new File(testResourcesPath, testAudioFile);
    //         short[] pcm = readAudioFile(audioFile.getAbsolutePath());

    //         PicoLLMTranscript result = picollm.process(pcm);
    //         boolean useCER = language.equals("ja");

    //         assertTrue(getWordErrorRate(result.getTranscriptString(), expectedTranscript, useCER) < errorRate);
    //         validateMetadata(
    //                 result.getWordArray(),
    //                 expectedWords,
    //                 false
    //         );

    //         picollm.delete();
    //     }

    //     @Test
    //     public void testTranscribeAudioDataWithDiarization() throws Exception {
    //         String modelPath = new File(testResourcesPath, modelFile).getAbsolutePath();
    //         PicoLLM picollm = new PicoLLM.Builder()
    //                 .setAccessKey(accessKey)
    //                 .setModelPath(modelPath)
    //                 .setEnableDiarization(true)
    //                 .build(appContext);

    //         File audioFile = new File(testResourcesPath, testAudioFile);
    //         short[] pcm = readAudioFile(audioFile.getAbsolutePath());

    //         PicoLLMTranscript result = picollm.process(pcm);
    //         boolean useCER = language.equals("ja");

    //         assertTrue(getWordErrorRate(result.getTranscriptString(), expectedTranscript, useCER) < errorRate);
    //         validateMetadata(
    //                 result.getWordArray(),
    //                 expectedWords,
    //                 true
    //         );

    //         picollm.delete();
    //     }
    // }

    // @RunWith(Parameterized.class)
    // public static class DiarizationTests extends BaseTest {
    //     @Parameterized.Parameter(value = 0)
    //     public String language;

    //     @Parameterized.Parameter(value = 1)
    //     public String modelFile;

    //     @Parameterized.Parameter(value = 2)
    //     public String testAudioFile;

    //     @Parameterized.Parameter(value = 3)
    //     public PicoLLMTranscript.Word[] expectedWords;

    //     @Parameterized.Parameters(name = "{0}")
    //     public static Collection<Object[]> initParameters() throws IOException {
    //         String testDataJsonString = getTestDataString();

    //         JsonParser parser = new JsonParser();
    //         JsonObject testDataJson = parser.parse(testDataJsonString).getAsJsonObject();
    //         JsonArray languageTests = testDataJson
    //                 .getAsJsonObject("tests")
    //                 .getAsJsonArray("diarization_tests");

    //         List<Object[]> parameters = new ArrayList<>();
    //         for (int i = 0; i < languageTests.size(); i++) {
    //             JsonObject testData = languageTests.get(i).getAsJsonObject();

    //             String language = testData.get("language").getAsString();
    //             String audioFile = testData.get("audio_file").getAsString();
    //             JsonArray words = testData.get("words").getAsJsonArray();

    //             String modelFile;
    //             if (language.equals("en")) {
    //                 modelFile = "model_files/picollm_params.pv";
    //             } else {
    //                 modelFile = String.format("model_files/picollm_params_%s.pv", language);
    //             }

    //             String testAudioFile = String.format("audio_samples/%s", audioFile);

    //             PicoLLMTranscript.Word[] paramWords = new PicoLLMTranscript.Word[words.size()];
    //             for (int j = 0; j < words.size(); j++) {
    //                 JsonObject wordObject = words.get(j).getAsJsonObject();

    //                 String word = wordObject.get("word").getAsString();
    //                 int speakerTag = wordObject.get("speaker_tag").getAsInt();

    //                 paramWords[j] = new PicoLLMTranscript.Word(
    //                     word,
    //                     0.f,
    //                     0.f,
    //                     0.f,
    //                     speakerTag
    //                 );
    //             }

    //             parameters.add(new Object[]{
    //                     language,
    //                     modelFile,
    //                     testAudioFile,
    //                     paramWords
    //             });
    //         }

    //         return parameters;
    //     }

    //     @Test
    //     public void testDiarizationMultipleSpeakers() throws Exception {
    //         String modelPath = new File(testResourcesPath, modelFile).getAbsolutePath();
    //         PicoLLM picollm = new PicoLLM.Builder()
    //                 .setAccessKey(accessKey)
    //                 .setModelPath(modelPath)
    //                 .setEnableDiarization(true)
    //                 .build(appContext);

    //         File audioFile = new File(testResourcesPath, testAudioFile);
    //         short[] pcm = readAudioFile(audioFile.getAbsolutePath());

    //         PicoLLMTranscript result = picollm.process(pcm);

    //         assertEquals(result.getWordArray().length, expectedWords.length);
    //         for (int i = 0; i < result.getWordArray().length; i++) {
    //             assertEquals(result.getWordArray()[i].getWord(), expectedWords[i].getWord());
    //             assertEquals(result.getWordArray()[i].getSpeakerTag(), expectedWords[i].getSpeakerTag());
    //         }
    //         picollm.delete();
    //     }
    }
}
