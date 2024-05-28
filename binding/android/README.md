# picoLLM Inference Engine Binding for Android

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

## Installation

`picollm-android` is hosted on Maven Central. To include the package in your Android project, ensure you have
included `mavenCentral()` in your top-level `build.gradle` file and then add the following to your
app's `build.gradle`:

```groovy
dependencies {
    // ...
    implementation 'ai.picovoice:picollm-android:${LATEST_VERSION}'
}
```

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

### Model File Deployment

Android APKs have a size limit which does not allow for the direct inclusion of a `picoLLM` model file as a resource. To deploy a model file as part of an Android app, there are a few alternative options:

1. **Include in App Bundle:**
   - Utilize Google Play's [Dynamic Delivery](https://developer.android.com/guide/playcore/dynamic-delivery) feature to include the model file in your app bundle.
   - Model file will be hosted on Google Play's servers and downloaded on-demand.

2. **APK Expansion File (OBB File):**
   - Store the model file as an [expansion file (OBB file)](https://developer.android.com/google/play/expansion-files) and upload it alongside your APK.
   - Google Play will handle downloading the expansion file along with the APK.

3. **Host Externally:**
   - Host the model file on a server or cloud storage service.
   - Download the file from within the app.

4. **ADB Push (for testing or manual installation):**
   - Use the Android Debug Bridge (ADB) command [`adb push`](https://developer.android.com/studio/command-line/adb#copyfiles) to transfer the model file directly to a connected device.
   - Access the file programmatically within your app.

## AccessKey

AccessKey is your authentication and authorization token for deploying Picovoice SDKs, including picoLLM.
You must keep your AccessKey secret. You will need internet connectivity to validate your AccessKey with
Picovoice license servers even though the LLM inference is running 100% offline and completely free for
open-weight models. Everyone who signs up for [Picovoice Console](https://console.picovoice.ai/) receives a unique AccessKey.

## Usage

Create an instance of the inference engine:

```java
import ai.picovoice.picollm.*;

try {
    PicoLLM picollm = new PicoLLM.Builder()
        .setAccessKey("${ACCESS_KEY}")
        .setModelPath("${MODEL_PATH}")
        .build();
} catch (PicoLLMException e) { }
```

Replace `${ACCESS_KEY}` with your `AccessKey` from Picovoice Console and `${MODEL_PATH}` with the path to a model file downloaded from Picovoice Console.

Generate a prompt completion:
```java
try {
    PicoLLMCompletion res = picollm.generate(
        "${PROMPT}",
        new PicoLLMGenerateParams.Builder().build());
} catch (PicoLLMException e) { }
```

Replace `${PROMPT}` with a text prompt.

Instruction-tuned models (e.g., `llama-3-8b-instruct`, `llama-2-7b-chat`, and `gemma-2b-it`) have a specific chat
template. You can either directly format the prompt or use a dialog helper:

```java
try {
    PicoLLMDialog dialog = picollm
        .getDialogBuilder()
        .build();
    dialog.addHumanRequest(prompt);

    PicoLLMCompletion res = picollm.generate(
        dialog.getPrompt(),
        new PicoLLMGenerateParams.Builder().build());
    dialog.addLLMResponse(res.getCompletion());
} catch (PicoLLMException e) { }
```

Finally, when done, be sure to release the resources explicitly:

```java
picollm.delete()
```

## Demo Apps

For example usage, refer to our [Android demo applications](../../demo/android).
