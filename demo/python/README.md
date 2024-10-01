# picoLLM Inference Engine Python Demos

Made in Vancouver, Canada by [Picovoice](https://picovoice.ai)

## picoLLM Inference Engine

picoLLM Inference Engine is a highly accurate and cross-platform SDK optimized for running compressed large language
models. picoLLM Inference Engine is:

- Accurate; picoLLM Compression improves GPTQ by [significant margins](https://picovoice.ai/blog/picollm-towards-optimal-llm-quantization/)
- Private; LLM inference runs 100% locally.
- Cross-Platform
- Runs on CPU and GPU
- Free for open-weight models

## Compatibility

- Python 3.8+
- Runs on Linux (x86_64), macOS (arm64, x86_64), Windows (x86_64), and Raspberry Pi (5 and 4).

## Installation

```console
pip3 install picollmdemo
```

## Models

picoLLM Inference Engine supports the following open-weight models. The models are on
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

### Completion Demo

Run the demo by entering the following in the terminal:

```console
picollm_demo_completion --access_key ${ACCESS_KEY} --model_path ${MODEL_PATH} --prompt ${PROMPT}
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console, and `${PROMPT}` with a prompt string.

To get information about all the available options in the demo, run the following:

```console
picollm_demo_completion --help
```

### Chat Demo

To run an instruction-tuned model for chat, run the following in the terminal:

```console
picollm_demo_chat --access_key ${ACCESS_KEY} --model_path ${MODEL_PATH}
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console and `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console.

To get information about all the available options in the demo, run the following:

```console
picollm_demo_chat --help
```
