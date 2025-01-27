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
using System.Threading;
using System.Threading.Tasks;

using Pv;

namespace PicoLLMDemo
{
    public class CompletionDemo
    {
        public static void RunDemo(
            string accessKey,
            string modelPath,
            string prompt,
            string device,
            int completionTokenLimit,
            List<string> stopPhrases,
            int? seed,
            float presencePenalty,
            float frequencyPenalty,
            float temperature,
            float topP,
            int numTopChoices,
            bool verbose)
        {
            using (PicoLLM picoLLM = PicoLLM.Create(accessKey, modelPath, device))
            {
                Console.WriteLine($"picoLLM `{picoLLM.Version}`");
                Console.WriteLine($"Loaded `{picoLLM.Model}`\n");
                Console.WriteLine("Generating... (press `Space` to interrupt)\n");

                bool isInterrupt = false;
                PicoLLMCompletion completion = null;
                Task interruptKeyTask = Task.Run(async () =>
                {
                    while (!isInterrupt && completion == null)
                    {
                        if (!Console.IsInputRedirected && Console.KeyAvailable)
                        {
                            ConsoleKeyInfo keyInfo = Console.ReadKey(intercept: true);
                            if (keyInfo.Key == ConsoleKey.Spacebar)
                            {
                                Console.WriteLine("\n\nInterrupting generation...");
                                isInterrupt = true;
                                picoLLM.Interrupt();
                            }
                        }
                        await Task.Delay(100);
                    }
                });

                double startSec = 0.0;
                Action<string> streamCallback = (string token) =>
                {
                    if (startSec == 0.0)
                    {
                        startSec = DateTime.Now.TimeOfDay.TotalSeconds;
                    }

                    if (!isInterrupt)
                    {
                        Console.Write(token);
                        Console.Out.Flush();
                    }
                };

                completion = picoLLM.Generate(
                    prompt,
                    completionTokenLimit,
                    stopPhrases.ToArray(),
                    seed,
                    presencePenalty,
                    frequencyPenalty,
                    temperature,
                    topP,
                    numTopChoices,
                    streamCallback);

                interruptKeyTask.Wait();

                if (verbose)
                {
                    Console.WriteLine($"\n\n{completion}");
                }

                double elapsedSec = DateTime.Now.TimeOfDay.TotalSeconds - startSec;
                double tokensPerSecond = (completion.Usage.CompletionTokens - 1) / elapsedSec;
                Console.WriteLine($"\n\nGenerated {tokensPerSecond:F2} tokens per second");
            }
        }

        public static void Main(string[] args)
        {
            AppDomain.CurrentDomain.UnhandledException += OnUnhandledException;
            if (args.Length == 0)
            {
                ShowHelp();
                return;
            }

            string accessKey = null;
            string modelPath = null;
            string prompt = null;
            string device = null;
            int completionTokenLimit = 128;
            List<string> stopPhrases = new List<string>();
            int? seed = null;
            float presencePenalty = 0;
            float frequencyPenalty = 0;
            float temperature = 0;
            float topP = 1;
            int numTopChoices = 0;
            bool verbose = false;
            bool showAvailableDevices = false;
            bool showHelp = false;

            int argIndex = 0;
            while (argIndex < args.Length)
            {
                if (args[argIndex] == "--access_key")
                {
                    if (++argIndex < args.Length)
                    {
                        accessKey = args[argIndex++];
                    }
                }
                else if (args[argIndex] == "--model_path")
                {
                    if (++argIndex < args.Length)
                    {
                        modelPath = args[argIndex++];
                    }
                }
                else if (args[argIndex] == "--prompt")
                {
                    if (++argIndex < args.Length)
                    {
                        prompt = args[argIndex++];
                    }
                }
                else if (args[argIndex] == "--device")
                {
                    if (++argIndex < args.Length)
                    {
                        device = args[argIndex++];
                    }
                }
                else if (args[argIndex] == "--completion_token_limit")
                {
                    if (++argIndex < args.Length && int.TryParse(args[argIndex], out int ctl))
                    {
                        completionTokenLimit = ctl;
                        argIndex++;
                    }
                }
                else if (args[argIndex] == "--stop_phrases")
                {
                    argIndex++;
                    stopPhrases = new List<string>();
                    while (argIndex < args.Length && !args[argIndex].StartsWith("--"))
                    {
                        stopPhrases.Add(args[argIndex++]);
                    }
                }
                else if (args[argIndex] == "--seed")
                {
                    if (++argIndex < args.Length && int.TryParse(args[argIndex], out int s))
                    {
                        seed = s;
                        argIndex++;
                    }
                }
                else if (args[argIndex] == "--presence_penalty")
                {
                    if (++argIndex < args.Length && float.TryParse(args[argIndex], out float p))
                    {
                        presencePenalty = p;
                        argIndex++;
                    }
                }
                else if (args[argIndex] == "--frequency_penalty")
                {
                    if (++argIndex < args.Length && float.TryParse(args[argIndex], out float f))
                    {
                        frequencyPenalty = f;
                        argIndex++;
                    }
                }
                else if (args[argIndex] == "--temperature")
                {
                    if (++argIndex < args.Length && float.TryParse(args[argIndex], out float t))
                    {
                        temperature = t;
                        argIndex++;
                    }
                }
                else if (args[argIndex] == "--top_p")
                {
                    if (++argIndex < args.Length && float.TryParse(args[argIndex], out float tp))
                    {
                        topP = tp;
                        argIndex++;
                    }
                }
                else if (args[argIndex] == "--num_top_choices")
                {
                    if (++argIndex < args.Length && int.TryParse(args[argIndex], out int n))
                    {
                        numTopChoices = n;
                        argIndex++;
                    }
                }
                else if (args[argIndex] == "--verbose")
                {
                    verbose = true;
                    argIndex++;
                }
                else if (args[argIndex] == "--show_available_devices")
                {
                    showAvailableDevices = true;
                    argIndex++;
                }
                else if (args[argIndex] == "-h" || args[argIndex] == "--help")
                {
                    showHelp = true;
                    argIndex++;
                }
                else
                {
                    argIndex++;
                }
            }

            if (showHelp)
            {
                ShowHelp();
                return;
            }

            if (showAvailableDevices)
            {
                Console.WriteLine(string.Join(Environment.NewLine, PicoLLM.GetAvailableDevices()));
                return;
            }

            if (string.IsNullOrEmpty(accessKey))
            {
                throw new ArgumentNullException("access_key");
            }

            if (string.IsNullOrEmpty(modelPath))
            {
                throw new ArgumentNullException("modelPath");
            }

            if (!File.Exists(modelPath))
            {
                throw new ArgumentException($"Unable to find picoLLM model at {modelPath}");
            }

            if (string.IsNullOrEmpty(prompt))
            {
                throw new ArgumentNullException("prompt");
            }

            RunDemo(
                accessKey,
                modelPath,
                prompt,
                device,
                completionTokenLimit,
                stopPhrases,
                seed,
                presencePenalty,
                frequencyPenalty,
                temperature,
                topP,
                numTopChoices,
                verbose
            );
        }

