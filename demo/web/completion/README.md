# picoLLM Completion Web Demo

This is a basic demo to show how to use picoLLM on web browsers, using the IIFE version of the library (i.e. an HTML
script tag). It instantiates a picoLLM inference engine on a web worker that accepts a prompt along with a set of 
optional parameters and generates a single completion.

## AccessKey

PicoLLM requires a valid Picovoice `AccessKey` at initialization. `AccessKey` acts as your credentials when using
Picovoice SDKs.
You can get your `AccessKey` for free. Make sure to keep your `AccessKey` secret.
Signup or Login to [Picovoice Console](https://console.picovoice.ai/) to get your `AccessKey`.

## Models

picoLLM Inference Web Engine supports the following open-weight models. The models are on
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

**NOTE**: Gemma and Phi-2 models have been tested throughout multiple platforms. The rest of the models
depend on the user's system in order properly.

## Install & run

1. Use `yarn` or `npm` to install the dependencies
2. Run `start` script to start a local web server hosting the demo.

```console
yarn
yarn start
```

(or)

```console
npm install
npm run start
```

3. Open `localhost:5000` in your web browser, as hinted at in the output:

```console
Available on:
  http://localhost:5000
Hit CTRL-C to stop the server
```

4. Enter your [access key](#accesskey), select a [model file](#models) and press `Init picoLLM`. Wait until
loading completes and enter any text to test the demo.
