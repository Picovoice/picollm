# picoLLM Inference Engine C Demo

## Compatibility

- C99-compatible compiler
- Runs on Linux (x86_64), macOS (arm64, x86_64), Windows (x86_64), and Raspberry Pi (5 and 4).

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

## Usage

The demo accepts a prompt and a set of optional parameters and generates a single completion. It can run all models, whether instruction-tuned or not.

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

### Run

Running the demo without arguments prints the usage:

```console
Usage: ./demo/c/build/picollm_demo_completion -a ACCESS_KEY -l LIBRARY_PATH -m MODEL_PATH
[-d DEVICE] [-c COMPLETION_TOKEN_LIMIT] [-s STOP_PHRASES] [-e SEED] [-r PRESENCE_PENALTY]
[-f FREQUENCY_PENALTY] [-o TOP_P] [-t TEMPERATURE] [-n MAX_OUTPUT_TOKENS] [-c NUM_TOP_CHOICES]
[-v] [-h] -p PROMPT
-v: enable verbose output
-h: show available devices
```

For a simle completion demo, run the command corresponding to your platform from the root of the repository. Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file downloaded from Picovoice Console, and `${PROMPT}` with a prompt string. `-v` enables verbose output, and `-h` shows available devices. For more information on the optional parameters, see the [picollm header file](../../include/pv_picollm.h).

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
