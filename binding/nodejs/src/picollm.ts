//
// Copyright 2024-2026 Picovoice Inc.
//
// You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
// file accompanying this source.
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import { Worker } from 'node:worker_threads';
import path from 'path';

import PvStatus from './pv_status_t';
import {
  PicoLLMRuntimeError,
  pvStatusToException,
} from './errors';
import { Dialog, DIALOGS } from './dialog';

import {
  PicoLLMCompletion,
  PicoLLMGenerateOCROptions,
  PicoLLMGenerateOptions,
  PicoLLMGenerateWithImageOptions,
  PicoLLMImage,
  PicoLLMInputOptions,
  PicoLLMOptions,

  PicoLLMWorkerInitResponse,
  PicoLLMWorkerGenerateResponse,
  PicoLLMWorkerGenerateWithImageResponse,
  PicoLLMWorkerGenerateEmbeddingsResponse,
  PicoLLMWorkerGenerateOCRResponse,
  PicoLLMWorkerTokenizeResponse,
  PicoLLMWorkerForwardResponse,
  PicoLLMWorkerResetResponse,
  PicoLLMWorkerReleaseResponse,
} from './types';

import { getSystemLibraryPath } from './platforms';

/**
 * Node.js binding for PicoLLM engine.
 *
 * Performs calls to the PicoLLM node library by messaging a worker thread. The Worker thread does some basic parameter
 * validation which prevents errors occurring in the library layer. Provides clearer error messages in native JavaScript.
 */
export class PicoLLM {
  private readonly _worker: Worker;

  private readonly _contextLength: number;
  private readonly _maxTopChoices: number;
  private readonly _model: string;
  private readonly _version: string;

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
   * Get maximum number of top choices for `.generate()`.
   */
  get maxTopChoices(): number {
    return this._maxTopChoices;
  }

  /**
   *  Get the model's name.
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
   * Creates an instance of picoLLM.
   *
   * @param accessKey AccessKey obtained from Picovoice Console (https://console.picovoice.ai/)
   * @param modelPath Absolute path to the file containing LLM parameters.
   * @param options Optional init configuration arguments, see PicoLLMInitOptions for details.
   * @param options.device String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`,
   * picoLLM picks the most suitable device. If set to `gpu`, the engine uses the first available GPU device. To
   * select a specific GPU device, set this argument to `gpu:${GPU_INDEX}`, where `${GPU_INDEX}` is the index of the
   * target GPU. If set to `cpu`, the engine will run on the CPU with the default number of threads. To specify the
   * number of threads, set this argument to `cpu:${NUM_THREADS}`, where `${NUM_THREADS}` is the desired number of
   * threads.
   * @param options.libraryPath Absolute path to picoLLM's dynamic library.
   *
   * @returns An instance of the PicoLLM.
   */
  public static async create(
      accessKey: string,
      modelPath: string,
      options: PicoLLMOptions = {}
  ): Promise<PicoLLM> {
    const worker = new Worker(path.join(__dirname, "picollm_worker_handler.js"));

    const returnPromise: Promise<PicoLLM> = new Promise((resolve, reject) => {
      worker.removeAllListeners("message");
      worker.on("message", (response: PicoLLMWorkerInitResponse): void => {
        switch (response.command) {
          case 'ok':
            resolve(new PicoLLM(
              worker,
              response.contextLength,
              response.maxTopChoices,
              response.model,
              response.version));
            break;
          case 'failed':
          case 'error':
            PicoLLM.release(worker).then(_ => {
              reject(pvStatusToException(response.status, response.message, response.messageStack));
            });
            break;
          default:
            PicoLLM.release(worker).then(_ => {
              // @ts-ignore
              reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${response.command}`));
            });
        }
      });
    });

    worker.postMessage({
      command: 'init',
      accessKey: accessKey,
      modelPath: modelPath,
      options: options
    });

    return returnPromise;
  }

  /**
   * Given a text prompt and a set of generation parameters, creates a completion text and relevant metadata.
   *
   * @param prompt Text prompt.
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
   * completion text becomes available.
   * @returns Completion result.
   */
  async generate(prompt: string, options: PicoLLMGenerateOptions = {}): Promise<PicoLLMCompletion> {
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
      this._worker.removeAllListeners("message");
      this._worker.on("message", (response: PicoLLMWorkerGenerateResponse): void => {
        switch (response.command) {
          case 'ok':
            resolve(response.completion);
            break;
          case 'stream':
            if (streamCallback) {
              streamCallback(response.token);
            }
            break;
          case 'failed':
          case 'error':
            reject(pvStatusToException(response.status, response.message, response.messageStack));
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${response.command}`));
        }
      });
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
   * Given a text prompt, an image, and a set of generation parameters, creates a completion text and relevant metadata.
   *
   * For use with vision models only.
   *
   * @param prompt Text prompt.
   * @param image Input image.
   * @param image.width Width of the image in pixels.
   * @param image.height Height of the image in pixels.
   * @param image.data Image pixel data in 8-bit, RGB format.
   * @param options Optional generate configuration arguments, see PicoLLMGenerateWithImageOptions for details.
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
   * completion text becomes available.
   * @param options.promptProgressCallback If not set to `undefined`, picoLLM uses this callback to report the prompt
   * evaluation progress as a floating-point number within (0, 100]. A value of 100 indicates that prompt evaluation is
   * complete and completion tokens are now being generated.
   * @returns Completion result.
   */
  async generateWithImage(
    prompt: string,
    image: PicoLLMImage,
    options: PicoLLMGenerateWithImageOptions = {}
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
      promptProgressCallback
    } = options;

    const returnPromise: Promise<PicoLLMCompletion> = new Promise((resolve, reject) => {
      this._worker.removeAllListeners("message");
      this._worker.on("message", (response: PicoLLMWorkerGenerateWithImageResponse): void => {
        switch (response.command) {
          case 'ok':
            resolve(response.completion);
            break;
          case 'stream':
            if (streamCallback) {
              streamCallback(response.token);
            }
            break;
          case 'progress':
            if (promptProgressCallback) {
              promptProgressCallback(response.progress);
            }
            break;
          case 'failed':
          case 'error':
            reject(pvStatusToException(response.status, response.message, response.messageStack));
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${response.command}`));
        }
      });
    });

    this._worker.postMessage({
      command: 'generateWithImage',
      prompt,
      image,
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
   * Interrupts `generate()` and `generateWithImage()` if generation is in progress. Otherwise, it has no effect.
   */
  interrupt(): void {
    this._worker.postMessage({
      command: 'interrupt',
    });
  }

  /**
   * Generates numerical vector representations of the input text prompt.
   *
   * For use with embedding models only.
   *
   * @param prompt Text prompt.
   * @returns Generated embeddings.
   */
  async generateEmbeddings(prompt: string): Promise<Float32Array> {
    const returnPromise: Promise<Float32Array> = new Promise((resolve, reject) => {
      this._worker.removeAllListeners("message");
      this._worker.on("message", (response: PicoLLMWorkerGenerateEmbeddingsResponse): void => {
        switch (response.command) {
          case 'ok':
            resolve(response.embeddings);
            break;
          case 'failed':
          case 'error':
            reject(pvStatusToException(response.status, response.message, response.messageStack));
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${response.command}`));
        }
      });
    });

    this._worker.postMessage({
      command: 'generateEmbeddings',
      prompt
    });

    return returnPromise;
  }

