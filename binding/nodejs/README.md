# PicoLLM Binding for Node.js

## PicoLLM Speech-to-Text Engine

Made in Vancouver, Canada by [Picovoice](https://picovoice.ai)

PicoLLM is an on-device speech-to-text engine. PicoLLM is:

- Private; All voice processing runs locally.
- Accurate [[1]](https://picovoice.ai/docs/benchmark/stt/#results)
- Compact and Computationally-Efficient [[2]](https://github.com/Picovoice/speech-to-text-benchmark#rtf)
- Cross-Platform:
    - Linux (x86_64), macOS (x86_64, arm64), and Windows (x86_64)
    - Android and iOS
    - Chrome, Safari, Firefox, and Edge
    - Raspberry Pi (3, 4, 5) and NVIDIA Jetson Nano

## Compatibility

- Node.js 16+
- Runs on Linux (x86_64), macOS (x86_64, arm64), Windows (x86_64), Raspberry Pi (3, 4, 5), and NVIDIA Jetson Nano.

## Installation

```console
npm install @picovoice/picollm-node
```

## AccessKey

PicoLLM requires a valid Picovoice `AccessKey` at initialization. `AccessKey` acts as your credentials when using PicoLLM SDKs.
You can get your `AccessKey` for free. Make sure to keep your `AccessKey` secret.
Signup or Login to [Picovoice Console](https://console.picovoice.ai/) to get your `AccessKey`.

## Usage

Create an instance of the engine and transcribe an audio file:

```typescript
const { PicoLLM } = require("@picovoice/picollm-node");

const accessKey = "${ACCESS_KEY}"; // Obtained from the Picovoice Console (https://console.picovoice.ai/)
const audioPath = "${AUDIO_FILE_PATH}"

const picollm = new PicoLLM(accessKey);

const result = picollm.processFile(audioPath);
console.log(result.transcript);
```

Replace `${ACCESS_KEY}` with yours obtained from [Picovoice Console](https://console.picovoice.ai/) and
`${AUDIO_FILE_PATH}` to the path an audio file. Finally, when done be sure to explicitly release the resources using
`picollm.release()`.

### Language Model

The PicoLLM Node.js SDK comes preloaded with a default English language model (`.pv` file).
Default models for other supported languages can be found in [lib/common](../../lib/common).

Create custom language models using the [Picovoice Console](https://console.picovoice.ai/). Here you can train
language models with custom vocabulary and boost words in the existing vocabulary.

Pass in the `.pv` file via the `modelPath` parameter in the `options` argument of the PicoLLM constructor:
```javascript
const picollm = new PicoLLM(
    accessKey,
    { modelPath: "${MODEL_FILE_PATH}"});
```

### Word Metadata

Along with the transcript, PicoLLM returns metadata for each transcribed word. Available metadata items are:

- **Start Time:** Indicates when the word started in the transcribed audio. Value is in seconds.
- **End Time:** Indicates when the word ended in the transcribed audio. Value is in seconds.
- **Confidence:** PicoLLM's confidence that the transcribed word is accurate. It is a number within `[0, 1]`.
- **Speaker Tag:** If speaker diarization is enabled on initialization, the speaker tag is a non-negative integer identifying unique speakers, with `0` reserved for unknown speakers. If speaker diarization is not enabled, the value will always be `-1`.

## Demos

[PicoLLM Node.js demo package](https://www.npmjs.com/package/@picovoice/picollm-node-demo) provides command-line utilities for processing audio using picollm.
