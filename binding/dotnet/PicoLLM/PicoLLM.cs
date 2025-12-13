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
using System.Runtime.InteropServices;

namespace Pv
{
    /// <summary>
    /// Status codes returned by picoLLM library.
    /// </summary>
    public enum PvStatus
    {
        SUCCESS = 0,
        OUT_OF_MEMORY = 1,
        IO_ERROR = 2,
        INVALID_ARGUMENT = 3,
        STOP_ITERATION = 4,
        KEY_ERROR = 5,
        INVALID_STATE = 6,
        RUNTIME_ERROR = 7,
        ACTIVATION_ERROR = 8,
        ACTIVATION_LIMIT_REACHED = 9,
        ACTIVATION_THROTTLED = 10,
        ACTIVATION_REFUSED = 11
    }

    /// <summary>
    /// Represents usage information.
    /// </summary>
    public class PicoLLMUsage
    {
        /// <summary>
        /// Number of tokens in the prompt.
        /// </summary>
        public int PromptTokens { get; }

        /// <summary>
        /// Number of tokens in the completion.
        /// </summary>
        public int CompletionTokens { get; }

        /// <summary>
        /// Constructor for the Usage class.
        /// </summary>
        /// <param name="promptTokens">Number of tokens in the prompt.</param>
        /// <param name="completionTokens">Number of tokens in the completion.</param>
        public PicoLLMUsage(int promptTokens, int completionTokens)
        {
            PromptTokens = promptTokens;
            CompletionTokens = completionTokens;
        }

        public override string ToString()
        {
            return $"usage: {{\n    prompt: {PromptTokens},\n    completion: {CompletionTokens},\n}}";
        }
    }

    /// <summary>
    /// Represents reasons for ending the generation process.
    /// </summary>
    public enum PicoLLMEndpoint
    {
        END_OF_SENTENCE = 0,
        COMPLETION_TOKEN_LIMIT_REACHED = 1,
        STOP_PHRASE_ENCOUNTERED = 2,
        INTERRUPTED = 3
    }

    /// <summary>
    /// Represents a generated token.
    /// </summary>
    public class PicoLLMToken
    {
        /// <summary>
        /// The token.
        /// </summary>
        public string Token { get; }

        /// <summary>
        /// The log probability.
        /// </summary>
        public float LogProb { get; }

        /// <summary>
        /// Constructor for the Token class.
        /// </summary>
        /// <param name="token">The token.</param>
        /// <param name="logProb">The log probability.</param>
        public PicoLLMToken(string token, float logProb)
        {
            Token = token;
            LogProb = logProb;
        }
    }

    /// <summary>
    /// Represents a generated token within completion and top alternative tokens.
    /// </summary>
    public class PicoLLMCompletionToken
    {
        /// <summary>
        /// The token.
        /// </summary>
        public PicoLLMToken Token { get; }

        /// <summary>
        /// Top alternative tokens.
        /// </summary>
        public PicoLLMToken[] TopChoices { get; }

        /// <summary>
        /// Constructor for the CompletionToken class.
        /// </summary>
        /// <param name="token">The token.</param>
        /// <param name="topChoices">Top alternative tokens.</param>
        public PicoLLMCompletionToken(PicoLLMToken token, PicoLLMToken[] topChoices)
        {
            Token = token;
            TopChoices = topChoices;
        }

        public override string ToString()
        {
            if (TopChoices.Length == 0)
            {
                return $"{{\n            " +
                    $"token: '{Token.Token}',\n            " +
                    $"log-prob: {Token.LogProb:F2},\n        }}";
            }
            else
            {
                string topChoicesString = string.Join(
                    ",\n",
                    TopChoices.Select(tc => $"                {{\n                    " +
                        $"token: '{tc.Token}',\n                    " +
                        $"log-prob: {tc.LogProb:F2},\n                }}"));
                return $"{{\n            " +
                    $"token: '{Token.Token}',\n            " +
                    $"log-prob: {Token.LogProb:F2},\n            " +
                    $"top-choices: [\n{topChoicesString}\n            " +
                    $"]\n        }}";
            }
        }
    }

