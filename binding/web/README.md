# picoLLM Inference Engine Web Binding

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

- Chrome / Edge
- Firefox
- Safari

**NOTE**: IndexedDB and SIMD are required to use `picoLLM`.

## Installation

Using `Yarn`:

```console
yarn add @picovoice/picollm-web
```

or using `npm`:

```console
npm install --save @picovoice/picollm-web
```

## Models

picoLLM Inference Engine on Web supports the following open-weight models. The models are on
[Picovoice Console](https://console.picovoice.ai/).

- Gemma
  - `gemma-2b`
  - `gemma-2b-it`
- Llama-2
  - `llama-2-7b`
  - `llama-2-7b-chat`
  - `llama-3-8b`
  - `llama-3-8b-instruct`
- Mistral
  - `mistral-7b-v0.1`
  - `mistral-7b-instruct-v0.1`
  - `mistral-7b-instruct-v0.2`
- Phi-2
  - `phi2`

**NOTE**: Only gemma and Phi-2 models have been tested on multiple browsers across different platforms.
The rest of the models depend on the user's system in order to run properly.

## AccessKey

AccessKey is your authentication and authorization token for deploying Picovoice SDKs, including picoLLM. Anyone who is
using Picovoice needs to have a valid AccessKey. You must keep your AccessKey secret. You would need internet
connectivity to validate your AccessKey with Picovoice license servers even though the LLM inference is running 100%
offline and completely free for open-weight models. Everyone who signs up for
[Picovoice Console](https://console.picovoice.ai/) receives a unique AccessKey.

## Usage

### picoLLM Model File Types

`picoLLM` accepts model files in three different types:

#### File URL(s):

```typescript
const modelFile = `${SERVER_URL}/${PATH_TO_MODEL_FILE}`;
```

or if the model file is too big (2GB or larger) consider using chunks:

```typescript
const modelFile = [
  `${SERVER_URL}/${PATH_TO_MODEL_FILE_PART1}`,
  `${SERVER_URL}/${PATH_TO_MODEL_FILE_PART2}`,
  `...` // add more parts if needed
];
```

#### File Object(s):

```typescript
const modelFile = new File([/* file contents */]);
```

or if the model file is too big (2GB or larger) consider using chunks:

```typescript
const modelFile = [
  new File([/* file contents part 1 */]),
  new File([/* file contents part 2 */]),
  ... // add more parts if needed
];
```

File objects are usually used with HTML's input tag:

```html
<input id="modelFile" type="file" accept="pllm" />

<script>
  const modelFile = document.getElementById("modelFile").files;
</script>
```

#### Blob Object(s):

```typescript
const modelFile = new Blob([new Uint8Array(/* model bytes */)]);
```

or if the model file is too big (2GB or larger) consider using chunks:

```typescript
const modelFile = [
  new Blob([new Uint8Array(/* model bytes part 1 */)]),
  new Blob([new Uint8Array(/* model bytes part 2 */)]), 
  ... // add more parts if needed
];
```

#### picoLLM Model

`picoLLM` saves and caches your parameter model file (`.pllm`) in IndexedDB to be
used by Web Assembly. Use a different `cacheFilePath` variable to hold and cache 
multiple model values and set the `cacheFileOverwrite` value to true to force 
re-save the model file. If the model file changes, `cacheFileVersion` should be
incremented to force the cached models to be updated. Use `numFetchRetries` to
change the number of fetch retry attempts for the model file.

```typescript
const picoLLMModel = {
  modelFile: modelFile, // Based on the sections before,
  
  // Optional
  cacheFilePath: 'custom_model',
  cacheFileOverwrite: true,
  cacheFileVersion: 1,
  numFetchRetries: 0,
}
```

### Initialize picoLLM

Initialize an instance of `picoLLM` in a worker thread:

```typescript
const picoLLM = await PicoLLMWorker.create(
  ${ACCESS_KEY},
  picoLLMModel,
);
```

Replace `${ACCESS_KEY}` with yours obtained from Picovoice Console.

### Generate Completion

```typescript
const res = await picoLLM.generate(`${PROMPT}`);
console.log(res.completion);
```

Replace `${PROMPT}` with a prompt string.

### Instruction-tuned models

Instruction-tuned models (e.g., `llama-2-7b-chat`, and `gemma-2b-it`) have a specific chat
template. You can either directly format the prompt or use a dialog helper:

```typescript
const dialog = picoLLM.getDialog()
dialog.addHumanRequest(prompt)

const res = await picoLLM.generate(dialog.prompt())
dialog.addLLMResponse(res.completion)
print(res.completion)
```

### Clean Up

Clean up used resources by `picoLLM` or `picoLLMWorker`:

```typescript
await picoLLM.release()
```

## Demos

Refer to our [Web demos](https://github.com/Picovoice/picollm/tree/master/demo/web) for examples using LLM completion
and chat using `picoLLM`.
