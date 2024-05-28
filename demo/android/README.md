# picoLLM Inference Engine Demos for Android

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

- Android 5.0 (SDK 21+)

## Models

picoLLM Inference Engine supports the following open-weight models. The models are available for download on the [Picovoice Console](https://console.picovoice.ai/).

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

AccessKey is your authentication and authorization token for deploying Picovoice SDKs, including picoLLM.
You must keep your AccessKey secret. You will need internet connectivity to validate your AccessKey with
Picovoice license servers even though the LLM inference is running 100% offline and completely free for
open-weight models. Everyone who signs up for [Picovoice Console](https://console.picovoice.ai/) receives a unique AccessKey.

## Setup

Download your desired model file from the [Picovoice Console](https://console.picovoice.ai/). If you do not download the file directly from your Android device, you will need to upload it to the device to use it with the demos. To upload the model, connect your Android device to your computer via USB or launch a simulator. Ensure it's recognized by the Android Debug Bridge (ADB) using the `adb devices` command. If it is not recognized, you may have to enable USB debugging.

Use ADB to upload the file to the `Downloads` directory of your device:
```console
adb push model.pllm /sdcard/Downloads
```

## Usage

There are two demos available: completion and chat. The completion demo accepts a prompt and a set of optional
parameters and generates a single completion. It can run all models, whether instruction-tuned or not. The chat demo can
run instruction-tuned (chat) models such as `llama-3-8b-instruct`, `phi2`, etc. The chat demo enables a back-and-forth
conversation with the LLM, similar to ChatGPT.

### Completion Demo

1. Replace `"${YOUR_ACCESS_KEY_HERE}"` in [MainActivity.java](Completion/picollm-completion-demo/src/main/java/ai/picovoice/picollmcompletiondemo/MainActivity.java)
with your AccessKey obtained from [Picovoice Console](https://console.picovoice.ai/).

2. Open the [Completion Demo](Completion) in Android studio - build and run the project.

3. Press the `Load Model` button and load the model file from your external storage. If you can't see your model file in the file navigator, ensure the `Large files` toggle at the top is enabled.

4. Enter a prompt that you want a completion for, e.g. "roses are red".

5. Experiment with the optional parameters by pressing the menu button on the top left.

### Chat Demo

1. Replace `"${YOUR_ACCESS_KEY_HERE}"` in [MainActivity.java](Chat/picollm-chat-demo/src/main/java/ai/picovoice/picollmchatdemo/MainActivity.java)
with your AccessKey obtained from [Picovoice Console](https://console.picovoice.ai/).

2. Open the [Chat Demo](Chat) in Android studio - build and run the project.

3. Press the `Load Model` button and load the model file from your external storage. If you can't see your model file in the file navigator, ensure the `Large files` toggle at the top is enabled.

4. Chat back and forth with the LLM using the text box at the bottom.

5. Use the clear button in the lower right hand of the text box to reset the chat and start a new one.