    /// <summary>
    /// Represents a picoLLM completion result.
    /// </summary>
    public class PicoLLMCompletion
    {
        /// <summary>
        /// Usage information.
        /// </summary>
        public PicoLLMUsage Usage { get; }

        /// <summary>
        /// Reason for ending the generation process.
        /// </summary>
        public PicoLLMEndpoint Endpoint { get; }

        /// <summary>
        /// Generated tokens within completion and top alternative tokens.
        /// </summary>
        public PicoLLMCompletionToken[] CompletionTokens { get; }

        /// <summary>
        /// Completion string.
        /// </summary>
        public string Completion { get; }

        /// <summary>
        /// Constructor for the PicoLLMCompletion class.
        /// </summary>
        /// <param name="usage">Usage information.</param>
        /// <param name="endpoint">Reason for ending the generation process.</param>
        /// <param name="completionTokens">Generated tokens within completion and top alternative tokens.</param>
        /// <param name="completion">Completion string.</param>
        public PicoLLMCompletion(
            PicoLLMUsage usage,
            PicoLLMEndpoint endpoint,
            PicoLLMCompletionToken[] completionTokens,
            string completion)
        {
            Usage = usage;
            Endpoint = endpoint;
            CompletionTokens = completionTokens;
            Completion = completion;
        }

        public override string ToString()
        {
            string ShiftRight(string s, int n)
            {
                string space = new string(' ', n);
                return string.Join("\n", s.Split('\n').Select(x => $"{space}{x}"));
            }

            string completionTokensString = string.Join(",\n", CompletionTokens.Select(ct => $"        {ct}"));

            return $"{{\n{ShiftRight(Usage.ToString(), 4)},\n    " +
                $"endpoint: {Endpoint.ToString()},\n    " +
                $"completion-tokens: [\n{completionTokensString}\n    " +
                $"],\n    completion: '{Completion}'\n}}";
        }
    }

    /// <summary>
    /// .NET binding for picoLLM Inference Engine.
    /// </summary>
    public class PicoLLM : IDisposable
    {
        private const string LIBRARY = "libpv_picollm";
        private IntPtr _libraryPointer = IntPtr.Zero;

        private delegate void PicoLLMStreamCallbackDelegate(IntPtr token, IntPtr userData);
        private PicoLLMStreamCallbackDelegate _streamCallbackDelegate;
        private Action<string> _streamCallback;

        static PicoLLM()
        {

#if NET6_0_OR_GREATER

            NativeLibrary.SetDllImportResolver(typeof(PicoLLM).Assembly, ImportResolver);

#endif

        }

#if NET6_0_OR_GREATER

        private static IntPtr ImportResolver(string libraryName, Assembly assembly, DllImportSearchPath? searchPath)
        {

#pragma warning disable IDE0058
#pragma warning disable IDE0059

            IntPtr libHandle = IntPtr.Zero;
            NativeLibrary.TryLoad(Utils.PvLibraryPath(libraryName), out libHandle);
            return libHandle;
        }

#pragma warning restore IDE0059
#pragma warning restore IDE0058

#endif

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern PvStatus pv_picollm_init(
            IntPtr accessKey,
            IntPtr modelPath,
            IntPtr device,
            out IntPtr handle);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern void pv_picollm_delete(IntPtr handle);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern PvStatus pv_picollm_generate(
            IntPtr handle,
            IntPtr prompt,
            int completionTokenLimit,
            IntPtr[] stopPhrases,
            int numStopPhrases,
            int seed,
            float presencePenalty,
            float frequencyPenalty,
            float temperature,
            float topP,
            int numTopChoices,
            IntPtr streamCallback,
            IntPtr streamCallbackContext,
            out CPicoLLMUsage usage,
            out PicoLLMEndpoint endpoint,
            out IntPtr completionTokens,
            out int numCompletionTokens,
            out IntPtr completion);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern PvStatus pv_picollm_interrupt(IntPtr handle);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern void pv_picollm_delete_completion_tokens(
            IntPtr completionTokens,
            int numCompletionTokens);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern void pv_picollm_delete_completion(IntPtr completion);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern PvStatus pv_picollm_tokenize(
            IntPtr handle,
            IntPtr text,
            bool bos,
            bool eos,
            out int numTokens,
            out IntPtr tokens);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern void pv_picollm_delete_tokens(IntPtr tokens);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern PvStatus pv_picollm_forward(
            IntPtr handle,
            int text,
            out int numLogits,
            out IntPtr logits);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern void pv_picollm_delete_logits(IntPtr logits);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern PvStatus pv_picollm_reset(IntPtr handle);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern PvStatus pv_picollm_model(IntPtr handle, out IntPtr model);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern PvStatus pv_picollm_context_length(IntPtr handle, out int contextLength);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern IntPtr pv_picollm_version();

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern int pv_picollm_max_top_choices();

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern PvStatus pv_picollm_list_hardware_devices(
            out IntPtr hardwareDevices,
            out int numHardwareDevices);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern void pv_picollm_free_hardware_devices(
            IntPtr hardwareDevices,
            int numHardwareDevices);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern void pv_set_sdk(string sdk);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern PvStatus pv_get_error_stack(out IntPtr messageStack, out int messageStackDepth);

