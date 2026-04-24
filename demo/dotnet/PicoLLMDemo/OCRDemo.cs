/*
    Copyright 2026 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
    file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
    an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

using Pv;

using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace PicoLLMDemo
{
    public class OCRDemo
    {
        public static void RunDemo(
            string accessKey,
            string modelPath,
            PicoLLMImage image,
            string device,
            int completionTokenLimit,
            bool verbose)
        {
            using (PicoLLM picoLLM = PicoLLM.Create(accessKey, modelPath, device))
            {
                Console.WriteLine($"picoLLM `{picoLLM.Version}`");
                Console.WriteLine($"Loaded `{picoLLM.Model}`\n");

                Console.Write("Processing Image ...");
                Console.Out.Flush();

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

                int numTokensGenerated = 0;
                double generateStartSec = 0.0;

                Action<string> streamCallback = (string token) =>
                {
                    if (generateStartSec == 0.0)
                    {
                        generateStartSec = DateTime.Now.TimeOfDay.TotalSeconds;
                    }

                    if (!isInterrupt)
                    {
                        Console.Write(token);
                        Console.Out.Flush();
                    }

                    numTokensGenerated += 1;
                };

                Action<float> promptProgressCallback = (float progress) =>
                {
                    int bufferWidth = 40;
                    if (Environment.UserInteractive && !Console.IsOutputRedirected)
                    {
                        bufferWidth = Console.BufferWidth;
                    }

                    int barWidth = Math.Max(10,
                                            bufferWidth
                                            - new string("Processing Image [").Length
                                            - new string("] 100.0%").Length
                                            - 1);

                    int currentRow = Console.CursorTop;

                    int filledLen = (int)((progress / 100.0f) * (float)barWidth);

                    Console.SetCursorPosition(0, currentRow);
                    Console.Write(new string(' ', bufferWidth));
                    Console.SetCursorPosition(0, currentRow);

                    Console.Write("Processing Image [");
                    for (int i = 0; i < barWidth; i++)
                    {
                        Console.Write(i < filledLen ? "#" : " ");
                    }

                    if (progress >= 100.0f)
                    {
                        Console.Write($"] {progress:F1}% Complete");
                        Console.Write("\n\n");
                        Console.Write("Generating... (press `Space` to interrupt)\n\n");
                        return;
                    }
                    else
                    {
                        Console.Write($"] {progress:F1}%");
                    }

                    Console.Out.Flush();
                };

                double startSec = DateTime.Now.TimeOfDay.TotalSeconds;
                completion = picoLLM.GenerateOCR(
                    image.Width,
                    image.Height,
                    image.Pixels,
                    completionTokenLimit,
                    streamCallback,
                    promptProgressCallback);

                interruptKeyTask.Wait();

                if (verbose)
                {
                    Console.WriteLine($"Completion: \n\n{completion}");
                }

                double generateElapsedSec = DateTime.Now.TimeOfDay.TotalSeconds - generateStartSec;
                double totalElapsedSec = DateTime.Now.TimeOfDay.TotalSeconds - startSec;
                double imageElapsedSec = totalElapsedSec - generateElapsedSec;

                double generateTPS = numTokensGenerated / generateElapsedSec;

                Console.WriteLine("\n");
                Console.WriteLine($"Processed Image in {imageElapsedSec:F2} seconds");
                Console.WriteLine($"Generated result in {generateElapsedSec:F2} seconds ({generateTPS:F2} tokens per second)");
                Console.WriteLine($"Total time elapsed is {totalElapsedSec:F2} seconds");
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
            string imagePath = null;
            string device = null;
            int completionTokenLimit = 128;
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
                else if (args[argIndex] == "--image_path")
                {
                    if (++argIndex < args.Length)
                    {
                        imagePath = args[argIndex++];
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

            if (string.IsNullOrEmpty(imagePath))
            {
                throw new ArgumentNullException("imagePath");
            }

            if (!File.Exists(modelPath))
            {
                throw new ArgumentException($"Unable to find picoLLM model at {modelPath}");
            }

            if (!File.Exists(imagePath))
            {
                throw new ArgumentException($"Unable to find image at {imagePath}");
            }

            PicoLLMImage image = LoadImageAbsolutePath(imagePath);

            RunDemo(
                accessKey,
                modelPath,
                image,
                device,
                completionTokenLimit,
                verbose
            );
        }

        /// <summary>
        /// Represents an RGB image.
        /// </summary>
        public class PicoLLMImage
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

        private static PicoLLMImage LoadImageAbsolutePath(string absolutePath)
        {
            byte[] fileBytes = File.ReadAllBytes(absolutePath);
            using (Image<Rgb24> image = Image.Load<Rgb24>(fileBytes))
            {
                byte[] imageBytes = new byte[image.Width * image.Height * Unsafe.SizeOf<Rgb24>()];
                image.CopyPixelDataTo(imageBytes);

                return new PicoLLMImage(image.Width, image.Height, imageBytes);
            }
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
            Console.WriteLine("--image_path                 Absolute path to the image file to perform OCR on.");
            Console.WriteLine("--device                     String representation of the device (e.g., CPU or GPU) to use for inference. " +
                              "If set to `best`, picoLLM picks the most suitable device. If set to `gpu`, the engine uses " +
                              "the first available GPU device. To select a specific GPU device, set this argument to `gpu:${GPU_INDEX}`, " +
                              "where `${GPU_INDEX}` is the index of the target GPU. If set to `cpu`, the engine will run on the CPU " +
                              "with the default number of threads. To specify the number of threads, set this argument to `cpu:${NUM_THREADS}`, " +
                              "where `${NUM_THREADS}` is the desired number of threads.");
            Console.WriteLine("--completion_token_limit     Maximum number of tokens in the completion. Set to `None` to impose no limit.");
            Console.WriteLine("--verbose                    Prints the full set of completion data generated by picoLLM.");
            Console.WriteLine("--show_available_devices     Show the list of available devices for LLM inference.");
        }
    }
}