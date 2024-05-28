# picoLLM Inference Engine iOS Binding

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

- Swift 5
- iOS 16.0+

## Installation
<!-- markdown-link-check-disable -->
The picoLLM iOS binding is available via [CocoaPods](https://cocoapods.org/pods/picoLLM-iOS). To import it into your iOS project, add the following line to your Podfile:
<!-- markdown-link-check-enable -->

```ruby
pod 'picoLLM-iOS'
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

### Model File Deployment

To deploy a model file as part of an iOS app, there are a few options:

1. **Include in App Bundle:**
   - Add model file to your Application's bundle as a resource.
   - Keep in mind Apple enforces a maximum size limit, not all models will fit.

2. **Host Externally:**
   - Host the model file on a server or cloud storage service.
   - Download the file from within the app.

3. **Copy to Device (for testing or manual installation):**
   - Use [AirDrop](https://support.apple.com/en-ca/119857) or connect your device via USB and copy your model to the devices storage.
   - Access the file programmatically within your app.

## AccessKey

AccessKey is your authentication and authorization token for deploying Picovoice SDKs, including picoLLM. Anyone who is
using Picovoice needs to have a valid AccessKey. You must keep your AccessKey secret. You would need internet
connectivity to validate your AccessKey with Picovoice license servers even though the LLM inference is running 100%
offline and completely free for open-weight models. Everyone who signs up for
[Picovoice Console](https://console.picovoice.ai/) receives a unique AccessKey.

## Usage

Create an instance of the engine and generate a prompt completion:

```swift
import PicoLLM

let pllm = try PicoLLM(
	accessKey: "${ACCESS_KEY}",
	modelPath: "${MODEL_PATH}")

let res = pllm.generate(prompt: "${PROMPT}")
print(res.completion)
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console, `${MODEL_PATH}` with the path to a model file
downloaded from Picovoice Console, and `${PROMPT}` with a prompt string.

Instruction-tuned models (e.g., `llama-3-8b-instruct`, `llama-2-7b-chat`, and `gemma-2b-it`) have a specific chat
template. You can either directly format the prompt or use a dialog helper:

```swift
let dialog = pllm.get_dialog()
dialog.addHumanRequest(content: prompt)

let res = pllm.generate(prompt: dialog.prompt())
dialog.addLLMResponse(content: res.completion)
print(res.completion)
```

## Demos

For example usage, refer to our [iOS demo applications](../../demo/ios).