        [DllImport(LIBRARY, CallingConvention = CallingConvention.Cdecl)]
        private static extern void pv_free_error_stack(IntPtr messageStack);

        /// <summary>
        /// C Struct for storing usage information.
        /// </summary>
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
        private struct CPicoLLMUsage
        {
            public readonly int promptTokens;
            public readonly int completionTokens;
        }

        /// <summary>
        /// C Struct for storing generated token and its log probability.
        /// </summary>
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
        private struct CPicoLLMToken
        {
            public readonly IntPtr tokenPtr;
            public readonly float logProb;
        }

        /// <summary>
        /// C Struct for storing generated token within completion and top alternative tokens.
        /// </summary>
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
        private struct CPicoLLMCompletionToken
        {
            public readonly CPicoLLMToken token;
            public readonly int numTopChoices;
            public readonly IntPtr topChoicesPtr;
        }


        /// <summary>
        /// Gets the name of the picoLLM model.
        /// </summary>
        /// <returns>Name of the picoLLM model.</returns>
        public string Model { get; private set; }

        /// <summary>
        /// Gets the model's context length.
        /// </summary>
        /// <returns>Model's context length.</returns>
        public int ContextLength { get; private set; }

        /// <summary>
        /// Gets the version number of the picoLLM library.
        /// </summary>
        /// <returns>Version of picoLLM</returns>
        public string Version { get; private set; }

        /// <summary>
        /// Gets the maximum number of top choices for picoLLM `Generate()`.
        /// </summary>
        /// <returns>Maximum number of top choices for picoLLM `Generate()`.</returns>
        public int MaxTopChoices { get; private set; }

        /// <summary>
        /// Creates an instance of the picoLLM Inference Engine.
        /// </summary>
        /// <param name="accessKey">AccessKey obtained from Picovoice Console (https://console.picovoice.ai/).</param>
        /// <param name="modelPath">Absolute path to the file containing LLM parameters (`.pllm`).</param>
        /// <param name="device">
        /// String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`, picoLLM
        /// picks the most suitable device.If set to `gpu`, the engine uses the first available GPU device.To select a specific
        /// GPU device, set this argument to `gpu:${ GPU_INDEX}`, where `${GPU_INDEX}` is the index of the target GPU.If set to
        /// `cpu`, the engine will run on the CPU with the default number of threads.To specify the number of threads, set this
        /// argument to `cpu:${ NUM_THREADS}`, where `${NUM_THREADS}` is the desired number of threads.
        /// </param>
        /// <exception cref="PicoLLMException">Thrown when an error occurs during the init process.</exception>
        public static PicoLLM Create(
            string accessKey,
            string modelPath,
            string device = null)
        {
            return new PicoLLM(
                accessKey,
                modelPath,
                device ?? "best");
        }

