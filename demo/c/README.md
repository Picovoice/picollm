# picoLLM Inference Engine C Demo

## picoLLM Inference Engine

picoLLM Inference Engine is a highly accurate and cross-platform SDK optimized for running compressed large language
models. picoLLM Inference Engine is:

- Accurate; picoLLM Compression improves GPTQ by up to 98%.
- Private; LLM inference runs 100% locally.
- Cross-Platform
- Runs on CPU and GPU
- Free for open-weight models

## Compatibility

- C99-compatible compiler
- Runs on Linux (x86_64), macOS (arm64, x86_64), Windows (x86_64), and Raspberry Pi (5, 4, and 3).

## Requirements

- [CMake](https://cmake.org/) version 3.13 or higher
- [MinGW](https://mingw-w64.org/) (**Windows Only**)

## AccessKey

AccessKey is your authentication and authorization token for deploying Picovoice SDKs, including picoLLM. Anyone who is
using Picovoice needs to have a valid AccessKey. You must keep your AccessKey secret. You would need internet
connectivity to validate your AccessKey with Picovoice license servers even though the LLM inference is running 100%
offline and completely free for open-weight models. Everyone who signs up for
[Picovoice Console](https://console.picovoice.ai/) receives a unique AccessKey.

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
```

Run the command corresponding to your platform from the root of the repository. Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console, and `${PROMPT}` with a prompt string.

To get information about all the available options in the demo, run the following:

```console
picollm_demo_completion --help
```

#### Linux (x86_64)

```console
./demo/c/build/leopard_demo \
-a ${ACCESS_KEY} \
-m lib/common/leopard_params.pv \
-l lib/linux/x86_64/libpv_leopard.so \
${AUDIO_PATH}
```

#### macOS (x86_64)

```console
./demo/c/build/leopard_demo \
-a ${ACCESS_KEY} \
-m lib/common/leopard_params.pv \
-l lib/mac/x86_64/libpv_leopard.dylib \
${AUDIO_PATH}
```

#### macOS (arm64)

```console
./demo/c/build/leopard_demo \
-a ${ACCESS_KEY} \
-m lib/common/leopard_params.pv \
-l lib/mac/arm64/libpv_leopard.dylib \
${AUDIO_PATH}
```

#### Windows

Run using `Command Prompt`.

```console
demo\\c\\build\\leopard_demo.exe ^
-a ${ACCESS_KEY} ^
-m lib\\common\\leopard_params.pv ^
-l lib\\windows\\amd64\\libpv_leopard.dll ^
${AUDIO_PATH}
```

#### Raspberry Pi 4

```console
./demo/c/build/leopard_demo \
-a ${ACCESS_KEY} \
-m lib/common/leopard_params.pv \
-l lib/raspberry-pi/cortex-a72/libpv_leopard.so \
${AUDIO_PATH}
```

#### Raspberry Pi 4 (64-bit)

```console
./demo/c/build/leopard_demo \
-a ${ACCESS_KEY} \
-m lib/common/leopard_params.pv \
-l lib/raspberry-pi/cortex-a72-aarch64/libpv_leopard.so \
${AUDIO_PATH}
```

#### Raspberry Pi 3

```console
./demo/c/build/leopard_demo \
-a ${ACCESS_KEY} \
-m lib/common/leopard_params.pv \
-l lib/raspberry-pi/cortex-a53/libpv_leopard.so \
${AUDIO_PATH}
```

#### Raspberry Pi 3 (64-bit)

```console
./demo/c/build/leopard_demo \
-a ${ACCESS_KEY} \
-m lib/common/leopard_params.pv \
-l lib/raspberry-pi/cortex-a53-aarch64/libpv_leopard.so \
${AUDIO_PATH}
```