/*
    Copyright 2025 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
    file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
    an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using Pv;

using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace PicoLLMTest
{
    [TestClass]
    public class MainTest
    {
        private static readonly string ROOT_DIR = Path.Combine(
            AppContext.BaseDirectory,
            "../../../../../..");

        private string _accessKey;
        private string _modelPath;
        private string _ocrModelPath;
        private string _visionModelPath;
        private string _embeddingModelPath;
        private string _device;

        private JToken _testJson;

        private class CompletionExpectation
        {
            [JsonProperty("num-prompt-tokens")]
            private readonly int numPromptTokens;

            [JsonProperty("num-completion-tokens")]
            private readonly int numCompletionTokens;

            [JsonProperty("endpoint")]
            private readonly PicoLLMEndpoint endpoint;

            [JsonProperty("num-top-choices")]
            private readonly int numTopChoices;

            [JsonProperty("completion")]
            private readonly string completion;

            public CompletionExpectation(
                int numPromptTokens,
                int numCompletionTokens,
                PicoLLMEndpoint endpoint,
                int numTopChoices,
                string completion)
            {
                this.numPromptTokens = numPromptTokens;
                this.numCompletionTokens = numCompletionTokens;
                this.endpoint = endpoint;
                this.numTopChoices = numTopChoices;
                this.completion = completion;
            }

            public int NumPromptTokens => numPromptTokens;

            public int NumCompletionTokens => numCompletionTokens;

            public PicoLLMEndpoint Endpoint => endpoint;

            public int NumTopChoices => numTopChoices;

            public string Completion => completion;
        }

        private class OCRExpectation
        {
            [JsonProperty("endpoint")]
            private readonly PicoLLMEndpoint endpoint;

            [JsonProperty("completion")]
            private readonly string completion;

            public OCRExpectation(PicoLLMEndpoint endpoint, string completion)
            {
                this.endpoint = endpoint;
                this.completion = completion;
            }

            public PicoLLMEndpoint Endpoint => endpoint;

            public string Completion => completion;
        }

        private class EmbeddingExpectation
        {
            [JsonProperty("doc")]
            private readonly string doc;

            [JsonProperty("similarity")]
            private readonly float similarity;

            public EmbeddingExpectation(string doc, float similarity)
            {
                this.doc = doc;
                this.similarity = similarity;
            }

            public string Doc => doc;

            public float Similarity => similarity;
        }

        [TestInitialize]
        public void Setup()
        {
            _accessKey = Environment.GetEnvironmentVariable("ACCESS_KEY");
            _modelPath = Environment.GetEnvironmentVariable("TEXT_MODEL_PATH");
            _ocrModelPath = Environment.GetEnvironmentVariable("OCR_MODEL_PATH");
            _visionModelPath = Environment.GetEnvironmentVariable("VISION_MODEL_PATH");
            _embeddingModelPath = Environment.GetEnvironmentVariable("EMBEDDING_MODEL_PATH");
            _device = Environment.GetEnvironmentVariable("DEVICE");
            _testJson = LoadJsonTestData()["picollm"];
        }

        [TestMethod]
        public void TestInit()
        {
            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath))
            {
                Assert.IsFalse(string.IsNullOrWhiteSpace(picoLLM.Version), "picoLLM did not return a valid version string.");
                Assert.IsTrue(picoLLM.Model == "phi2 [2.90 v1]", "picoLLM did not return the correct model string.");
                Assert.IsTrue(picoLLM.ContextLength == 2048, "picoLLM did not return the correct context length.");
                Assert.IsTrue(picoLLM.MaxTopChoices > 0, "picoLLM did not return a valid max top choices.");
            }
        }

        [TestMethod]
        public void TestInitWithInvalidAccessKey()
        {
            Assert.ThrowsException<PicoLLMInvalidArgumentException>(() =>
            {
                PicoLLM.Create(
                    "invalid==",
                    _modelPath,
                    _device);
            });
        }

        [TestMethod]
        public void TestInitWithInvalidModelPath()
        {
            Assert.ThrowsException<PicoLLMIOException>(() =>
            {
                PicoLLM.Create(
                    _accessKey,
                    "/invalid.pllm",
                    _device);
            });
        }

        [TestMethod]
        public void TestInitWithInvalidDevice()
        {
            Assert.ThrowsException<PicoLLMInvalidArgumentException>(() =>
            {
                PicoLLM.Create(
                    _accessKey,
                    _modelPath,
                    "cpu:nan");
            });
        }

        [TestMethod]
        public void TestGenerate()
        {
            JToken data = _testJson["default"];
            string prompt = data["prompt"].ToObject<string>();
            List<CompletionExpectation> expectations = data["expectations"].ToObject<List<CompletionExpectation>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                PicoLLMCompletion res = picoLLM.Generate(prompt);
                VerifyCompletion(res, expectations);
            }
        }

        [TestMethod]
        public void TestGenerateWithCompletionTokenLimit()
        {
            JToken data = _testJson["with-completion-token-limit"];
            string prompt = data["prompt"].ToObject<string>();
            int completionTokenLimit = data["parameters"]["completion-token-limit"].ToObject<int>();
            List<CompletionExpectation> expectations = data["expectations"].ToObject<List<CompletionExpectation>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                PicoLLMCompletion res = picoLLM.Generate(prompt, completionTokenLimit: completionTokenLimit);
                VerifyCompletion(res, expectations);
            }
        }

        [TestMethod]
        public void TestGenerateWithStopPhrases()
        {
            JToken data = _testJson["with-stop-phrases"];
            string prompt = data["prompt"].ToObject<string>();
            string[] stopPhrases = data["parameters"]["stop-phrases"].ToObject<string[]>();
            List<CompletionExpectation> expectations = data["expectations"].ToObject<List<CompletionExpectation>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                PicoLLMCompletion res = picoLLM.Generate(prompt, stopPhrases: stopPhrases);
                VerifyCompletion(res, expectations);
            }
        }

        [TestMethod]
        public void TestGenerateWithPresencePenalty()
        {
            JToken data = _testJson["with-presence-penalty"];
            string prompt = data["prompt"].ToObject<string>();
            float presencePenalty = data["parameters"]["presence-penalty"].ToObject<float>();
            List<CompletionExpectation> expectations = data["expectations"].ToObject<List<CompletionExpectation>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                PicoLLMCompletion res = picoLLM.Generate(prompt, presencePenalty: presencePenalty);
                VerifyCompletion(res, expectations);
            }
        }

        [TestMethod]
        public void TestGenerateWithFrequencyPenalty()
        {
            JToken data = _testJson["with-frequency-penalty"];
            string prompt = data["prompt"].ToObject<string>();
            float frequencyPenalty = data["parameters"]["frequency-penalty"].ToObject<float>();
            List<CompletionExpectation> expectations = data["expectations"].ToObject<List<CompletionExpectation>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                PicoLLMCompletion res = picoLLM.Generate(prompt, frequencyPenalty: frequencyPenalty);
                VerifyCompletion(res, expectations);
            }
        }

        [TestMethod]
        public void TestGenerateWithTemperature()
        {
            JToken data = _testJson["with-temperature"];
            string prompt = data["prompt"].ToObject<string>();
            int completionTokenLimit = data["parameters"]["completion-token-limit"].ToObject<int>();
            float temperature = data["parameters"]["temperature"].ToObject<float>();
            List<int> seeds = data["parameters"]["seeds"].ToObject<List<int>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                int numPromptTokens = picoLLM.Tokenize(prompt, bos: true, eos: false).Length;
                PicoLLMCompletion res = picoLLM.Generate(prompt, completionTokenLimit: completionTokenLimit, seed: seeds[0], temperature: temperature);
                PicoLLMCompletion res2 = picoLLM.Generate(prompt, completionTokenLimit: completionTokenLimit, seed: seeds[1], temperature: temperature);

                VerifyCompletion(res, new List<CompletionExpectation>
                {
                    new CompletionExpectation(numPromptTokens, res.Usage.CompletionTokens, res.Endpoint, 0, res.Completion)
                });

                VerifyCompletion(res2, new List<CompletionExpectation>
                {
                    new CompletionExpectation(numPromptTokens, res2.Usage.CompletionTokens, res2.Endpoint, 0, res2.Completion)
                });

                Assert.AreNotEqual(res.Completion, res2.Completion);
            }
        }

        [TestMethod]
        public void TestGenerateWithTemperatureAndIdenticalSeeds()
        {
            if (!_device.Contains("gpu"))
            {
                JToken data = _testJson["with-temperature-and-identical-seeds"];
                string prompt = data["prompt"].ToObject<string>();
                int completionTokenLimit = data["parameters"]["completion-token-limit"].ToObject<int>();
                int seed = data["parameters"]["seed"].ToObject<int>();
                float temperature = data["parameters"]["temperature"].ToObject<float>();
                Console.WriteLine(seed);
                using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
                {
                    int numPromptTokens = picoLLM.Tokenize(prompt, bos: true, eos: false).Length;
                    PicoLLMCompletion res = picoLLM.Generate(
                        prompt, completionTokenLimit:
                        completionTokenLimit,
                        seed: seed,
                        temperature: temperature);
                    PicoLLMCompletion res2 = picoLLM.Generate(
                        prompt, completionTokenLimit: completionTokenLimit,
                        seed: seed,
                        temperature: temperature);

                    VerifyCompletion(res, new List<CompletionExpectation>
                    {
                        new CompletionExpectation(numPromptTokens, res.Usage.CompletionTokens, res.Endpoint, 0, res.Completion)
                    });

                    VerifyCompletion(res2, new List<CompletionExpectation>
                    {
                        new CompletionExpectation(numPromptTokens, res2.Usage.CompletionTokens, res2.Endpoint, 0, res2.Completion)
                    });

                    Assert.AreEqual(res.Completion, res2.Completion);
                }
            }
        }

        [TestMethod]
        public void TestGenerateWithTemperatureAndTopP()
        {
            if (!_device.Contains("gpu"))
            {
                JToken data = _testJson["with-temperature-and-top-p"];
                string prompt = data["prompt"].ToObject<string>();
                int completionTokenLimit = data["parameters"]["completion-token-limit"].ToObject<int>();
                int seed = data["parameters"]["seed"].ToObject<int>();
                float temperature = data["parameters"]["temperature"].ToObject<float>();
                float topP = data["parameters"]["top-p"].ToObject<float>();
                List<string> expectations = data["expectations"].ToObject<List<string>>();

                using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
                {
                    int numPromptTokens = picoLLM.Tokenize(prompt, bos: true, eos: false).Length;
                    PicoLLMCompletion res = picoLLM.Generate(prompt, completionTokenLimit: completionTokenLimit, seed: seed, temperature: temperature, topP: topP);
                    VerifyCompletion(res, expectations.Select(x => new CompletionExpectation(numPromptTokens, res.Usage.CompletionTokens, res.Endpoint, 0, x)).ToList());
                }
            }
        }

        [TestMethod]
        public void TestGenerateWithTopChoices()
        {
            JToken data = _testJson["with-top-choices"];
            string prompt = data["prompt"].ToObject<string>();
            int numTopChoices = data["parameters"]["num-top-choices"].ToObject<int>();
            List<CompletionExpectation> expectations = data["expectations"].ToObject<List<CompletionExpectation>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                PicoLLMCompletion res = picoLLM.Generate(prompt, numTopChoices: numTopChoices);
                VerifyCompletion(res, expectations);
            }
        }

        [TestMethod]
        public void TestGenerateWithStreamCallback()
        {
            JToken data = _testJson["default"];
            string prompt = data["prompt"].ToObject<string>();
            List<CompletionExpectation> expectations = data["expectations"].ToObject<List<CompletionExpectation>>();

            List<string> pieces = new List<string>();
            Action<string> streamCallback = (string x) => pieces.Add(x);

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                PicoLLMCompletion res = picoLLM.Generate(prompt, streamCallback: streamCallback);
                VerifyCompletion(res, expectations);
            }

            Assert.AreEqual(string.Join("", pieces), expectations[0].Completion);
        }

        [TestMethod]
        public void TestGenerateWithImage()
        {
            JToken data = LoadJsonTestData()["generate_with_image"];
            string prompt = data["prompt"].ToObject<string>();

            string imagePath = data["image"].ToObject<string>();
            PicoLLMImage image = LoadImage(imagePath);

            int completionTokenLimit = data["parameters"]["completion-token-limit"].ToObject<int>();
            List<CompletionExpectation> expectations = data["expectations"].ToObject<List<CompletionExpectation>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _visionModelPath, _device))
            {
                PicoLLMCompletion res = picoLLM.GenerateWithImage(
                    prompt,
                    image.Width,
                    image.Height,
                    image.Pixels,
                    completionTokenLimit: completionTokenLimit);
                VerifyCompletion(res, expectations);
            }
        }

        [TestMethod]
        public void TestGenerateOCR()
        {
            JToken data = LoadJsonTestData()["generate_ocr"];

            string imagePath = data["image"].ToObject<string>();
            PicoLLMImage image = LoadImage(imagePath);

            int completionTokenLimit = data["parameters"]["completion-token-limit"].ToObject<int>();
            List<OCRExpectation> expectations = data["expectations"].ToObject<List<OCRExpectation>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _ocrModelPath, _device))
            {
                PicoLLMCompletion res = picoLLM.GenerateOCR(
                    image.Width,
                    image.Height,
                    image.Pixels,
                    completionTokenLimit: completionTokenLimit);
                VerifyOCRCompletion(res, expectations);
            }
        }

        [TestMethod]
        public void TestGenerateOCRLarge()
        {
            JToken data = LoadJsonTestData()["generate_ocr_large"];

            string imagePath = data["image"].ToObject<string>();
            PicoLLMImage image = LoadImage(imagePath);

            int completionTokenLimit = data["parameters"]["completion-token-limit"].ToObject<int>();
            List<OCRExpectation> expectations = data["expectations"].ToObject<List<OCRExpectation>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _ocrModelPath, _device))
            {
                PicoLLMCompletion res = picoLLM.GenerateOCR(
                    image.Width,
                    image.Height,
                    image.Pixels,
                    completionTokenLimit: completionTokenLimit);
                VerifyOCRCompletion(res, expectations);
            }
        }

        [TestMethod]
        public void TestGenerateEmbedding()
        {
            JToken data = LoadJsonTestData()["generate_embedding"];
            string prompt = data["prompt"].ToObject<string>();

            List<EmbeddingExpectation> expectations = data["expectations"].ToObject<List<EmbeddingExpectation>>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _embeddingModelPath, _device))
            {
                float[] targetEmbeddings = picoLLM.GenerateEmbeddings(prompt);

                List<float[]> referenceEmbeddingsList = new List<float[]>();
                foreach (EmbeddingExpectation expectation in expectations)
                {
                    referenceEmbeddingsList.Add(picoLLM.GenerateEmbeddings(expectation.Doc));
                }

                VerifyEmbeddingCompletion(targetEmbeddings, referenceEmbeddingsList, expectations);
            }
        }

        [TestMethod]
        public void TestInterrupt()
        {
            JToken data = _testJson["default"];
            string prompt = data["prompt"].ToObject<string>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                Task<PicoLLMCompletion> generateTask = Task.Run(() => picoLLM.Generate(prompt, streamCallback: (_) => picoLLM.Interrupt()));
                PicoLLMCompletion res = generateTask.Result;
                Assert.AreEqual(res.Endpoint, PicoLLMEndpoint.INTERRUPTED);
            }
        }

        [TestMethod]
        public void TestGetAvailableDevices()
        {
            string[] devices = PicoLLM.GetAvailableDevices();
            Assert.IsTrue(devices.Length > 0);
            foreach (string device in devices)
            {
                Assert.IsFalse(string.IsNullOrEmpty(device));
            }
        }

        [TestMethod]
        public void TestTokenize()
        {
            string text = _testJson["tokenize"]["text"].ToObject<string>();
            int[] expectedTokens = _testJson["tokenize"]["tokens"].ToObject<int[]>();

            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                int[] tokens = picoLLM.Tokenize(text, bos: true, eos: false);
                CollectionAssert.AreEqual(expectedTokens, tokens);
            }
        }

        [TestMethod]
        public void TestForward()
        {
            int testToken = _testJson["tokenize"]["tokens"].ToObject<int[]>()[0];
            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                float[] logits = picoLLM.Forward(testToken);
                Assert.IsTrue(logits.Length > 0);
                var expSum = logits.Sum(x => Math.Exp(x));
                var ratio = expSum / logits.Sum(x => Math.Exp(x));
                Assert.AreEqual(1.0, ratio, 1e-10);
            }
        }

        [TestMethod]
        public void TestReset()
        {
            int testToken = _testJson["tokenize"]["tokens"].ToObject<int[]>()[0];
            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                float[] logits = picoLLM.Forward(testToken);
                picoLLM.Reset();
                float[] newLogits = picoLLM.Forward(testToken);
                if (_device.Contains("gpu"))
                {
                    for (int i = 0; i < logits.Length; i++)
                    {
                        Assert.AreEqual(logits[i], newLogits[i], 0.01);
                    }
                }
                else
                {
                    CollectionAssert.AreEqual(logits, newLogits);
                }
            }
        }

        [TestMethod]
        public void TestMessageStack()
        {
            PicoLLM p;
            string[] messageList = { };

            try
            {
                p = PicoLLM.Create("invalid", _modelPath, _device);
                Assert.IsNull(p);
                p.Dispose();
            }
            catch (PicoLLMException e)
            {
                messageList = e.MessageStack;
            }

            Assert.IsTrue(0 < messageList.Length);
            Assert.IsTrue(messageList.Length < 8);

            try
            {
                p = PicoLLM.Create("invalid", _modelPath, _device);
                Assert.IsNull(p);
                p.Dispose();
            }
            catch (PicoLLMException e)
            {
                for (int i = 0; i < messageList.Length; i++)
                {
                    Assert.AreEqual(messageList[i], e.MessageStack[i]);
                }
            }
        }

        [TestMethod]
        public void TestGetDialog()
        {
            using (PicoLLM picoLLM = PicoLLM.Create(_accessKey, _modelPath, _device))
            {
                PicoLLMDialog dialog = picoLLM.GetDialog();
                Assert.IsNotNull(dialog);
                dialog = picoLLM.GetDialog(mode: "chat");
                Assert.IsNotNull(dialog);
            }
        }

        public static IEnumerable<object[]> DialogTestData
        {
            get
            {
                JToken dialogTestData = LoadJsonTestData()["dialog"];
                string system = dialogTestData["system"].ToObject<string>();
                List<List<string>> conversation = dialogTestData["conversation"].ToObject<List<List<string>>>();
                Dictionary<string, string> prompts = dialogTestData["prompts"].ToObject<Dictionary<string, string>>();
                Dictionary<string, string> promptsWithSystem = dialogTestData["prompts-with-system"].ToObject<Dictionary<string, string>>();
                Dictionary<string, string> promptsWithHistory = dialogTestData["prompts-with-history"].ToObject<Dictionary<string, string>>();
                Dictionary<string, string> promptsWithSystemAndHistory = dialogTestData["prompts-with-system-and-history"].ToObject<Dictionary<string, string>>();
                return prompts
                    .Select(x => new object[] {
                        x.Key,
                        system,
                        conversation,
                        x.Value,
                        promptsWithSystem[x.Key],
                        promptsWithHistory[x.Key],
                        promptsWithSystemAndHistory[x.Key],
                    });
            }
        }

        private static readonly Dictionary<string, Type> dialogs = new Dictionary<string, Type>
        {
            { "gemma-chat-dialog", typeof(GemmaChatDialog) },
            { "gemma3-chat-dialog", typeof(GemmaChatDialog) },
            { "llama-2-chat-dialog", typeof(Llama2ChatDialog) },
            { "llama-3-chat-dialog", typeof(Llama3ChatDialog) },
            { "llama-3.2-chat-dialog", typeof(Llama32ChatDialog) },
            { "mistral-chat-dialog", typeof(MistralChatDialog) },
            { "phi2-chat-dialog", typeof(Phi2ChatDialog) },
            { "phi2-qa-dialog", typeof(Phi2QADialog) },
            { "phi3-chat-dialog", typeof(Phi3ChatDialog) },
            { "phi3.5-chat-dialog", typeof(Phi35ChatDialog) }
        };

        private void TestPromptHelper(PicoLLMDialog dialog, List<List<string>> conversation, string expected)
        {
            for (int i = 0; i < conversation.Count - 1; i++)
            {
                dialog.AddHumanRequest(conversation[i][0]);
                dialog.AddLLMResponse(conversation[i][1]);
            }

            dialog.AddHumanRequest(conversation[conversation.Count - 1][0]);
            string prompt = dialog.Prompt();

            Assert.AreEqual(expected, prompt);
        }

        [TestMethod]
        [DynamicData(nameof(DialogTestData))]
        public void TestDialogPrompt(
            string dialogName,
            string system,
            List<List<string>> conversation,
            string expectedPrompt,
            string expectedPromptWithSystem,
            string expectedPromptWithHistory,
            string expectedPromptWithSystemAndHistory)
        {
            PicoLLMDialog dialog = (PicoLLMDialog)Activator.CreateInstance(dialogs[dialogName], new object[] { null, null });
            TestPromptHelper(dialog, conversation, expectedPrompt);
        }

        [TestMethod]
        [DynamicData(nameof(DialogTestData))]
        public void TestDialogPromptWithSystem(
            string dialogName,
            string system,
            List<List<string>> conversation,
            string expectedPrompt,
            string expectedPromptWithSystem,
            string expectedPromptWithHistory,
            string expectedPromptWithSystemAndHistory)
        {
            PicoLLMDialog dialog = (PicoLLMDialog)Activator.CreateInstance(dialogs[dialogName], new object[] { null, system });
            TestPromptHelper(dialog, conversation, expectedPromptWithSystem);
        }

        [TestMethod]
        [DynamicData(nameof(DialogTestData))]
        public void TestDialogPromptWithHistory(
            string dialogName,
            string system,
            List<List<string>> conversation,
            string expectedPrompt,
            string expectedPromptWithSystem,
            string expectedPromptWithHistory,
            string expectedPromptWithSystemAndHistory)
        {
            PicoLLMDialog dialog = (PicoLLMDialog)Activator.CreateInstance(dialogs[dialogName], new object[] { 0, null });
            TestPromptHelper(dialog, conversation, expectedPromptWithHistory);
        }

        [TestMethod]
        [DynamicData(nameof(DialogTestData))]
        public void TestDialogPromptWithSystemAndHistory(
            string dialogName,
            string system,
            List<List<string>> conversation,
            string expectedPrompt,
            string expectedPromptWithSystem,
            string expectedPromptWithHistory,
            string expectedPromptWithSystemAndHistory)
        {
            PicoLLMDialog dialog = (PicoLLMDialog)Activator.CreateInstance(dialogs[dialogName], new object[] { 0, system });
            TestPromptHelper(dialog, conversation, expectedPromptWithSystemAndHistory);
        }

        private bool VerifyCompletionHelper(PicoLLMCompletion res, CompletionExpectation expectation)
        {
            if (res.Usage.PromptTokens != expectation.NumPromptTokens ||
                res.Usage.CompletionTokens != expectation.NumCompletionTokens ||
                res.Endpoint != expectation.Endpoint)
            {
                return false;
            }

            foreach (PicoLLMCompletionToken completionToken in res.CompletionTokens)
            {
                if (completionToken.Token.Token.Length == 0 ||
                    completionToken.Token.LogProb > 0.0 ||
                    completionToken.TopChoices.Length != expectation.NumTopChoices)
                {
                    return false;
                }

                foreach (PicoLLMToken topChoice in completionToken.TopChoices)
                {
                    if (topChoice.Token.Length == 0 || topChoice.LogProb > 0.0)
                    {
                        return false;
                    }
                }

                if (completionToken.TopChoices.Length > 0)
                {
                    double sumLogProb = completionToken.TopChoices
                        .Select(topChoice => Math.Exp(topChoice.LogProb))
                        .Sum();
                    if (sumLogProb > 1.0)
                    {
                        return false;
                    }
                }
            }

            if (!res.CompletionTokens.Any(x => x.Token.Token.Contains("\\x")))
            {
                StringBuilder completionStringBuilder = new StringBuilder();
                foreach (var token in res.CompletionTokens)
                {
                    completionStringBuilder.Append(token.Token.Token);
                }

                if (completionStringBuilder.ToString() != expectation.Completion)
                {
                    return false;
                }
            }

            return res.Completion == expectation.Completion;
        }

        private void VerifyCompletion(PicoLLMCompletion res, List<CompletionExpectation> expectations)
        {
            bool anyMatch = expectations.Any(expectation => VerifyCompletionHelper(res, expectation));
            Assert.IsTrue(anyMatch);
        }

        private void VerifyOCRCompletion(PicoLLMCompletion res, List<OCRExpectation> expectations)
        {
            bool anyMatch = false;
            foreach (OCRExpectation expectation in expectations)
            {
                if (res.Endpoint == expectation.Endpoint && res.Completion == expectation.Completion)
                {
                    anyMatch = true;
                    break;
                }
            }

            Assert.IsTrue(anyMatch);
        }

        private void VerifyEmbeddingCompletion(
            float[] targetEmbeddings,
            List<float[]> referenceEmbeddingsList,
            List<EmbeddingExpectation> expectations)
        {
            Assert.AreEqual(referenceEmbeddingsList.Count, expectations.Count);

            bool anyMatch = false;
            for (int i = 0; i < expectations.Count; i++)
            {
                EmbeddingExpectation expectation = expectations[i];

                float similarity = Similarity(targetEmbeddings, referenceEmbeddingsList[i]);
                if (Math.Abs(similarity - expectation.Similarity) < 0.001)
                {
                    anyMatch = true;
                    break;
                }
            }

            Assert.IsTrue(anyMatch);
        }

        private float Similarity(float[] a, float[] b)
        {
            Assert.AreEqual(a.Length, b.Length);

            float sum = 0.0f;
            for (int i = 0; i < a.Length; i++)
            {
                sum += a[i] * b[i];
            }

            return sum;
        }

        private static JObject LoadJsonTestData()
        {
            string content = File.ReadAllText(Path.Combine(ROOT_DIR, "resources/.test/test_data.json"));
            return JObject.Parse(content);
        }

        /// <summary>
        /// Represents an RGB image.
        /// </summary>
        private class PicoLLMImage
        {
            /// <summary>
            /// Image width.
            /// </summary>
            public int Width { get; }

            /// <summary>
            /// Image height.
            /// </summary>
            public int Height { get; }

            /// <summary>
            /// Image pixel data in 24 bits-per-pixel RGB format.
            /// </summary>
            public byte[] Pixels { get; }

            public PicoLLMImage(int width, int height, byte[] pixels)
            {
                Width = width;
                Height = height;
                Pixels = pixels;

                if (width * height * 3 != pixels.Length)
                {
                    throw new PicoLLMInvalidArgumentException(String.Format(
                            "Unexpected number of bytes ({0}) for RGB image of size {1} x {2}",
                            pixels.Length,
                            width,
                            height));
                }
            }
        }

        private static PicoLLMImage LoadImage(string name)
        {
            string path = Path.Combine(ROOT_DIR, String.Format("resources/.test/images/{0}", name));
            byte[] fileBytes = File.ReadAllBytes(path);
            using (Image<Rgb24> image = Image.Load<Rgb24>(fileBytes))
            {
                byte[] imageBytes = new byte[image.Width * image.Height * Unsafe.SizeOf<Rgb24>()];
                image.CopyPixelDataTo(imageBytes);

                return new PicoLLMImage(image.Width, image.Height, imageBytes);
            }
        }
    }
}