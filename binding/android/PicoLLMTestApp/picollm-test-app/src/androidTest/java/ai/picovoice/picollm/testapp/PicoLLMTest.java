/*
    Copyright 2024 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/

package ai.picovoice.picollm.testapp;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.experimental.runners.Enclosed;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import ai.picovoice.picollm.GemmaChatDialog;
import ai.picovoice.picollm.Llama2ChatDialog;
import ai.picovoice.picollm.Llama3ChatDialog;
import ai.picovoice.picollm.MistralChatDialog;
import ai.picovoice.picollm.Phi2ChatDialog;
import ai.picovoice.picollm.Phi2QADialog;
import ai.picovoice.picollm.PicoLLM;
import ai.picovoice.picollm.PicoLLMCompletion;
import ai.picovoice.picollm.PicoLLMDialog;
import ai.picovoice.picollm.PicoLLMException;
import ai.picovoice.picollm.PicoLLMGenerateParams;


@RunWith(Enclosed.class)
public class PicoLLMTest {

    public static class StandardTests extends BaseTest {

        PicoLLM picollm;

        @Before
        public void Setup() throws PicoLLMException {
            picollm = new PicoLLM.Builder()
                    .setAccessKey(accessKey)
                    .setModelPath(modelPath)
                    .setDevice(device)
                    .build();
        }

        @After
        public void Teardown() {
            if (picollm != null) {
                picollm.delete();
                picollm = null;
            }
        }

        @Test
        public void getConstants() throws PicoLLMException {
            assertTrue(PicoLLM.getMaxTopChoices() > 0);
            assertTrue(PicoLLM.getVersion() != null && !PicoLLM.getVersion().equals(""));
            assertEquals(picollm.getModel(), "phi2 [2.90 v1]");
            assertEquals(picollm.getContextLength(), 2048);
        }

        @Test
        public void testInitFailWithInvalidAccessKey() {
            assertThrows(PicoLLMException.class, () ->
                    new PicoLLM.Builder()
                            .setAccessKey("invalid==")
                            .setModelPath(modelPath)
                            .setDevice(device)
                            .build()
            );
        }

        @Test
        public void testInitFailWithInvalidModelPath() {
            assertThrows(PicoLLMException.class, () ->
                    new PicoLLM.Builder()
                            .setAccessKey(accessKey)
                            .setModelPath("/invalid.pllm")
                            .setDevice(device)
                            .build()
            );
        }

        @Test
        public void testInitFailWithInvalidDevice() {
            assertThrows(PicoLLMException.class, () ->
                    new PicoLLM.Builder()
                            .setAccessKey(accessKey)
                            .setModelPath(modelPath)
                            .setDevice("cpu:nan")
                            .build()
            );
        }

        private boolean verifyCompletionHelper(PicoLLMCompletion res, CompletionExpectation expectation) {
            if (res.getUsage().getPromptTokens() != expectation.getNumPromptTokens() ||
                    res.getUsage().getCompletionTokens() != expectation.getNumCompletionTokens() ||
                    res.getEndpoint() != expectation.getEndpoint()) {
                return false;
            }

            for (PicoLLMCompletion.CompletionToken completionToken : res.getCompletionTokens()) {
                if (completionToken.getToken().getToken().length() == 0 ||
                        completionToken.getToken().getLogProb() > 0.0 ||
                        completionToken.getTopChoices().length != expectation.getNumTopChoices()) {
                    return false;
                }

                for (PicoLLMCompletion.Token topChoice : completionToken.getTopChoices()) {
                    if (topChoice.getToken().length() == 0 || topChoice.getLogProb() > 0.0) {
                        return false;
                    }
                }

                if (completionToken.getTopChoices().length > 0) {
                    double sumLogProb = Arrays.stream(completionToken.getTopChoices())
                            .mapToDouble(topChoice -> Math.exp(topChoice.getLogProb()))
                            .sum();
                    if (sumLogProb > 1.0) {
                        return false;
                    }
                }
            }

            if (Arrays.stream(res.getCompletionTokens()).noneMatch(x -> x.getToken().getToken().contains("\\x"))) {

                StringBuilder completionStringBuilder = new StringBuilder();
                Arrays.stream(res.getCompletionTokens())
                        .forEach(x -> completionStringBuilder.append(x.getToken().getToken()));

                if (!completionStringBuilder.toString().equals(expectation.getCompletion())) {
                    return false;
                }
            }

            return res.getCompletion().equals(expectation.getCompletion());
        }

        public void verifyCompletion(PicoLLMCompletion res, List<CompletionExpectation> expectations) {
            boolean anyMatch = expectations.stream().anyMatch(
                    expectation -> verifyCompletionHelper(res, expectation)
            );
            assertTrue(anyMatch);
        }

        @Test
        public void testGenerateDefault() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("default");

            List<CompletionExpectation> expectations = new Gson().fromJson(
                    currentTestData.get("expectations"),
                    new TypeToken<List<CompletionExpectation>>() {
                    }.getType());

            PicoLLMCompletion res = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder().build());

            verifyCompletion(res, expectations);
        }

        @Test
        public void testGenerateWithCompletionTokenLimit() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("with-completion-token-limit");

            int completionTokenLimit = currentTestData
                    .getAsJsonObject("parameters")
                    .get("completion-token-limit").getAsInt();

            List<CompletionExpectation> expectations = new Gson().fromJson(
                    currentTestData.get("expectations"),
                    new TypeToken<List<CompletionExpectation>>() {
                    }.getType());

            PicoLLMCompletion res = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setCompletionTokenLimit(completionTokenLimit)
                            .build());

            verifyCompletion(res, expectations);
        }

        @Test
        public void testGenerateWithStopPhrases() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("with-stop-phrases");

            String[] stopPhrases = new Gson().fromJson(
                    currentTestData
                            .getAsJsonObject("parameters")
                            .get("stop-phrases"),
                    new TypeToken<String[]>() {
                    }.getType());

            List<CompletionExpectation> expectations = new Gson().fromJson(
                    currentTestData.get("expectations"),
                    new TypeToken<List<CompletionExpectation>>() {
                    }.getType());

            PicoLLMCompletion res = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setStopPhrases(stopPhrases)
                            .build());

            verifyCompletion(res, expectations);
        }

        @Test
        public void testGenerateWithPresencePenalty() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("with-presence-penalty");

            float presencePenalty = currentTestData
                    .getAsJsonObject("parameters")
                    .get("presence-penalty").getAsFloat();

            List<CompletionExpectation> expectations = new Gson().fromJson(
                    currentTestData.get("expectations"),
                    new TypeToken<List<CompletionExpectation>>() {
                    }.getType());

            PicoLLMCompletion res = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setPresencePenalty(presencePenalty)
                            .build());

            verifyCompletion(res, expectations);
        }

        @Test
        public void testGenerateWithFrequencyPenalty() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("with-frequency-penalty");

            float frequencyPenalty = currentTestData
                    .getAsJsonObject("parameters")
                    .get("frequency-penalty").getAsFloat();

            List<CompletionExpectation> expectations = new Gson().fromJson(
                    currentTestData.get("expectations"),
                    new TypeToken<List<CompletionExpectation>>() {
                    }.getType());

            PicoLLMCompletion res = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setFrequencyPenalty(frequencyPenalty)
                            .build());

            verifyCompletion(res, expectations);
        }

        @Test
        public void testGenerateWithTemperature() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("with-temperature");

            int completionTokenLimit = currentTestData
                    .getAsJsonObject("parameters")
                    .get("completion-token-limit").getAsInt();

            int[] seeds = new Gson().fromJson(
                    currentTestData
                            .getAsJsonObject("parameters")
                            .get("seeds"),
                    new TypeToken<int[]>() {
                    }.getType());

            float temperature = currentTestData
                    .getAsJsonObject("parameters")
                    .get("temperature").getAsFloat();

            int numPromptTokens = picollm.tokenize(
                    currentTestData.get("prompt").getAsString(),
                    true,
                    false).length;

            PicoLLMCompletion res = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setCompletionTokenLimit(completionTokenLimit)
                            .setSeed(seeds[0])
                            .setTemperature(temperature)
                            .build());

            PicoLLMCompletion res2 = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setCompletionTokenLimit(completionTokenLimit)
                            .setSeed(seeds[1])
                            .setTemperature(temperature)
                            .build());

            verifyCompletion(res, Collections.singletonList(
                    new CompletionExpectation(
                            numPromptTokens,
                            res.getUsage().getCompletionTokens(),
                            res.getEndpoint(),
                            0,
                            res.getCompletion())));

            verifyCompletion(res2, Collections.singletonList(
                    new CompletionExpectation(
                            numPromptTokens,
                            res2.getUsage().getCompletionTokens(),
                            res2.getEndpoint(),
                            0,
                            res2.getCompletion())));

            assertNotEquals(res.getCompletion(), res2.getCompletion());
        }

        @Test
        public void testGenerateWithTemperatureAndIdenticalSeeds() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("with-temperature-and-identical-seeds");

            int completionTokenLimit = currentTestData
                    .getAsJsonObject("parameters")
                    .get("completion-token-limit").getAsInt();

            int seed = currentTestData
                    .getAsJsonObject("parameters")
                    .get("seed").getAsInt();

            float temperature = currentTestData
                    .getAsJsonObject("parameters")
                    .get("temperature").getAsFloat();

            int numPromptTokens = picollm.tokenize(
                    currentTestData.get("prompt").getAsString(),
                    true,
                    false).length;

            PicoLLMCompletion res = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setCompletionTokenLimit(completionTokenLimit)
                            .setSeed(seed)
                            .setTemperature(temperature)
                            .build());

            PicoLLMCompletion res2 = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setCompletionTokenLimit(completionTokenLimit)
                            .setSeed(seed)
                            .setTemperature(temperature)
                            .build());

            verifyCompletion(res, Collections.singletonList(
                    new CompletionExpectation(
                            numPromptTokens,
                            res.getUsage().getCompletionTokens(),
                            res.getEndpoint(),
                            0,
                            res.getCompletion())));

            verifyCompletion(res2, Collections.singletonList(
                    new CompletionExpectation(
                            numPromptTokens,
                            res2.getUsage().getCompletionTokens(),
                            res2.getEndpoint(),
                            0,
                            res2.getCompletion())));

            assertEquals(res.getCompletion(), res2.getCompletion());
        }

        @Test
        public void testGenerateWithTemperatureAndTopP() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("with-temperature-and-top-p");

            int completionTokenLimit = currentTestData
                    .getAsJsonObject("parameters")
                    .get("completion-token-limit").getAsInt();

            int seed = currentTestData
                    .getAsJsonObject("parameters")
                    .get("seed").getAsInt();

            float temperature = currentTestData
                    .getAsJsonObject("parameters")
                    .get("temperature").getAsFloat();

            float topP = currentTestData
                    .getAsJsonObject("parameters")
                    .get("top-p").getAsFloat();

            int numPromptTokens = picollm.tokenize(
                    currentTestData.get("prompt").getAsString(),
                    true,
                    false).length;

            PicoLLMCompletion res = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setCompletionTokenLimit(completionTokenLimit)
                            .setSeed(seed)
                            .setTemperature(temperature)
                            .setTopP(topP)
                            .build());
            List<String> completionStrings = new Gson().fromJson(
                    currentTestData.get("expectations"),
                    new TypeToken<List<String>>() {
                    }.getType());

            List<CompletionExpectation> expectations = completionStrings
                    .stream()
                    .map(x -> new CompletionExpectation(
                            numPromptTokens,
                            res.getUsage().getCompletionTokens(),
                            res.getEndpoint(),
                            0,
                            x))
                    .collect(Collectors.toList());

            verifyCompletion(res, expectations);
        }

        @Test
        public void testGenerateWithTopChoices() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("with-top-choices");

            int numTopChoices = currentTestData
                    .getAsJsonObject("parameters")
                    .get("num-top-choices").getAsInt();

            List<CompletionExpectation> expectations = new Gson().fromJson(
                    currentTestData.get("expectations"),
                    new TypeToken<List<CompletionExpectation>>() {
                    }.getType());

            PicoLLMCompletion res = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setNumTopChoices(numTopChoices)
                            .build());

            verifyCompletion(res, expectations);
        }

        @Test
        public void testGenerateWithStreamCallback() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("default");

            List<CompletionExpectation> expectations = new Gson().fromJson(
                    currentTestData.get("expectations"),
                    new TypeToken<List<CompletionExpectation>>() {
                    }.getType());

            final StringBuilder pieces = new StringBuilder();

            PicoLLMCompletion res = picollm.generate(
                    currentTestData.get("prompt").getAsString(),
                    new PicoLLMGenerateParams.Builder()
                            .setStreamCallback(pieces::append)
                            .build());

            verifyCompletion(res, expectations);

            assertEquals(pieces.toString(), expectations.get(0).getCompletion());
        }

        @Test
        public void testTokenize() throws Exception {
            JsonObject currentTestData = testData
                    .getAsJsonObject("picollm")
                    .getAsJsonObject("tokenize");

            String text = currentTestData.get("text").getAsString();
            int[] expectedTokens = new Gson().fromJson(
                    currentTestData.get("tokens"),
                    new TypeToken<int[]>() {
                    }.getType());


            int[] tokens = picollm.tokenize(
                    text,
                    true,
                    false);

            assertArrayEquals(tokens, expectedTokens);
        }

        @Test
        public void testForward() throws Exception {
            float[] logits = picollm.forward(79);

            assertTrue(logits.length > 0);

            float sum1 = 0;
            float sum2 = 0;
            for (float logit : logits) {
                sum1 += Math.exp(logit);
                sum2 += Math.exp(logit);
            }
            assertEquals(sum1 / sum2, 1.0f, 0.000001);
        }

        @Test
        public void testReset() throws Exception {
            float[] logits = picollm.forward(79);

            picollm.reset();

            assertArrayEquals(logits, picollm.forward(79), 0.0f);
        }

        @Test
        public void testGetDialog() throws Exception {
            PicoLLMDialog dialog = picollm.getDialogBuilder().build();
            assertNotNull(dialog);
            PicoLLMDialog dialog2 = picollm.getDialogBuilder().setMode("chat").build();
            assertNotNull(dialog2);
        }
    }

    @RunWith(Parameterized.class)
    public static class DialogTests extends BaseTest {

        @Parameterized.Parameter(value = 0)
        public String dialogName;

        @Parameterized.Parameter(value = 1)
        public String system;

        @Parameterized.Parameter(value = 2)
        public List<List<String>> conversation;

        @Parameterized.Parameter(value = 3)
        public String expectedPrompt;

        @Parameterized.Parameter(value = 4)
        public String expectedPromptWithSystem;

        @Parameterized.Parameter(value = 5)
        public String expectedPromptWithHistory;

        @Parameterized.Parameter(value = 6)
        public String expectedPromptWithSystemAndHistory;

        @Parameterized.Parameters(name = "{0}")
        public static Collection<Object[]> initParameters() throws IOException {
            JsonObject data = getTestData().getAsJsonObject("dialog");

            String system = data.get("system").getAsString();

            List<List<String>> conversation = new Gson().fromJson(
                    data.get("conversation"),
                    new TypeToken<List<List<String>>>() {
                    }.getType());

            Map<String, String> prompts = new Gson().fromJson(
                    data.get("prompts"),
                    new TypeToken<Map<String, String>>() {
                    }.getType());

            Map<String, String> promptsWithSystem = new Gson().fromJson(
                    data.get("prompts-with-system"),
                    new TypeToken<Map<String, String>>() {
                    }.getType());

            Map<String, String> promptsWithHistory = new Gson().fromJson(
                    data.get("prompts-with-history"),
                    new TypeToken<Map<String, String>>() {
                    }.getType());

            Map<String, String> promptsWithSystemAndHistory = new Gson().fromJson(
                    data.get("prompts-with-system-and-history"),
                    new TypeToken<Map<String, String>>() {
                    }.getType());

            List<Object[]> parameters = new ArrayList<>();
            for (String dialogName : prompts.keySet()) {
                parameters.add(new Object[]{
                        dialogName,
                        system,
                        conversation,
                        prompts.get(dialogName),
                        promptsWithSystem.get(dialogName),
                        promptsWithHistory.get(dialogName),
                        promptsWithSystemAndHistory.get(dialogName)
                });
            }

            return parameters;
        }

        PicoLLM picollm;

        @Before
        public void Setup() throws PicoLLMException {
            picollm = new PicoLLM.Builder()
                    .setAccessKey(accessKey)
                    .setModelPath(modelPath)
                    .setDevice(device)
                    .build();
        }

        @After
        public void Teardown() {
            if (picollm != null) {
                picollm.delete();
                picollm = null;
            }
        }

        public PicoLLMDialog.Builder getDialogBuilder(String dialogName) {
            switch (dialogName) {
                case "gemma-chat-dialog":
                    return new GemmaChatDialog.Builder();
                case "llama-2-chat-dialog":
                    return new Llama2ChatDialog.Builder();
                case "llama-3-chat-dialog":
                    return new Llama3ChatDialog.Builder();
                case "mistral-chat-dialog":
                    return new MistralChatDialog.Builder();
                case "phi2-chat-dialog":
                    return new Phi2ChatDialog.Builder();
                case "phi2-qa-dialog":
                    return new Phi2QADialog.Builder();
                default:
                    return null;
            }
        }

        private void testPromptHelper(PicoLLMDialog dialog, String expected) throws PicoLLMException {
            for (int i = 0; i < conversation.size() - 1; i++) {
                dialog.addHumanRequest(conversation.get(i).get(0));
                dialog.addLLMResponse(conversation.get(i).get(1));
            }
            dialog.addHumanRequest(conversation.get(conversation.size() - 1).get(0));
            String prompt = dialog.getPrompt();
            assertEquals(prompt, expected);
        }

        @Test
        public void testPrompt() throws PicoLLMException {
            PicoLLMDialog dialog = getDialogBuilder(dialogName).build();
            testPromptHelper(dialog, expectedPrompt);
        }

        @Test
        public void testPromptWithSystem() throws PicoLLMException {
            PicoLLMDialog dialog = getDialogBuilder(dialogName)
                    .setSystem(system)
                    .build();
            testPromptHelper(dialog, expectedPromptWithSystem);
        }

        @Test
        public void testPromptWithHistory() throws PicoLLMException {
            PicoLLMDialog dialog = getDialogBuilder(dialogName)
                    .setHistory(0)
                    .build();
            testPromptHelper(dialog, expectedPromptWithHistory);
        }

        @Test
        public void testPromptWithSystemAndHistory() throws PicoLLMException {
            PicoLLMDialog dialog = getDialogBuilder(dialogName)
                    .setSystem(system)
                    .setHistory(0)
                    .build();
            testPromptHelper(dialog, expectedPromptWithSystemAndHistory);
        }
    }

    public static class NonInstanceTests extends BaseTest {

        @Test
        public void testErrorStack() {
            String[] error = {};
            try {
                new PicoLLM.Builder()
                        .setAccessKey("invalid")
                        .setModelPath(modelPath)
                        .setDevice(device)
                        .build();
            } catch (PicoLLMException e) {
                error = e.getMessageStack();
            }

            assertTrue(0 < error.length);
            assertTrue(error.length <= 8);

            try {
                new PicoLLM.Builder()
                        .setAccessKey("invalid")
                        .setModelPath(modelPath)
                        .setDevice(device)
                        .build();
            } catch (PicoLLMException e) {
                for (int i = 0; i < error.length; i++) {
                    assertEquals(e.getMessageStack()[i], error[i]);
                }
            }
        }

        @Test
        public void testGetAvailableDevices() throws PicoLLMException {
            String[] availableDevices = PicoLLM.getAvailableDevices();
            assertTrue(availableDevices.length > 0);
            for (String d : availableDevices) {
                assertTrue(d != null && d.length() > 0);
            }
        }
    }
}