        /// <summary>
        /// Creates an instance of the picoLLM Inference Engine.
        /// </summary>
        /// <param name="accessKey">AccessKey obtained from Picovoice Console (https://console.picovoice.ai/).</param>
        /// <param name="modelPath">Absolute path to the file containing LLM parameters (`.pllm`).</param>
        /// <param name="device">
        /// String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`, picoLLM
        /// picks the most suitable device.If set to `gpu`, the engine uses the first available GPU device.To select a specific
        /// GPU device, set this argument to `gpu:${ GPU_INDEX}`, where `${GPU_INDEX}` is the index of the target GPU.If set to
        /// `cpu`, the engine will run on the CPU with the default number of threads.To specify the number of threads, set this
        /// argument to `cpu:${ NUM_THREADS}`, where `${NUM_THREADS}` is the desired number of threads.
        /// </param>
        /// <exception cref="PicoLLMException">Thrown when an error occurs during the init process.</exception>
        private PicoLLM(
            string accessKey,
            string modelPath,
            string device)
        {
            if (string.IsNullOrEmpty(accessKey))
            {
                throw new PicoLLMInvalidArgumentException("No AccessKey provided to picoLLM");
            }

            if (string.IsNullOrEmpty(modelPath))
            {
                throw new PicoLLMInvalidArgumentException("No model path provided to picoLLM");
            }

            if (!File.Exists(modelPath))
            {
                throw new PicoLLMIOException($"Couldn't find model file at '{modelPath}'");
            }

            IntPtr accessKeyPtr = Utils.GetPtrFromUtf8String(accessKey);
            IntPtr modelPathPtr = Utils.GetPtrFromUtf8String(modelPath);
            IntPtr devicePtr = Utils.GetPtrFromUtf8String(device);

            pv_set_sdk("dotnet");

            PvStatus status = pv_picollm_init(
                accessKeyPtr,
                modelPathPtr,
                devicePtr,
                out _libraryPointer);

            Marshal.FreeHGlobal(accessKeyPtr);
            Marshal.FreeHGlobal(modelPathPtr);
            Marshal.FreeHGlobal(devicePtr);

            if (status != PvStatus.SUCCESS)
            {
                throw PvStatusToException(
                    status,
                    "picoLLM init failed",
                    GetMessageStack());
            }

            IntPtr modelPtr;
            status = pv_picollm_model(_libraryPointer, out modelPtr);
            if (status != PvStatus.SUCCESS)
            {
                throw PvStatusToException(
                    status,
                    "Failed to get model",
                    GetMessageStack());
            }
            Model = Utils.GetUtf8StringFromPtr(modelPtr);

            int contextLength;
            status = pv_picollm_context_length(_libraryPointer, out contextLength);
            if (status != PvStatus.SUCCESS)
            {
                throw PvStatusToException(
                    status,
                    "Failed to get context length",
                    GetMessageStack());
            }
            ContextLength = contextLength;

            Version = Utils.GetUtf8StringFromPtr(pv_picollm_version());
            MaxTopChoices = pv_picollm_max_top_choices();
            _streamCallbackDelegate = new PicoLLMStreamCallbackDelegate(StreamCallbackWrapper);
        }

