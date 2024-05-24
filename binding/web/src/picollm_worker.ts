import { pvStatusToException } from './picollm_errors';
import { loadModel } from './utils';

import {
  PicoLLMModel,
  PicoLLMCompletion,
  PicoLLMInitOptions,
  PicoLLMGenerateOptions,
  PicoLLMWorkerInitResponse,
  PicoLLMWorkerGenerateResponse,
  PicoLLMWorkerTokenizeResponse,
  PicoLLMWorkerForwardResponse,
  PicoLLMWorkerResetResponse,
  PicoLLMWorkerReleaseResponse,
  PvStatus,
} from './types';

import PvWorker from 'web-worker:./picollm_worker_handler.ts';
import { Dialog, DIALOGS } from './dialog';
import * as PicoLLMErrors from './picollm_errors';

export class PicoLLMWorker {
  private readonly _worker: Worker;
  private readonly _version: string;
  private readonly _contextLength: number;
  private readonly _maxTopChoices: number;
  private readonly _model: string;

  private static _wasmSimd: string;
  private static _sdk: string = "web";

  private constructor(worker: Worker, contextLength: number, maxTopChoices: number, model: string, version: string) {
    this._worker = worker;
    this._contextLength = contextLength;
    this._maxTopChoices = maxTopChoices;
    this._model = model;
    this._version = version;
  }

  /**
   * Get model's context length.
   */
  get contextLength(): number {
    return this._contextLength;
  }

  /**
   * Get maximum number of top choices for generate.
   */
  get maxTopChoices(): number {
    return this._maxTopChoices;
  }

  /**
   * Get the model's name.
   */
  get model(): string {
    return this._model;
  }

  /**
   * Get PicoLLM version.
   */
  get version(): string {
    return this._version;
  }

  /**
   * Get PicoLLM worker instance.
   */
  get worker(): Worker {
    return this._worker;
  }

