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

export class PicoLLMWorker {
  private readonly _worker: Worker;
  private readonly _version: string;
  private readonly _contextLength: number;
  private readonly _maxTopChoices: number;
  private readonly _model: string;

  private static _wasm: string;
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
   * Creates an instance of PicoLLM.
   *
   * @param accessKey
   * @param model
   * @param options Optional init configuration arguments, see PicoLLMInitOptions for details.
   *
   * @returns An instance of the PicoLLM.
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
      device: device,
      sdk: this._sdk,
      wasm: this._wasm,
      wasmSimd: this._wasmSimd,
    });

    return returnPromise;
  }

  /**
   * Set base64 wasm file.
   * @param wasm Base64'd wasm file to use to initialize wasm.
   */
  public static setWasm(wasm: string): void {
    if (this._wasm === undefined) {
      this._wasm = wasm;
    }
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
   *
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
