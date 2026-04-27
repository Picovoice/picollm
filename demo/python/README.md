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

- Python 3.9+
- Runs on Linux (x86_64), macOS (arm64, x86_64), Windows (x86_64, arm64), and Raspberry Pi (3, 4, 5).

## Installation

```console
pip3 install picollmdemo
```

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

There are three demos available: completion, chat and OCR (Optical Character Recognition). The completion demo accepts a prompt and a set of optional
parameters and generates a single completion. It can run all text-based models, whether instruction-tuned or not, and vision models such as `qwen3-vl-2b-it`.
The chat demo can run instruction-tuned (chat) models such as `llama-3-8b-instruct`, `phi2`, etc. The chat demo enables a back-and-forth
conversation with the LLM, similar to ChatGPT. The OCR demo runs OCR models only (such as `deepseek-ocr-2`), and will generate a completion which
represents the text in a given image.

### Completion Demo

Run the demo by entering the following in the terminal:

```console
picollm_demo_completion --access_key ${ACCESS_KEY} --model_path ${MODEL_PATH} --prompt ${PROMPT}
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console, and `${PROMPT}` with a prompt string.

If you are using an vision model such as `qwen3-vl-2b-it`, you can add an image to the prompt:

```console
picollm_demo_completion --access_key ${ACCESS_KEY} --model_path ${VISION_MODEL_PATH} --prompt ${PROMPT} --image_path ${IMAGE_PATH}
```

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

### OCR Demo

To run an OCR model (such as `deepseek-ocr-2`), run the following in the terminal:

```console
picollm_demo_ocr --access_key ${ACCESS_KEY} --model_path ${OCR_MODEL_PATH} --image_path ${IMAGE_PATH}
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${OCR_MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console and `${IMAGE_PATH}` with the path to an image that you'd like to perform OCR on.

To get information about all the available options in the demo, run the following:

```console
picollm_demo_ocr --help
```