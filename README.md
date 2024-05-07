# picoLLM Inference Engine

Made in Vancouver, Canada by [Picovoice](https://picovoice.ai)

[![Twitter URL](https://img.shields.io/twitter/url?label=%40AiPicovoice&style=social&url=https%3A%2F%2Ftwitter.com%2FAiPicovoice)](https://twitter.com/AiPicovoice)<!-- markdown-link-check-disable-line -->
[![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCAdi9sTCXLosG1XeqDwLx7w?label=YouTube&style=social)](https://www.youtube.com/channel/UCAdi9sTCXLosG1XeqDwLx7w)

picoLLM Inference Engine is a highly accurate and cross-platform SDK optimized for running compressed large language
models. picoLLM Inference Engine is:

- Accurate; picoLLM Compression improves GPTQ by up to 98%.
- Private; LLM inference runs 100% locally.
- Cross-Platform
    - Linux (x86_64), macOS (arm64, x86_64), and Windows (x86_64)
    - Raspberry Pi (5, 4, and 3)
    - Android and iOS
    - Chrome, Safari, Edge, and Firefox
- Runs on CPU and GPU
- Free for open-weight models

## Table of Contents

- [picoLLM](#picollm-inference-engine)
    - [Table of Contents](#table-of-contents)
    - [Models](#models)
    - [AccessKey](#accesskey)
    - [Demos](#demos)
        - [Python](#python-demos)
        - [Node.js](#nodejs-demos)
        - [Android](#android-demos)
        - [iOS](#ios-demos)
        - [Web](#web-demos)
        - [C](#c-demos)
    - [SDKs](#sdks)
        - [Python](#python-sdk)
        - [Node.js](#nodejs-sdk)
        - [Android](#android-sdk)
        - [iOS](#ios-sdk)
        - [Web](#web-sdk)
        - [C](#c-sdk)
    - [Releases](#releases)
    - [FAQ](#faq)

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

## AccessKey

AccessKey is your authentication and authorization token for deploying Picovoice SDKs, including picoLLM. Anyone who is
using Picovoice needs to have a valid AccessKey. You must keep your AccessKey secret. You would need internet
connectivity to validate your AccessKey with Picovoice license servers even though the LLM inference is running 100%
offline and completely free for open-weight models. Everyone who signs up for
[Picovoice Console](https://console.picovoice.ai/) receives a unique AccessKey.

## Demos

### Python Demos

Install the demo package:

```console
pip3 install picollmdemo
```

Run the following in the terminal:

```console
picollm_demo_completion --access_key ${ACCESS_KEY} --model_path ${MODEL_PATH} --prompt ${PROMPT}
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console, and `${PROMPT}` with a prompt string.

For more information about Python demos go to [demo/python](demo/python/README.md).

### Node.js Demos

### Android Demos

### iOS Demos

### Web Demos

### C Demos

Build the demo:

```console
cmake -S demo/c/ -B demo/c/build && cmake --build demo/c/build
```

Run the demo:

```console
./demo/c/build/picollm_demo_completion -a ${ACCESS_KEY} -l ${LIBRARY_PATH} -m ${MODEL_FILE_PATH} -p ${PROMPT}
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${LIBRARY_PATH}` with the path to the shared
library file located in the [lib](lib) directory, `${MODEL_FILE_PATH}` with the path to a model file downloaded from
Picovoice Console, and `${PROMPT}` with a prompt string.

For more information about C demos go to [demo/c](demo/c/README.md).

## SDKs

### Python SDK

Install the Python SDK:

```console
pip3 install picollm
```

Create an instance of the engine and generate a prompt completion:

```python
import picollm

pllm = picollm.create(
    access_key='${ACCESS_KEY}',
    model_path='${MODEL_PATH}')

res = pllm.generate('${PROMPT}')
print(res.completion)
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` to the path to a model file
downloaded from Picovoice Console, and `${PROMPT}` to a prompt string. Finally, when done be sure to explicitly release
the resources using `pllm.release()`.

### Node.js SDK

### Android SDK

### iOS SDK

### Web SDK

### C SDK

Create an instance of the engine and generate a prompt completion:

```c
pv_picollm_t *pllm = NULL;
pv_picollm_init(
    "${ACCESS_KEY}",
    "${MODEL_PATH}",
    "best",
    &pllm);

pv_picollm_usage_t usage;
pv_picollm_endpoint_t endpoint;
int32_t num_completion_tokens;
pv_picollm_completion_token_t *completion_tokens;
char *output;
pv_picollm_generate(
    pllm,
    "${PROMPT}",
    -1,    // completion_token_limit
    NULL,  // stop_phrases
    0,     // num_stop_phrases
    -1,    // seed
    0.f,   // presence_penalty
    0.f,   // frequency_penalty
    0.f,   // temperature
    1.f,   // top_p
    0,     // num_top_choices
    NULL,  // stream_callback
    NULL,  // stream_callback_context
    &usage,
    &endpoint,
    &completion_tokens,
    &num_completion_tokens,
    &output);
printf("%s\n", output);
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` to the path to a model file
downloaded from Picovoice Console, and `${PROMPT}` to a prompt string.

Finally, when done, be sure to release the resources explicitly:

```c
pv_picollm_delete(pllm);
```

## Releases

## FAQ
