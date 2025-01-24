# picoLLM Inference Engine .NET Demos

Made in Vancouver, Canada by [Picovoice](https://picovoice.ai)

## picoLLM Inference Engine

picoLLM Inference Engine is a highly accurate and cross-platform SDK optimized for running compressed large language
models. picoLLM Inference Engine is:

- Accurate; picoLLM Compression improves GPTQ by [significant margins](https://picovoice.ai/blog/picollm-towards-optimal-llm-quantization/)
- Private; LLM inference runs 100% locally.
- Cross-Platform
- Runs on CPU and GPU
- Free for open-weight models

## Requirements

- .NET 8.0

## Compatibility

- Linux (x86_64)
- macOS (x86_64, arm64)
- Windows (x86_64)
- Raspberry Pi (4, 5)

## Installation

Both demos use [Microsoft's .NET 8.0](https://dotnet.microsoft.com/download).

Build with the dotnet CLI:

```console
dotnet build -c ChatDemo.Release
dotnet build -c CompletionDemo.Release
```

## AccessKey

AccessKey is your authentication and authorization token for deploying Picovoice SDKs, including picoLLM. Anyone who is
using Picovoice needs to have a valid AccessKey. You must keep your AccessKey secret. You would need internet
connectivity to validate your AccessKey with Picovoice license servers even though the LLM inference is running 100%
offline and completely free for open-weight models. Everyone who signs up for
[Picovoice Console](https://console.picovoice.ai/) receives a unique AccessKey.

## Usage

There are two demos available: completion and chat. The completion demo accepts a prompt and a set of optional
parameters and generates a single completion. It can run all models, whether instruction-tuned or not. The chat demo can
run instruction-tuned (chat) models such as `llama-3-8b-instruct`, `phi2`, etc. The chat demo enables a back-and-forth
conversation with the LLM, similar to ChatGPT.

NOTE: File path arguments must be absolute paths. The working directory for the following dotnet commands is:

```console
picollm/demo/dotnet/PicoLLMDemo
```

For both demos, you can use `--help/-h` to see the list of input arguements.

### Chat Demo

To run an instruction-tuned model for chat, run the following in the terminal:

```console
dotnet run -c ChatDemo.Release -- --access_key ${ACCESS_KEY} --model_path ${MODEL_PATH}
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console and `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console.

To get information about all the available options in the demo, run the following:

```console
dotnet run -c ChatDemo.Release -- --help
```

### Completion Demo

Run the demo by entering the following in the terminal:

```console
dotnet run -c CompletionDemo.Release -- --access_key ${ACCESS_KEY} --model_path ${MODEL_PATH} --prompt ${PROMPT}
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console, and `${PROMPT}` with a prompt string.

To get information about all the available options in the demo, run the following:

```console
dotnet run -c CompletionDemo.Release -- --help
```