  /**
   * Generates a completion text representing text found in the given image.
   *
   * For use with OCR (Optical Character Recognition) models only.
   *
   * @param image Prompt image.
   * @param image.width Width of the image in pixels.
   * @param image.height Height of the image in pixels.
   * @param image.data Image pixel data in 8-bit, RGB format.
   * @param options Optional generate configuration arguments, see PicoLLMGenerateOCROptions for details.
   * @param options.completionTokenLimit Maximum number of tokens in the completion. If the generation process stops due
   * to reaching this limit, the `.endpoint` parameter in `PicoLLMCompletion` output will be
   * `PicoLLMEndpoint.COMPLETION_TOKEN_LIMIT_REACHED`. Set to `undefined` to impose no limit.
   * @param options.streamCallback If not set to `undefined`, picoLLM executes this callback every time a new piece of
   * completion text becomes available.
   * @param options.promptProgressCallback If not set to `undefined`, picoLLM uses this callback to report the prompt
   * evaluation progress as a floating-point number within (0, 100]. A value of 100 indicates that prompt evaluation is
   * complete and completion tokens are now being generated.
   * @returns Completion result.
   */
  async generateOCR(
    image: PicoLLMImage,
    options: PicoLLMGenerateOCROptions = {}
  ): Promise<PicoLLMCompletion> {
    const {
      completionTokenLimit = -1,
      streamCallback,
      promptProgressCallback
    } = options;

    const returnPromise: Promise<PicoLLMCompletion> = new Promise((resolve, reject) => {
      this._worker.removeAllListeners("message");
      this._worker.on("message", (response: PicoLLMWorkerGenerateOCRResponse): void => {
        switch (response.command) {
          case 'ok':
            resolve(response.completion);
            break;
          case 'stream':
            if (streamCallback) {
              streamCallback(response.token);
            }
            break;
          case 'progress':
            if (promptProgressCallback) {
              promptProgressCallback(response.progress);
            }
            break;
          case 'failed':
          case 'error':
            reject(pvStatusToException(response.status, response.message, response.messageStack));
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${response.command}`));
        }
      });
    });

    this._worker.postMessage({
      command: 'generateOCR',
      image,
      options: {
        completionTokenLimit,
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
  async tokenize(text: string, bos: boolean, eos: boolean): Promise<number[]> {
    const returnPromise: Promise<number[]> = new Promise((resolve, reject) => {
      this._worker.removeAllListeners("message");
      this._worker.on("message", (response: PicoLLMWorkerTokenizeResponse): void => {
        switch (response.command) {
          case 'ok':
            resolve(response.tokens);
            break;
          case 'failed':
          case 'error':
            reject(pvStatusToException(response.status, response.message, response.messageStack));
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${response.command}`));
        }
      });
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
  async forward(token: number): Promise<number[]> {
    const returnPromise: Promise<number[]> = new Promise((resolve, reject) => {
      this._worker.removeAllListeners("message");
      this._worker.on("message", (response: PicoLLMWorkerForwardResponse): void => {
        switch (response.command) {
          case 'ok':
            resolve(response.logits);
            break;
          case 'failed':
          case 'error':
            reject(pvStatusToException(response.status, response.message, response.messageStack));
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${response.command}`));
        }
      });
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
  async reset(): Promise<void> {
    const returnPromise: Promise<void> = new Promise((resolve, reject) => {
      this._worker.removeAllListeners("message");
      this._worker.on("message", (response: PicoLLMWorkerResetResponse): void => {
        switch (response.command) {
          case 'ok':
            resolve();
            break;
          case 'failed':
          case 'error':
            reject(pvStatusToException(response.status, response.message, response.messageStack));
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${response.command}`));
        }
      });
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
  getDialog(mode?: string, history: number = 0, system?: string): Dialog {
    const model = this._model.split(' ')[0].toLowerCase();
    if (model && DIALOGS[model] === undefined) {
      throw new PicoLLMRuntimeError(
        `'${this._model}' does not have a corresponding dialog implementation or is not instruction-tuned`
      );
    }

    if (typeof DIALOGS[model] === 'object') {
      const dialogObject = DIALOGS[model] as any as { [key: string]: typeof Dialog };
      if (mode) {
        if (!dialogObject[mode]) {
          throw new PicoLLMRuntimeError(
            `${this._model} doesn't have a '${mode}' model. Available modes are: '${Object.keys(dialogObject).join(', ')}'`
          );
        }
        const DialogClass = dialogObject[mode];
        return new DialogClass(history, system);
      }

      if (!dialogObject.default) {
        throw new PicoLLMRuntimeError(
          `${this._model} does require a 'mode'. Available modes are: '${Object.keys(dialogObject).join(', ')}'`
        );
      }
      const DialogClass = dialogObject.default;
      return new DialogClass(history, system);
    }

    if (mode) {
      throw new PicoLLMRuntimeError(
        `'${this._model}' doesn't accept a 'mode' parameter, set it to 'undefined'.`
      );
    }
    const DialogClass = DIALOGS[model] as any as typeof Dialog;
    return new DialogClass(history, system);
  }

  /**
   * Releases resources acquired by picoLLM.
   */
  async release(): Promise<void> {
    return PicoLLM.release(this._worker); 
  }

  static async release(worker: Worker): Promise<void> {
    const returnPromise: Promise<void> = new Promise((resolve, reject) => {
      worker.removeAllListeners("message");
      worker.on("message", (response: PicoLLMWorkerReleaseResponse): void => {
        switch (response.command) {
          case 'ok':
            worker.terminate().then(_ => {
              resolve();
            });
            break;
          case 'failed':
          case 'error':
            reject(pvStatusToException(response.status, response.message, response.messageStack));
            break;
          default:
            // @ts-ignore
            reject(pvStatusToException(PvStatus.RUNTIME_ERROR, `Unrecognized command: ${response.command}`));
        }
      });
    });

    worker.postMessage({
      command: 'release',
    });

    return returnPromise;
  }

  /**
   * Lists all available devices that picoLLM can use for inference. Each entry in the list can be the `device` argument
   * of the constructor.
   *
   * @returns List of all available devices that picoLLM can use for inference.
   */
  static listAvailableDevices(options: PicoLLMInputOptions = {}): string[] {
    const {
      libraryPath = getSystemLibraryPath(),
    } = options;

    const pvPicoLLM = require(libraryPath); // eslint-disable-line

    type PicoLLMHardwareDevicesResult = {
      hardware_devices: string[];
      status: PvStatus;
    };

    let picollmHardwareDevicesResult: PicoLLMHardwareDevicesResult | null = null;
    try {
      picollmHardwareDevicesResult = pvPicoLLM.list_hardware_devices();
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmHardwareDevicesResult!.status;
    if (status !== PvStatus.SUCCESS) {
      const errorObject = pvPicoLLM.get_error_stack();
      if (errorObject.status === PvStatus.SUCCESS) {
        pvStatusToException(status, 'PicoLLM failed to get available devices', errorObject.message_stack);
      } else {
        pvStatusToException(status, 'Unable to get PicoLLM error state');
      }
    }

    return picollmHardwareDevicesResult!.hardware_devices;
  }
}