        /// <summary>
        /// Generates a completion text and relevant metadata based on the given prompt and generation parameters.
        /// </summary>
        /// <param name="prompt">The input text prompt.</param>
        /// <param name="completionTokenLimit">
        /// The maximum number of tokens in the completion. If the generation process stops due to reaching this limit,
        /// the `Endpoint` result will be set to `PicoLLMEndpoint.COMPLETION_TOKEN_LIMIT_REACHED`.
        /// Set to `null` to impose no limit.
        /// </param>
        /// <param name="stopPhrases">
        /// A set of phrases that, when encountered in the completion, will stop the generation process.
        /// The generated completion, including the encountered stop phrase, will be returned,
        /// and the `Endpoint` result will be set to `PicoLLMEndpoint.STOP_PHRASE_ENCOUNTERED`.
        /// Set to `null` to disable this feature.
        /// </param>
        /// <param name="seed">
        /// A positive integer value to use as the seed for the internal random number generator, enforcing deterministic outputs.
        /// Set to `null` for randomized outputs for the given prompt.
        /// </param>
        /// <param name="presencePenalty">
        /// A positive value that penalizes logits that have already appeared in the partial completion.
        /// If set to `0.0`, it has no effect.
        /// </param>
        /// <param name="frequencyPenalty">
        /// A positive floating-point value that penalizes logits proportional to the frequency of their appearance in the partial completion.
        /// If set to `0.0`, it has no effect.
        /// </param>
        /// <param name="temperature">
        /// The sampling temperature, a non-negative floating-point value that controls the randomness of the sampler.
        /// A higher temperature increases randomness, while a lower temperature reduces variability by creating a narrower distribution.
        /// Setting it to `0` selects the maximum logit during sampling.
        /// </param>
        /// <param name="topP">
        /// A positive floating-point number within (0, 1] that restricts the sampler's choices to high-probability logits
        /// forming the top portion of the probability mass. A value of `1.0` allows the sampler to pick any token with non-zero probability, disabling this feature.
        /// </param>
        /// <param name="numTopChoices">
        /// The number of highest probability tokens to return for any generated token. Set to `0` to disable this feature.
        /// </param>
        /// <param name="streamCallback">
        /// A callback action that is executed every time a new piece of completion string becomes available.
        /// Set to `null` to disable this feature.
        /// </param>
        /// <returns>A `PicoLLMCompletion` object containing stats and generated tokens.</returns>
        /// <exception cref="PicoLLMException">Thrown when an error occurs during the completion generation process.</exception>

        public PicoLLMCompletion Generate(
            string prompt,
            int? completionTokenLimit = null,
            string[] stopPhrases = null,
            int? seed = null,
            float presencePenalty = 0,
            float frequencyPenalty = 0,
            float temperature = 0,
            float topP = 1,
            int numTopChoices = 0,
            Action<string> streamCallback = null)
        {
            IntPtr promptPtr = Utils.GetPtrFromUtf8String(prompt);

            IntPtr[] stopPhrasesPtr = null;
            int numStopPhrases = 0;
            if (stopPhrases != null && stopPhrases.Length > 0)
            {
                numStopPhrases = stopPhrases.Length;
                stopPhrasesPtr = new IntPtr[stopPhrases.Length];
                for (int i = 0; i < stopPhrases.Length; i++)
                {
                    stopPhrasesPtr[i] = Utils.GetPtrFromUtf8String(stopPhrases[i]);
                }
            }

            _streamCallback = streamCallback;

            IntPtr streamCallbackPtr = Marshal.GetFunctionPointerForDelegate(_streamCallbackDelegate);

            CPicoLLMUsage cUsage;
            PicoLLMEndpoint endpoint;
            IntPtr completionTokensPtr;
            int numCompletionTokens;
            IntPtr completionPtr;
            PvStatus status = pv_picollm_generate(
               _libraryPointer,
               promptPtr,
               completionTokenLimit ?? -1,
               stopPhrasesPtr,
               numStopPhrases,
               seed ?? -1,
               presencePenalty,
               frequencyPenalty,
               temperature,
               topP,
               numTopChoices,
               streamCallbackPtr,
               IntPtr.Zero,
               out cUsage,
               out endpoint,
               out completionTokensPtr,
               out numCompletionTokens,
               out completionPtr);

            Marshal.FreeHGlobal(promptPtr);
            for (int i = 0; i < numStopPhrases; i++)
            {
                Marshal.FreeHGlobal(stopPhrasesPtr[i]);
            }

            if (status != PvStatus.SUCCESS)
            {
                throw PvStatusToException(
                    status,
                    "picoLLM generate failed",
                    GetMessageStack());
            }

            PicoLLMUsage usage = new PicoLLMUsage(cUsage.promptTokens, cUsage.completionTokens);

            PicoLLMCompletionToken[] completionTokens = new PicoLLMCompletionToken[numCompletionTokens];
            for (int i = 0; i < numCompletionTokens; i++)
            {
                CPicoLLMCompletionToken cCompletionToken = (CPicoLLMCompletionToken)Marshal.PtrToStructure(
                    completionTokensPtr + (i * Marshal.SizeOf(typeof(CPicoLLMCompletionToken))),
                    typeof(CPicoLLMCompletionToken));

                PicoLLMToken[] topChoices = new PicoLLMToken[cCompletionToken.numTopChoices];
                for (int j = 0; j < cCompletionToken.numTopChoices; j++)
                {
                    CPicoLLMToken cTopChoiceToken = (CPicoLLMToken)Marshal.PtrToStructure(
                        cCompletionToken.topChoicesPtr + (j * Marshal.SizeOf(typeof(CPicoLLMToken))),
                        typeof(CPicoLLMToken));
                    topChoices[j] = new PicoLLMToken(
                        Utils.GetUtf8StringFromPtr(cTopChoiceToken.tokenPtr),
                        cTopChoiceToken.logProb);
                }

                PicoLLMToken token = new PicoLLMToken(
                    Utils.GetUtf8StringFromPtr(cCompletionToken.token.tokenPtr),
                    cCompletionToken.token.logProb);
                completionTokens[i] = new PicoLLMCompletionToken(token, topChoices);
            }

            string completion = Utils.GetUtf8StringFromPtr(completionPtr);

            pv_picollm_delete_completion_tokens(completionTokensPtr, numCompletionTokens);
            pv_picollm_delete_completion(completionPtr);

            return new PicoLLMCompletion(
                usage,
                endpoint,
                completionTokens,
                completion);
        }

