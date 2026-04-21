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

- [.NET 8.0](https://dotnet.microsoft.com/download)

## Compatibility

- Linux (x86_64)
- macOS (x86_64, arm64)
- Windows (x86_64, arm64)
- Raspberry Pi (3, 4, 5)

## Models

picoLLM Inference Engine supports the following open-weight models. The models are on
[Picovoice Console](https://console.picovoice.ai/).

- DeepSeek-OCR-2
  - `deepseek-ocr-2`
- EmbeddingGemma
  - `embeddinggemma-300m`
- Gemma
  - `gemma-2b`
  - `gemma-2b-it`
  - `gemma-7b`
  - `gemma-7b-it`
- Gemma3
  - `gemma-3-270m`
  - `gemma-3-270m-it`
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
- Qwen3-VL
  - `qwen3-vl-2b-it`

## AccessKey

AccessKey is your authentication and authorization token for deploying Picovoice SDKs, including picoLLM. Anyone who is
using Picovoice needs to have a valid AccessKey. You must keep your AccessKey secret. You would need internet
connectivity to validate your AccessKey with Picovoice license servers even though the LLM inference is running 100%
offline and completely free for open-weight models. Everyone who signs up for
[Picovoice Console](https://console.picovoice.ai/) receives a unique AccessKey.

## Usage

There are three demos available: **completion**, **chat**, and **ocr**. The **completion** demo accepts a prompt, an optional
image, and a set of optional parameters and generates a single completion. It can run all models (including non-instruction-tuned),
unless an image is provided, in which case only vision models can be used. The **chat** demo can run instruction-tuned (chat)
models such as `llama-3-8b-instruct`, `phi2`, etc. The chat demo enables a back-and-forth conversation with the LLM, similar
to ChatGPT. The **optical character recognition** (ocr) demo extracts text from a provided image.

NOTE: File path arguments must be absolute paths. The working directory for the following dotnet commands is:

```console
picollm/demo/dotnet/PicoLLMDemo
```

Build with the dotnet CLI:

```console
dotnet build -c CompletionDemo.Release
dotnet build -c ChatDemo.Release
dotnet build -c OCRDemo.Release
```

For both demos, you can use `--help/-h` to see the list of input arguments.

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

### OCR Demo

To extract text from an image, run the following in the terminal:

```console
dotnet run -c OCRDemo.Release -- --access_key ${ACCESS_KEY} --model_path ${MODEL_PATH} --image_path ${IMAGE_PATH}
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console, and `${IMAGE_PATH}` with the path to an image file you wish to extract text from. See
`resources/.test/images` for some sample images.

To get information about all the available options in the demo, run the following:

```console
dotnet run -c OCRDemo.Release -- --help
```