        private static void OnUnhandledException(object sender, UnhandledExceptionEventArgs e)
        {
            Console.WriteLine(e.ExceptionObject.ToString());
            Environment.Exit(1);
        }

        private static void ShowHelp()
        {
            Console.WriteLine("Available options:");
            Console.WriteLine("--access_key                 AccessKey obtained from Picovoice Console (https://console.picovoice.ai/).");
            Console.WriteLine("--model_path                 Absolute path to the file containing LLM parameters (.pllm).");
            Console.WriteLine("--prompt                     Prompt string.");
            Console.WriteLine("--device                     String representation of the device (e.g., CPU or GPU) to use for inference. " +
                              "If set to `best`, picoLLM picks the most suitable device. If set to `gpu`, the engine uses " +
                              "the first available GPU device. To select a specific GPU device, set this argument to `gpu:${GPU_INDEX}`, " +
                              "where `${GPU_INDEX}` is the index of the target GPU. If set to `cpu`, the engine will run on the CPU " +
                              "with the default number of threads. To specify the number of threads, set this argument to `cpu:${NUM_THREADS}`, " +
                              "where `${NUM_THREADS}` is the desired number of threads.");
            Console.WriteLine("--completion_token_limit     Maximum number of tokens in the completion. Set to `None` to impose no limit.");
            Console.WriteLine("--stop_phrases               The generation process stops when it encounters any of these phrases in the completion. " +
                              "The already generated completion, including the encountered stop phrase, will be returned.");
            Console.WriteLine("--seed                       The internal random number generator uses it as its seed if set to a positive integer value. " +
                              "Seeding enforces deterministic outputs. Set to `None` for randomized responses.");
            Console.WriteLine("--presence_penalty           It penalizes logits already appearing in the partial completion if set to a positive value. " +
                              "If set to `0.0`, it has no effect.");
            Console.WriteLine("--frequency_penalty          If set to a positive floating-point value, it penalizes logits proportional to the frequency " +
                              "of their appearance in the partial completion. If set to `0.0`, it has no effect.");
            Console.WriteLine("--temperature                Sampling temperature. Temperature is a non-negative floating-point value that controls " +
                              "the randomness of the sampler. A higher temperature smoothens the samplers' output, increasing the randomness. " +
                              "In contrast, a lower temperature creates a narrower distribution and reduces variability. Setting it to `0` " +
                              "selects the maximum logit during sampling.");
            Console.WriteLine("--top_p                      A positive floating-point number within (0, 1]. It restricts the sampler's choices to " +
                              "high-probability logits that form the `top_p` portion of the probability mass. Hence, it avoids randomly selecting " +
                              "unlikely logits. A value of `1.` enables the sampler to pick any token with non-zero probability, turning off the feature.");
            Console.WriteLine("--num_top_choices            If set to a positive value, picoLLM returns the list of the highest probability tokens for any " +
                              "generated token. Set to `0` to turn off the feature.");
            Console.WriteLine("--verbose                    Prints the full set of completion data generated by picoLLM.");
            Console.WriteLine("--show_available_devices     Show the list of available devices for LLM inference.");
        }
    }
}