        /// <summary>
        /// Interrupts `Generate()` if generation is in progress. Otherwise, it has no effect.
        /// </summary>
        /// <exception cref="PicoLLMException">Thrown when an error occurs during the interrupt operation.</exception>

        public void Interrupt()
        {
            PvStatus status = pv_picollm_interrupt(_libraryPointer);
            if (status != PvStatus.SUCCESS)
            {
                throw PvStatusToException(
                    status,
                    "picoLLM interrupt failed",
                    GetMessageStack());
            }
        }

        /// <summary>
        /// Tokenizes a given text using the model's tokenizer.
        /// This is a low-level function intended for benchmarking and advanced usage.
        /// Use `Generate()` when possible.
        /// </summary>
        /// <param name="text">The input text to be tokenized.</param>
        /// <param name="bos">
        /// A boolean value indicating whether to prepend the beginning-of-sentence token to the result.
        /// Set to `true` to include the beginning-of-sentence token.
        /// </param>
        /// <param name="eos">
        /// A boolean value indicating whether to append the end-of-sentence token to the result.
        /// Set to `true` to include the end-of-sentence token.
        /// </param>
        /// <returns>A list of tokens representing the input text.</returns>
        /// <exception cref="PicoLLMException">Thrown when an error occurs during tokenization.</exception>
        public int[] Tokenize(
            string text,
            bool bos,
            bool eos)
        {
            IntPtr textPtr = Utils.GetPtrFromUtf8String(text);

            int numTokens;
            IntPtr cTokens;
            PvStatus status = pv_picollm_tokenize(
               _libraryPointer,
               textPtr,
               bos,
               eos,
               out numTokens,
               out cTokens);

            Marshal.FreeHGlobal(textPtr);

            if (status != PvStatus.SUCCESS)
            {
                throw PvStatusToException(
                    status,
                    "picoLLM tokenize failed",
                    GetMessageStack());
            }

            int[] tokens = new int[numTokens];
            Marshal.Copy(cTokens, tokens, 0, numTokens);
            pv_picollm_delete_tokens(cTokens);

            return tokens;
        }

        /// <summary>
        /// Performs a single forward pass given an input token and returns the logits.
        /// This is a low-level function intended for benchmarking and advanced usage.
        /// Use `Generate()` when possible.
        /// </summary>
        /// <param name="token">The input token for the forward pass.</param>
        /// <returns>The logits resulting from the forward pass.</returns>
        /// <exception cref="PicoLLMException">Thrown when an error occurs during the forward pass.</exception>
        public float[] Forward(int token)
        {
            int numLogits;
            IntPtr cLogits;
            PvStatus status = pv_picollm_forward(
               _libraryPointer,
               token,
               out numLogits,
               out cLogits);

            if (status != PvStatus.SUCCESS)
            {
                throw PvStatusToException(
                    status,
                    "picoLLM forward failed",
                    GetMessageStack());
            }

            float[] logits = new float[numLogits];
            Marshal.Copy(cLogits, logits, 0, numLogits);
            pv_picollm_delete_logits(cLogits);

            return logits;
        }