  /**
   * Creates an instance of picoLLM on a web worker.
   *
   * @param accessKey AccessKey obtained from Picovoice Console (https://console.picovoice.ai/)
   * @param model PicoLLM model representation, see PicoLLMModel for details.
   * @param model.modelFile The model file can be one or chunks (in order) of:
   *  - URL string of the model file.
   *  - File object containing the contents of the model file.
   *  - Blob object containing the bytes of the model file.
   * @param model.cacheFilePath Custom path to save the model in storage. Set to a different name to use multiple
   * models across `picoLLM` instances.
   * @param model.cacheFileVersion PicoLLM model version. Set to a higher number to update the model file.
   * @param model.cacheFileOverwrite Flag to force overwrite the model in storage even if it exists.
   * @param model.numFetchRetries Number of retries to try and fetch the model file.
   * @param options Optional init configuration arguments, see PicoLLMInitOptions for details.
   * @param options.device String representation of the device to use for inference. If set to `best`,
   * picoLLM picks the most suitable device. If set to `cpu`, the engine will run on the CPU with the default number of
   * threads. To specify the number of threads, set this argument to `cpu:${NUM_THREADS}`, where `${NUM_THREADS}`
   * is the desired number of threads. The number of threads is capped at the max available cores determined by the browser.
   *
   * @returns An instance of the PicoLLMWorker.
   */
  public static async create(
    accessKey: string,
    model: PicoLLMModel,
    options: PicoLLMInitOptions = {}
  ): Promise<PicoLLMWorker> {
    const { device } = options;
    const modelPath = await loadModel(model);

    const worker = new PvWorker();
    const returnPromise: Promise<PicoLLMWorker> = new Promise((resolve, reject) => {
      // @ts-ignore - block from GC
      this.obj = worker;
      worker.onmessage = (event: MessageEvent<PicoLLMWorkerInitResponse>): void => {
        switch (event.data.command) {
          case 'ok':
            resolve(new PicoLLMWorker(
              worker,
              event.data.contextLength,
              event.data.maxTopChoices,
              event.data.model,
              event.data.version));
            break;
          case 'failed':
          case 'error':
            worker.terminate();
            const error = pvStatusToException(event.data.status, event.data.shortMessage, event.data.messageStack);
            reject(error);
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${event.data.command}`));
        }
      };
    });

    worker.postMessage({
      command: 'init',
      accessKey: accessKey,
      modelPath: modelPath,
      options: {
        device: device,
      },
      sdk: this._sdk,
      wasmSimd: this._wasmSimd,
    });

    return returnPromise;
  }

  /**
   * Set base64 wasm file with SIMD feature.
   * @param wasmSimd Base64'd wasm file to use to initialize wasm.
   */
  public static setWasmSimd(wasmSimd: string): void {
    if (this._wasmSimd === undefined) {
      this._wasmSimd = wasmSimd;
    }
  }

  public static setSdk(sdk: string): void {
    PicoLLMWorker._sdk = sdk;
  }

  /**
   * Given a text prompt and a set of generation parameters, creates a completion text and relevant metadata.
   *
   * @param prompt Prompt.
   * @param options Optional generate configuration arguments, see PicoLLMGenerateOptions for details.
   * @param options.completionTokenLimit Maximum number of tokens in the completion. If the generation process stops due
   * to reaching this limit, the `.endpoint` parameter in `PicoLLMCompletion` output will be
   * `PicoLLMEndpoint.COMPLETION_TOKEN_LIMIT_REACHED`. Set to `undefined` to impose no limit.
   * @param options.stopPhrases The generation process stops when it encounters any of these phrases in the completion. The
   * already generated completion, including the encountered stop phrase, will be returned. The `endpoint` parameter
   * in `PicoLLMCompletion` output will be `PicoLLMEndpoint.STOP_PHRASE_ENCOUNTERED`. Set to `undefined` to turn off this
   * feature.
   * @param options.seed The internal random number generator uses it as its seed if set to a positive integer value.
   * Seeding enforces deterministic outputs.  Set to `undefined` for randomized outputs for a given prompt.
   * @param options.presencePenalty It penalizes logits already appearing in the partial completion if set to a positive
   * value. If set to `0` or `undefined`, it has no effect.
   * @param options.frequencyPenalty If set to a positive floating-point value, it penalizes logits proportional to the
   * frequency of their appearance in the partial completion. If set to `0` or `undefined`, it has no effect.
   * @param options.temperature Sampling temperature. Temperature is a non-negative floating-point value that controls the
   * randomness of the sampler. A higher temperature smoothens the samplers' output, increasing the randomness. In
   * contrast, a lower temperature creates a narrower distribution and reduces variability. Setting it to `0` or
   * `undefined` selects the maximum logit during sampling.
   * @param options.topP A positive floating-point number within 0, and 1. It restricts the sampler's choices to
   * high-probability logits that form the `topP` portion of the probability mass. Hence, it avoids randomly
   * selecting unlikely logits. A value of `1` or `undefined` enables the sampler to pick any token with non-zero
   * probability turning off the feature.
   * @param options.numTopChoices If set to a positive value, picoLLM returns the list of the highest probability tokens
   * for any generated token. Set to `0` to turn off the feature. The maximum number of top choices is `.maxTopChoices`.
   * @param options.streamCallback If not set to `undefined`, picoLLM executes this callback every time a new piece of
   * completion string becomes available.
   */
  public async generate(
    prompt: string,
    options: PicoLLMGenerateOptions = {}
  ): Promise<PicoLLMCompletion> {
    const {
      completionTokenLimit = -1,
      stopPhrases = [],
      seed = -1,
      presencePenalty = 0,
      frequencyPenalty = 0,
      temperature = 0,
      topP = 1,
      numTopChoices = 0,
      streamCallback,
    } = options;

    const returnPromise: Promise<PicoLLMCompletion> = new Promise((resolve, reject) => {
      this._worker.onmessage = (event: MessageEvent<PicoLLMWorkerGenerateResponse>): void => {
        switch (event.data.command) {
          case 'ok':
            resolve(event.data.completion);
            break;
          case 'stream':
            if (streamCallback) {
              streamCallback(event.data.token);
            }
            break;
          case 'failed':
          case 'error':
            const error = pvStatusToException(event.data.status, event.data.shortMessage, event.data.messageStack);
            reject(error);
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${event.data.command}`));
        }
      };
    });

    this._worker.postMessage({
      command: 'generate',
      prompt,
      options: {
        completionTokenLimit,
        stopPhrases,
        seed,
        presencePenalty,
        frequencyPenalty,
        temperature,
        topP,
        numTopChoices,
      }
    });

    return returnPromise;
  }

  /**
   * Tokenizes a given text using the model's tokenizer. This is a low-level function meant for benchmarking and
   * advanced usage. `.generate()` should be used when possible.
   *
   * @param text Text.
   * @param bos If set to `True`, the tokenizer prepends the beginning of the sentence token to the result.
   * @param eos If set to `True`, the tokenizer appends the end of the sentence token to the result.
   * @returns Tokens representing the input text.
   */
  public async tokenize(
    text: string,
    bos: boolean,
    eos: boolean
  ): Promise<number[]> {
    const returnPromise: Promise<number[]> = new Promise((resolve, reject) => {
      this._worker.onmessage = (event: MessageEvent<PicoLLMWorkerTokenizeResponse>): void => {
        switch (event.data.command) {
          case 'ok':
            resolve(event.data.tokens);
            break;
          case 'failed':
          case 'error':
            const error = pvStatusToException(event.data.status, event.data.shortMessage, event.data.messageStack);
            reject(error);
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${event.data.command}`));
        }
      };
    });

    this._worker.postMessage({
      command: 'tokenize',
      text,
      bos,
      eos,
    });

    return returnPromise;
  }

  /**
   * Performs a single forward pass given a token and returns the logits. This is a low-level function for
   * benchmarking and advanced usage. `.generate()` should be used when possible.
   *
   * @param token Input token.
   * @returns Logits.
   */
  public async forward(token: number): Promise<number[]> {
    const returnPromise: Promise<number[]> = new Promise((resolve, reject) => {
      this._worker.onmessage = (event: MessageEvent<PicoLLMWorkerForwardResponse>): void => {
        switch (event.data.command) {
          case 'ok':
            resolve(event.data.logits);
            break;
          case 'failed':
          case 'error':
            const error = pvStatusToException(event.data.status, event.data.shortMessage, event.data.messageStack);
            reject(error);
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${event.data.command}`));
        }
      };
    });

    this._worker.postMessage({
      command: 'forward',
      token,
    });

    return returnPromise;
  }

  /**
   * Resets the internal state of LLM. It should be called in conjunction with `.forward()` when processing a new
   * sequence of tokens. This is a low-level function for benchmarking and advanced usage. `.generate()` should be
   * used when possible.
   */
  public async reset(): Promise<void> {
    const returnPromise: Promise<void> = new Promise((resolve, reject) => {
      this._worker.onmessage = (event: MessageEvent<PicoLLMWorkerResetResponse>): void => {
        switch (event.data.command) {
          case 'ok':
            resolve();
            break;
          case 'failed':
          case 'error':
            const error = pvStatusToException(event.data.status, event.data.shortMessage, event.data.messageStack);
            reject(error);
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${event.data.command}`));
        }
      };
    });

    this._worker.postMessage({
      command: 'reset',
    });

    return returnPromise;
  }

  /**
   * Return the Dialog object corresponding to the loaded model. The model needs to be instruction-tuned and have a
   * specific chat template.
   *
   * @param mode Some models (e.g., `phi-2`) define multiple chat template models. For example, `phi-2` allows
   * both `qa` and `chat` templates.
   * @param history History refers to the number of latest back-and-forths to include in the prompt. Setting history
   * to `undefined` will embed the entire dialog in the prompt.
   * @param system System instruction to embed in the prompt for configuring the model's responses.
   * @returns Constructed dialog object.
   */
  public getDialog(mode?: string, history: number = 0, system?: string): Dialog {
    const model = this._model.split(' ')[0].toLowerCase();
    if (model && DIALOGS[model] === undefined) {
      throw new PicoLLMErrors.PicoLLMRuntimeError(
        `'${this._model}' does not have a corresponding dialog implementation or is not instruction-tuned`
      );
    }

    if (typeof DIALOGS[model] === 'object') {
      const dialogObject = DIALOGS[model] as any as { [key: string]: typeof Dialog };
      if (mode) {
        if (!dialogObject[mode]) {
          throw new PicoLLMErrors.PicoLLMRuntimeError(
            `${this._model} doesn't have a '${mode}' model. Available modes are: '${Object.keys(dialogObject).join(', ')}'`
          );
        }
        const DialogClass = dialogObject[mode];
        return new DialogClass(history, system);
      }

      if (!dialogObject.default) {
        throw new PicoLLMErrors.PicoLLMRuntimeError(
          `${this._model} does require a 'mode'. Available modes are: '${Object.keys(dialogObject).join(', ')}'`
        );
      }
      const DialogClass = dialogObject.default;
      return new DialogClass(history, system);
    }

    if (mode) {
      throw new PicoLLMErrors.PicoLLMRuntimeError(
        `'${this._model}' doesn't accept a 'mode' parameter, set it to 'undefined'.`
      );
    }
    const DialogClass = DIALOGS[model] as any as typeof Dialog;
    return new DialogClass(history, system);
  }

  /**
   * Releases resources acquired by WebAssembly module.
   */
  public release(): Promise<void> {
    const returnPromise: Promise<void> = new Promise((resolve, reject) => {
      this._worker.onmessage = (event: MessageEvent<PicoLLMWorkerReleaseResponse>): void => {
        switch (event.data.command) {
          case 'ok':
            this._worker.terminate();
            resolve();
            break;
          case 'failed':
          case 'error':
            const error = pvStatusToException(event.data.status, event.data.shortMessage, event.data.messageStack);
            reject(error);
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${event.data.command}`));
        }
      };
    });

    this._worker.postMessage({
      command: 'release',
    });

    return returnPromise;
  }
}
