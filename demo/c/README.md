# picoLLM Inference Engine C Demo

## Compatibility

- C99-compatible compiler
- Runs on Linux (x86_64), macOS (arm64, x86_64), Windows (x86_64, arm64), and Raspberry Pi (3, 4, 5).

## Requirements

- [CMake](https://cmake.org/) version 3.13 or higher
- [MinGW](https://mingw-w64.org/) (**Windows Only**)

## AccessKey

AccessKey is your authentication and authorization token for deploying Picovoice SDKs, including picoLLM. Anyone who is
using Picovoice needs to have a valid AccessKey. You must keep your AccessKey secret. You would need internet
connectivity to validate your AccessKey with Picovoice license servers even though the LLM inference is running 100%
offline and completely free for open-weight models. Everyone who signs up for
[Picovoice Console](https://console.picovoice.ai/) receives a unique AccessKey.

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

## Usage

There are three demos available: completion, OCR (Optical Character Recognition) and similarity. The completion demo accepts a prompt and a set of optional
parameters and generates a single completion. It can run all text-based models, whether instruction-tuned or not, and vision models such as `qwen3-vl-2b-it`.
The OCR demo runs OCR models only (such as `deepseek-ocr-2`), and will generate a completion which represents the text in a given image. The similarity demo
uses an embedding model (such as `embeddinggemma-300m`) to generate embeddings for a prompt and compare it to the embeddings from a given document to measure
the similarity between them.

### Build Linux/MacOS

Build the demo by running this from the root of the repository:

```console
cmake -S demo/c/ -B demo/c/build
cmake --build demo/c/build
```

### Build Windows

Build the demo by running this from the root of the repository:

```console
cmake -S demo/c/ -B demo/c/build -G "MinGW Makefiles"
cmake --build demo/c/build
```

### Run Completion demo

Running the demo without arguments prints the usage:

```console
Usage: ./demo/c/build/picollm_demo_completion -a ACCESS_KEY -l LIBRARY_PATH -m MODEL_PATH
[-y DEVICE] [-c COMPLETION_TOKEN_LIMIT] [-s STOP_PHRASES] [-e SEED] [-r PRESENCE_PENALTY]
[-f FREQUENCY_PENALTY] [-o TOP_P] [-t TEMPERATURE] [-n MAX_OUTPUT_TOKENS] [-c NUM_TOP_CHOICES]
[-v] [-h] [-i IMAGE_PATH] -p PROMPT
-v: enable verbose output
-h: show available devices
```

For a simple completion demo, run the command corresponding to your platform from the root of the repository. Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file downloaded from Picovoice Console, and `${PROMPT}` with a prompt string. `-v` enables verbose output, and `-h` shows available devices. For more information on the optional parameters, see the [picollm header file](../../include/pv_picollm.h).

If you are using an vision model such as `qwen3-vl-2b-it`, you can add an image to the prompt by providing an image path to `-i`.

#### Linux/macOS

```console
./demo/c/build/picollm_demo_completion \
-a ${ACCESS_KEY} \
-m ${MODEL_PATH} \
-l ${LIBRARY_PATH} \
-p ${PROMPT}
```

where `${LIBRARY_PATH}` is the path to the Picovoice library file corresponding to your platform shown in the table below:

| Platform                | Library Path                                         |
| ----------------------- | ---------------------------------------------------- |
| Linux (x86_64)          | lib/linux/x86_64/libpv_picollm.so                    |
| macOS (x86_64)          | lib/mac/x86_64/libpv_picollm.dylib                   |
| macOS (arm64)           | lib/mac/arm64/libpv_picollm.dylib                    |
| Raspberry Pi 5          | lib/raspberry-pi/cortex-a76/libpv_picollm.so         |
| Raspberry Pi 5 (64-bit) | lib/raspberry-pi/cortex-a76-aarch64/libpv_picollm.so |
| Raspberry Pi 4          | lib/raspberry-pi/cortex-a76/libpv_picollm.so         |
| Raspberry Pi 4 (64-bit) | lib/raspberry-pi/cortex-a76-aarch64/libpv_picollm.so |

#### Windows

Run using `Command Prompt`.

```console
demo\c\build\picollm_demo_completion.exe ^
-a ${ACCESS_KEY} ^
-m ${MODEL_PATH} ^
-l lib\windows\amd64\libpv_picollm.dll ^
-p ${PROMPT}
```

### Run OCR demo

Running the OCR demo without arguments prints the usage:

```console
Usage: ./demo/c/build/picollm_demo_ocr -a ACCESS_KEY -l LIBRARY_PATH -m MODEL_PATH
[-y DEVICE] [-n MAX_OUTPUT_TOKENS] [-h] -i IMAGE_PATH
-h: show available devices
```

For a simple OCR demo, run the command corresponding to your platform from the root of the repository. Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file downloaded from Picovoice Console, and `${IMAGE_PATH}` with the path to an image to run
OCR on.

### Run Similarity demo

Running the similarity demo without arguments prints the usage:

```console
Usage: ./demo/c/build/picollm_demo_similarity -a ACCESS_KEY -l LIBRARY_PATH -m MODEL_PATH
[-y DEVICE] [-h] -p PROMPT -d DOCUMENT
-h: show available devices
```

For a simple similarity demo, run the command corresponding to your platform from the root of the repository. Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file downloaded from Picovoice Console, `${PROMPT}` with a prompt string, and `${DOCUMENT}` with
a string to compare to the prompt. The demo will return a similarity value between `0` and `1`, `0` being not similar at all, and `1` being exactly alike.

