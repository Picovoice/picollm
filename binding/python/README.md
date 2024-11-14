# picoLLM Inference Engine Python Binding

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
pip3 install picollm
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

```python
import picollm

pllm = picollm.create(
    access_key='${ACCESS_KEY}',
    model_path='${MODEL_PATH}')

res = pllm.generate(prompt='${PROMPT}')
print(res.completion)
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console, and `${PROMPT}` with a prompt string.

Instruction-tuned models (e.g., `llama-3-8b-instruct`, `llama-2-7b-chat`, and `gemma-2b-it`) have a specific chat
template. You can either directly format the prompt or use a dialog helper:

```python
dialog = pllm.get_dialog()
dialog.add_human_request(prompt)

res = pllm.generate(prompt=dialog.prompt())
dialog.add_llm_response(res.completion)
print(res.completion)
```

To interrupt completion generation before it has finished:
```python
pllm.interrupt()
```

Finally, when done, be sure to release the resources explicitly:

```python
pllm.release()
```

## Demos

[picollmdemo](https://pypi.org/project/picollmdemo/) provides command-line utilities for LLM completion and chat using
picoLLM.
