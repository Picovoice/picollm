# picoLLM Inference Engine .NET Binding

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

- [.NET 8.0](https://dotnet.microsoft.com/download)

## Compatibility

Platform compatible with .NET Framework 4.6.1+:

- Windows (x86_64)

Platforms compatible with .NET Core 2.0+:

- macOS (x86_64)
- Windows (x86_64)

Platform compatible with .NET 6.0+:

- Raspberry Pi (4 and 5)
- Linux (x86_64)
- macOS (arm64)
- Windows (arm64)

## Installation

You can install the latest version of picoLLM by getting the latest [picoLLM Nuget package](https://www.nuget.org/packages/PicoLLM/) <!-- markdown-link-check-disable-line -->
in Visual Studio or using the .NET CLI.

```console
dotnet add package PicoLLM
```

## Models

picoLLM Inference Engine supports a selection of open-weight models. The models are available from
[Picovoice Console](https://console.picovoice.ai/).

- Gemma
    - `gemma-2b`
    - `gemma-2b-it`
    - `gemma-7b`
    - `gemma-7b-it`
- Llama-2
    - `llama-2-7b`
    - `llama-2-7b-chat`
    - `llama-2-13b`
    - `llama-2-13b-chat`
    - `llama-2-70b`
    - `llama-2-70b-chat`
- Llama-3
    - `llama-3-8b`
    - `llama-3-8b-instruct`
    - `llama-3-70b`
    - `llama-3-70b-instruct`
- Llama-3.2
    - `llama3.2-1b-instruct`
    - `llama3.2-3b-instruct`
- Mistral
    - `mistral-7b-v0.1`
    - `mistral-7b-instruct-v0.1`
    - `mistral-7b-instruct-v0.2`
- Mixtral
    - `mixtral-8x7b-v0.1`
    - `mixtral-8x7b-instruct-v0.1`
- Phi-2
  - `phi2`
- Phi-3
  - `phi3`
- Phi-3.5
  - `phi3.5`

## AccessKey

AccessKey is your authentication and authorization token for deploying Picovoice SDKs, including picoLLM. Anyone who is
using Picovoice needs to have a valid AccessKey. You must keep your AccessKey secret. You would need internet
connectivity to validate your AccessKey with Picovoice license servers even though the LLM inference is running 100%
offline and completely free for open-weight models. Everyone who signs up for
[Picovoice Console](https://console.picovoice.ai/) receives a unique AccessKey.

## Usage

Create an instance of the engine and generate a prompt completion:

```csharp
using Pv;

PicoLLM pllm = PicoLLM.Create("${ACCESS_KEY}", "${MODEL_PATH}");

PicoLLMCompletion res = pllm.Generate('${PROMPT}');
Console.WriteLine(res.Completion);
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console, and `${PROMPT}` with a prompt string.

Instruction-tuned models (e.g., `llama-3-8b-instruct`, `llama-2-7b-chat`, and `gemma-2b-it`) have a specific chat
template. You can either directly format the prompt or use a dialog helper:

```csharp
dialog = pllm.GetDialog();
dialog.AddHumanRequest(prompt);

PicoLLMCompletion res = pllm.Generate(dialog.Prompt());
dialog.AddLLMResponse(res.Completion);
Console.WriteLine(res.Completion);
```

To interrupt completion generation before it has finished:
```csharp
pllm.Interrupt()
```

`PicoLLM` will have its resources freed by the garbage collector, but to have resources freed immediately after use,
wrap it in a using statement or call `.Dispose()` directly:

```csharp
using(PicoLLM pllm = PicoLLM.Create(accessKey, modelPath))
{
    // .. picoLLM usage here
}
```

## Demos

The [picoLLM dotnet demo project](https://github.com/Picovoice/picollm/tree/master/demo/dotnet) is a .NET application that provides command-line utilities for LLM completion and chat using picoLLM. <!-- markdown-link-check-disable-line -->