        /// <summary>
        /// Resets the internal state of the LLM. This should be called in conjunction with `Forward()`
        /// when processing a new sequence of tokens.
        /// This is a low-level function intended for benchmarking and advanced usage.
        /// Use `Generate()` when possible.
        /// </summary>
        /// <exception cref="PicoLLMException">Thrown when an error occurs during the reset operation.</exception>

        public void Reset()
        {
            PvStatus status = pv_picollm_reset(_libraryPointer);
            if (status != PvStatus.SUCCESS)
            {
                throw PvStatusToException(
                    status,
                    "picoLLM reset failed",
                    GetMessageStack());
            }
        }

        /// <summary>
        /// Retrieves a list of hardware devices that can be specified when constructing the model.
        /// </summary>
        /// <returns>An array of available hardware devices.</returns>
        /// <exception cref="PicoLLMException">Thrown when an error occurs while retrieving the hardware devices.</exception>
        public static string[] GetAvailableDevices()
        {
            IntPtr hardwareDevicesPtr;
            int numDevices;
            PvStatus status = pv_picollm_list_hardware_devices(
                out hardwareDevicesPtr,
                out numDevices);
            if (status != PvStatus.SUCCESS)
            {
                throw PvStatusToException(
                    status,
                    "Get available devices failed",
                    GetMessageStack());
            }

            string[] devices = new string[numDevices];
            int elementSize = Marshal.SizeOf(typeof(IntPtr));
            for (int i = 0; i < numDevices; i++)
            {
                devices[i] = Utils.GetUtf8StringFromPtr(Marshal.ReadIntPtr(hardwareDevicesPtr, i * elementSize));
            }

            pv_picollm_free_hardware_devices(hardwareDevicesPtr, numDevices);
            return devices;
        }

        private static readonly Dictionary<string, Type> dialogs = new Dictionary<string, Type>
        {
            { "gemma-2b-it", typeof(GemmaChatDialog) },
            { "gemma-7b-it", typeof(GemmaChatDialog) },
            { "llama-2-7b-chat", typeof(Llama2ChatDialog) },
            { "llama-2-13b-chat", typeof(Llama2ChatDialog) },
            { "llama-2-70b-chat", typeof(Llama2ChatDialog) },
            { "llama-3-8b-instruct", typeof(Llama3ChatDialog) },
            { "llama-3-70b-instruct", typeof(Llama3ChatDialog) },
            { "llama-3.2-1b-instruct", typeof(Llama32ChatDialog) },
            { "llama-3.2-3b-instruct", typeof(Llama32ChatDialog) },
            { "mistral-7b-instruct-v0.1", typeof(MistralChatDialog) },
            { "mistral-7b-instruct-v0.2", typeof(MistralChatDialog) },
            { "mixtral-8x7b-instruct-v0.1", typeof(MixtralChatDialog) },
            { "phi3", typeof(Phi3ChatDialog) },
            { "phi3.5", typeof(Phi35ChatDialog) }
        };

        private static readonly Dictionary<string, Type> phi2Dialogs = new Dictionary<string, Type>
        {
            { "default", typeof(Phi2QADialog) },
            { "qa", typeof(Phi2QADialog) },
            { "chat", typeof(Phi2ChatDialog) }
        };

        /// <summary>
        /// Return the Dialog object corresponding to the loaded model.
        /// </summary>
        /// <param name="mode">Mode for models like `phi-2` (e.g., `qa` or `chat`).</param>
        /// <param name="history">The number of latest back-and-forths to include in the prompt.</param>
        /// <param name="system">System instruction to embed in the prompt.</param>
        /// <returns>Instance of PicoLLMDialog.</returns>
        /// <exception cref="PicoLLMInvalidArgumentException">Throws if model or mode is invalid.</exception>
        public PicoLLMDialog GetDialog(
            string mode = null,
            int? history = 0,
            string system = null)
        {
            string modelKey = Model.Split(' ')[0].ToLower();

            Type dialogType;
            if (dialogs.TryGetValue(modelKey, out dialogType))
            {
                return (PicoLLMDialog)Activator.CreateInstance(dialogType, new object[] { history, system });
            }
            else if (modelKey == "phi2")
            {
                string modeKey = mode ?? "default";
                Type phi2DialogType;
                if (!phi2Dialogs.TryGetValue(modeKey, out phi2DialogType))
                {
                    throw new PicoLLMInvalidArgumentException($"`{modelKey}` does not have a corresponding mode `{modeKey}`");
                }

                return (PicoLLMDialog)Activator.CreateInstance(phi2DialogType, new object[] { history, system });
            }

            throw new PicoLLMInvalidArgumentException($"`{modelKey}` does not have a corresponding dialog or is not instruction-tuned");
        }

        /// <summary>
        /// Coverts status codes to relevant .NET exceptions
        /// </summary>
        /// <param name="status">Picovoice library status code.</param>
        /// <param name="message">Default error message.</param>
        /// <param name="messageStack">Error stack returned from Picovoice library.</param>
        /// <returns>.NET exception</returns>
        private static PicoLLMException PvStatusToException(
            PvStatus status,
            string message = "",
            string[] messageStack = null)
        {
            if (messageStack == null)
            {
                messageStack = new string[] { };
            }

            switch (status)
            {
                case PvStatus.OUT_OF_MEMORY:
                    return new PicoLLMMemoryException(message, messageStack);
                case PvStatus.IO_ERROR:
                    return new PicoLLMIOException(message, messageStack);
                case PvStatus.INVALID_ARGUMENT:
                    return new PicoLLMInvalidArgumentException(message, messageStack);
                case PvStatus.STOP_ITERATION:
                    return new PicoLLMStopIterationException(message, messageStack);
                case PvStatus.KEY_ERROR:
                    return new PicoLLMKeyException(message, messageStack);
                case PvStatus.INVALID_STATE:
                    return new PicoLLMInvalidStateException(message, messageStack);
                case PvStatus.RUNTIME_ERROR:
                    return new PicoLLMRuntimeException(message, messageStack);
                case PvStatus.ACTIVATION_ERROR:
                    return new PicoLLMActivationException(message, messageStack);
                case PvStatus.ACTIVATION_LIMIT_REACHED:
                    return new PicoLLMActivationLimitException(message, messageStack);
                case PvStatus.ACTIVATION_THROTTLED:
                    return new PicoLLMActivationThrottledException(message, messageStack);
                case PvStatus.ACTIVATION_REFUSED:
                    return new PicoLLMActivationRefusedException(message, messageStack);
                default:
                    return new PicoLLMException("Unmapped error code returned from picoLLM.", messageStack);
            }
        }

        /// <summary>
        /// Frees memory that was allocated for picoLLM
        /// </summary>
        public void Dispose()
        {
            if (_libraryPointer != IntPtr.Zero)
            {
                pv_picollm_delete(_libraryPointer);
                _libraryPointer = IntPtr.Zero;
                _streamCallback = null;

                // ensures finalizer doesn't trigger if already manually disposed
                GC.SuppressFinalize(this);
            }
        }

        ~PicoLLM()
        {
            Dispose();
        }

        private void StreamCallbackWrapper(IntPtr token, IntPtr userData)
        {
            if (_streamCallback != null)
            {
                _streamCallback.Invoke(Utils.GetUtf8StringFromPtr(token));
            }
        }

        private static string[] GetMessageStack()
        {
            int messageStackDepth;
            IntPtr messageStackRef;

            PvStatus status = pv_get_error_stack(out messageStackRef, out messageStackDepth);
            if (status != PvStatus.SUCCESS)
            {
                throw PvStatusToException(status, "Unable to get picoLLM error state");
            }

            int elementSize = Marshal.SizeOf(typeof(IntPtr));
            string[] messageStack = new string[messageStackDepth];

            for (int i = 0; i < messageStackDepth; i++)
            {
                messageStack[i] = Utils.GetUtf8StringFromPtr(Marshal.ReadIntPtr(messageStackRef, i * elementSize));
            }

            pv_free_error_stack(messageStackRef);

            return messageStack;
        }
    }
}