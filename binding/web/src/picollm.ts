/*
  Copyright 2024-2025 Picovoice Inc.

  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
  file accompanying this source.

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

/* eslint camelcase: 0 */

import { Mutex } from 'async-mutex';

import {
  arrayBufferToStringAtIndex,
  base64ToUint8Array,
  isAccessKeyValid,
  unsignedAddress,
} from '@picovoice/web-utils';

import { simd } from 'wasm-feature-detect';

import createModuleSimd from "./lib/pv_picollm_simd";
import createModulePThread from "./lib/pv_picollm_pthread";

import {
  PicoLLMModel,
  PvStatus,
  PicoLLMCompletion,
  PicoLLMInitOptions,
  PicoLLMGenerateOptions,
  PicoLLMUsage,
  PicoLLMEndpoint,
  PicoLLMCompletionToken,
  PicoLLMToken,
} from './types';

import * as PicoLLMErrors from './picollm_errors';
import { pvStatusToException } from './picollm_errors';

import { loadModel } from './utils';

import { Dialog, DIALOGS } from './dialog';

/**
 * WebAssembly function types
 */
type pv_picollm_init_type = (
  accessKey: number,
  modelPath: number,
  device: number,
  object: number
) => number;
type pv_picollm_delete_type = (object: number) => void;
type pv_picollm_generate_type = (
  object: number,
  prompt: number,
  completionTokenLimit: number,
  stopPhrases: number,
  numStopPhrases: number,
  seed: number,
  presencePenalty: number,
  frequencyPenalty: number,
  temperature: number,
  topP: number,
  num_top_choices: number,
  stream_callback: number,
  stream_callback_context: number,
  usage: number,
  endpoint: number,
  completion_tokens: number,
  num_completion_tokens: number,
  completion: number
) => number;
type pv_picollm_delete_completion_tokens_type = (
  object: number,
  numCompletionTokens: number
) => void;
type pv_picollm_interrupt_type = (object: number) => number;
type pv_picollm_delete_completion_type = (completion: number) => void;
type pv_picollm_tokenize_type = (
  object: number,
  text: number,
  bos: boolean,
  eos: boolean,
  numTokens: number,
  tokens: number
) => number;
type pv_picollm_delete_tokens_type = (tokens: number) => void;
type pv_picollm_forward_type = (
  object: number,
  token: number,
  numLogits: number,
  logits: number
) => number;
type pv_picollm_delete_logits_type = (logits: number) => void;
type pv_picollm_reset_type = (object: number) => number;
type pv_picollm_model_type = (object: number, model: number) => number;
type pv_picollm_context_length_type = (
  object: number,
  contextLength: number
) => number;
type pv_picollm_version_type = () => number;
type pv_picollm_max_top_choices_type = () => number;
type pv_picollm_list_hardware_devices_type = (
  hardwareDevices: number,
  numHardwareDevices: number
) => number;
type pv_picollm_free_hardware_devices_type = (
  hardwareDevices: number,
  numHardwareDevices: number
) => number;
type pv_set_sdk_type = (sdk: number) => void;
type pv_get_error_stack_type = (
  messageStack: number,
  messageStackDepth: number
) => number;
type pv_free_error_stack_type = (messageStack: number) => void;

/**
 * PicoLLM Module Type
 */

type PicoLLMModule = EmscriptenModule & {
  _pv_free: (address: number) => void;

  _pv_picollm_init: pv_picollm_init_type;
  _pv_picollm_interrupt: pv_picollm_interrupt_type;
  _pv_picollm_delete: pv_picollm_delete_type;
  _pv_picollm_delete_completion_tokens: pv_picollm_delete_completion_tokens_type;
  _pv_picollm_delete_completion: pv_picollm_delete_completion_type;
  _pv_picollm_delete_tokens: pv_picollm_delete_tokens_type;
  _pv_picollm_delete_logits: pv_picollm_delete_logits_type;
  _pv_picollm_tokenize: pv_picollm_tokenize_type;
  _pv_picollm_reset: pv_picollm_reset_type;

  _pv_picollm_model: pv_picollm_model_type;
  _pv_picollm_context_length: pv_picollm_context_length_type;
  _pv_picollm_version: pv_picollm_version_type;
  _pv_picollm_max_top_choices: pv_picollm_max_top_choices_type;

  _pv_picollm_list_hardware_devices: pv_picollm_list_hardware_devices_type;
  _pv_picollm_free_hardware_devices: pv_picollm_free_hardware_devices_type;

  _pv_set_sdk: pv_set_sdk_type;
  _pv_get_error_stack: pv_get_error_stack_type;
  _pv_free_error_stack: pv_free_error_stack_type;

  // em default functions
  addFunction: typeof addFunction;
  ccall: typeof ccall;
  cwrap: typeof cwrap;
}

type PicoLLMWasmOutput = {
  module: PicoLLMModule;

  pv_picollm_generate: pv_picollm_generate_type,
  pv_picollm_forward: pv_picollm_forward_type,

  contextLength: number;
  maxTopChoices: number;
  model: string;
  version: string;

  objectAddress: number;
  messageStackAddressAddressAddress: number;
  messageStackDepthAddress: number;
};

class PicoLLMStreamCallback {
  private readonly _module: PicoLLMModule;

  private _userCallback?: (token: string) => void;

  public constructor(module: PicoLLMModule) {
    this._module = module;
  }

  public setUserCallback(userCallback?: (token: string) => void): void {
    this._userCallback = userCallback;
  }

  public streamCallbackWasm = (tokenAddress: number): void => {
    if (this._module === undefined) {
      return;
    }

    const tokenAddressUnsigned = unsignedAddress(tokenAddress);
    const token = arrayBufferToStringAtIndex(
      this._module.HEAPU8,
      tokenAddressUnsigned
    );
    if (this._userCallback) {
      this._userCallback(token);
    }
  };
}


const DEFAULT_DEVICE = 'best';

/**
 * JavaScript/WebAssembly Binding for picoLLM.
 */
export class PicoLLM {
  private readonly _module: PicoLLMModule;
  private readonly _pv_picollm_generate: pv_picollm_generate_type;
  private readonly _pv_picollm_forward: pv_picollm_forward_type;

  private readonly _functionMutex: Mutex;

  private readonly _objectAddress: number;
  private readonly _messageStackAddressAddressAddress: number;
  private readonly _messageStackDepthAddress: number;

  private readonly _contextLength: number;
  private readonly _maxTopChoices: number;
  private readonly _model: string;
  private readonly _version: string;
  private readonly _streamCallback: PicoLLMStreamCallback;
  private readonly _streamCallbackFnPointer: number;

  private static _wasmSimd: string;
  private static _wasmSimdLib: string;
  private static _wasmPThread: string;
  private static _wasmPThreadLib: string;
  private static _sdk: string = 'web';

  private static _picoLLMMutex = new Mutex();

  private constructor(handleWasm: PicoLLMWasmOutput) {
    this._module = handleWasm.module;

    this._pv_picollm_generate = handleWasm.pv_picollm_generate;
    this._pv_picollm_forward = handleWasm.pv_picollm_forward;

    this._contextLength = handleWasm.contextLength;
    this._maxTopChoices = handleWasm.maxTopChoices;
    this._model = handleWasm.model;
    this._version = handleWasm.version;
    this._streamCallback = new PicoLLMStreamCallback(this._module);
    this._streamCallbackFnPointer = this._module.addFunction(this._streamCallback.streamCallbackWasm, 'vii');

    this._functionMutex = new Mutex();

    this._objectAddress = handleWasm.objectAddress;
    this._messageStackAddressAddressAddress =
      handleWasm.messageStackAddressAddressAddress;
    this._messageStackDepthAddress = handleWasm.messageStackDepthAddress;
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

  public static setSdk(sdk: string): void {
    PicoLLM._sdk = sdk;
  }

  /**
   * Creates an instance of picoLLM.
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
   * @returns An instance of the PicoLLM.
   */
  public static async create(
    accessKey: string,
    model: PicoLLMModel,
    options: PicoLLMInitOptions = {}
  ): Promise<PicoLLM> {
    const modelPath = await loadModel(model);

    return this._init(accessKey, modelPath, options);
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

  /**
   * Set base64 SIMD wasm file in text format.
   * @param wasmSimdLib Base64'd wasm file in text format.
   */
  public static setWasmSimdLib(wasmSimdLib: string): void {
    if (this._wasmSimdLib === undefined) {
      this._wasmSimdLib = wasmSimdLib;
    }
  }

  /**
   * Set base64 wasm file with SIMD and pthread feature.
   * @param wasmPThread Base64'd wasm file to use to initialize wasm.
   */
  public static setWasmPThread(wasmPThread: string): void {
    if (this._wasmPThread === undefined) {
      this._wasmPThread = wasmPThread;
    }
  }

  /**
   * Set base64 SIMD and thread wasm file in text format.
   * @param wasmPThreadLib Base64'd wasm file in text format.
   */
  public static setWasmPThreadLib(wasmPThreadLib: string): void {
    if (this._wasmPThreadLib === undefined) {
      this._wasmPThreadLib = wasmPThreadLib;
    }
  }

  private static invalidUserAgent(): boolean {
    const agent = navigator.userAgent;
    if (agent.includes('Safari')) {
      return agent.includes('Version/18.2') || agent.includes('Version/18.3');
    }

    return false;
  }

  public static async _init(
    accessKey: string,
    modelPath: string,
    options: PicoLLMInitOptions = {}
  ): Promise<PicoLLM> {
    if (this.invalidUserAgent()) {
      throw new PicoLLMErrors.PicoLLMRuntimeError('Unsupported Browser');
    }

    let { device = DEFAULT_DEVICE } = options;

    if (!isAccessKeyValid(accessKey)) {
      throw new PicoLLMErrors.PicoLLMInvalidArgumentError('Invalid AccessKey');
    }

    const isSimd = await simd();
    if (!isSimd) {
      throw new PicoLLMErrors.PicoLLMRuntimeError('Unsupported Browser');
    }

    const isWorkerScope =
      typeof WorkerGlobalScope !== 'undefined' &&
      self instanceof WorkerGlobalScope;
    if (
      !isWorkerScope &&
      (device === 'best' || (device.startsWith('cpu') && device !== 'cpu:1'))
    ) {
      // eslint-disable-next-line no-console
      console.warn('Multi-threading is not supported on main thread.');
      device = 'cpu:1';
    }

    const sabDefined = typeof SharedArrayBuffer !== 'undefined'
      && (device !== "cpu:1");

    return new Promise<PicoLLM>((resolve, reject) => {
      PicoLLM._picoLLMMutex
        .runExclusive(async () => {
          const wasmOutput = await PicoLLM.initWasm(
            accessKey,
            modelPath,
            device,
            (sabDefined) ? this._wasmPThread : this._wasmSimd,
            (sabDefined) ? this._wasmPThreadLib : this._wasmSimdLib,
            (sabDefined) ? createModulePThread : createModuleSimd,
          );
          return new PicoLLM(wasmOutput);
        })
        .then((result: PicoLLM) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
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

    return new Promise<PicoLLMCompletion>((resolve, reject) => {
      this._functionMutex
        .runExclusive(async () => {
          if (this._module === undefined) {
            throw new PicoLLMErrors.PicoLLMInvalidStateError(
              'Attempted to call PicoLLM generate after release.'
            );
          }

          const encoded = new TextEncoder().encode(prompt);

          const promptAddress = this._module._malloc((encoded.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
          if (promptAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for prompt'
            );
          }
          this._module.HEAPU8.set(encoded, promptAddress);
          this._module.HEAPU8[promptAddress + encoded.length] = 0;

          const stopPhrasesAddressAddress =
            stopPhrases.length === 0
              ? 0
              : this._module._malloc(stopPhrases.length * Int32Array.BYTES_PER_ELEMENT);

          const stopPhrasesAddressList: number[] = [];
          for (const stopPhrase of stopPhrases) {
            const stopPhrasesEncoded = new TextEncoder().encode(stopPhrase);
            const stopPhraseAddress = this._module._malloc((stopPhrasesEncoded.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
            if (stopPhraseAddress === 0) {
              throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
                'malloc failed: Cannot allocate memory for stopPhrase'
              );
            }
            this._module.HEAPU8.set(stopPhrasesEncoded, stopPhraseAddress);
            this._module.HEAPU8[stopPhraseAddress + stopPhrasesEncoded.length] = 0;
            stopPhrasesAddressList.push(stopPhraseAddress);
          }

          if (stopPhrasesAddressAddress > 0) {
            this._module.HEAP32.set(
              new Int32Array(stopPhrasesAddressList),
              stopPhrasesAddressAddress / Int32Array.BYTES_PER_ELEMENT
            );
          }

          const usageAddress = this._module._malloc(Int32Array.BYTES_PER_ELEMENT * 2);
          if (usageAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for usage'
            );
          }

          const endpointAddress = this._module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (endpointAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for endpoint'
            );
          }

          const numCompletionTokensAddress = this._module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (numCompletionTokensAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for numCompletionTokens'
            );
          }

          const completionTokensAddressAddress = this._module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (completionTokensAddressAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for completionTokens'
            );
          }

          const completionAddressAddress = this._module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (completionAddressAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for completion'
            );
          }

          let streamCallbackFnPointer = 0;
          if (streamCallback !== undefined) {
            this._streamCallback.setUserCallback(streamCallback);
            streamCallbackFnPointer = this._streamCallbackFnPointer;
          }

          const status = await this._pv_picollm_generate(
            this._objectAddress,
            promptAddress,
            completionTokenLimit,
            stopPhrasesAddressAddress,
            stopPhrasesAddressList.length,
            seed,
            presencePenalty,
            frequencyPenalty,
            temperature,
            topP,
            numTopChoices,
            streamCallbackFnPointer,
            0,
            usageAddress,
            endpointAddress,
            completionTokensAddressAddress,
            numCompletionTokensAddress,
            completionAddressAddress
          );

          this._module._pv_free(promptAddress);
          this._module._pv_free(stopPhrasesAddressAddress);
          for (const stopPhraseAddress of stopPhrasesAddressList) {
            this._module._pv_free(stopPhraseAddress);
          }

          if (status !== PvStatus.SUCCESS) {
            const messageStack = PicoLLM.getMessageStack(
              this._module._pv_get_error_stack,
              this._module._pv_free_error_stack,
              this._messageStackAddressAddressAddress,
              this._messageStackDepthAddress,
              this._module.HEAP32,
              this._module.HEAPU8
            );

            throw pvStatusToException(status, 'Generate failed', messageStack);
          }

          const usage: PicoLLMUsage = {
            promptTokens: this._module.HEAP32[usageAddress / Int32Array.BYTES_PER_ELEMENT],
            completionTokens: this._module.HEAP32[usageAddress / Int32Array.BYTES_PER_ELEMENT + 1],
          };
          this._module._pv_free(usageAddress);

          const endpoint: PicoLLMEndpoint = this._module.HEAP32[endpointAddress / Int32Array.BYTES_PER_ELEMENT];
          this._module._pv_free(endpointAddress);

          const numCompletionTokens = this._module.HEAP32[numCompletionTokensAddress / Int32Array.BYTES_PER_ELEMENT];
          this._module._pv_free(numCompletionTokensAddress);

          const completionTokensAddress = unsignedAddress(
            this._module.HEAP32[completionTokensAddressAddress / Int32Array.BYTES_PER_ELEMENT]
          );

          let completionTokensPtr = completionTokensAddress;
          const completionTokens: PicoLLMCompletionToken[] = [];
          for (let i = 0; i < numCompletionTokens; i++) {
            const tokenAddress = unsignedAddress(this._module.HEAP32[completionTokensPtr / Int32Array.BYTES_PER_ELEMENT]);
            const completionToken = arrayBufferToStringAtIndex(
              this._module.HEAPU8,
              tokenAddress
            );
            completionTokensPtr += Int32Array.BYTES_PER_ELEMENT;

            const completionLogProb = this._module.HEAPF32[completionTokensPtr / Float32Array.BYTES_PER_ELEMENT];
            completionTokensPtr += Float32Array.BYTES_PER_ELEMENT;

            const token: PicoLLMToken = {
              token: completionToken,
              logProb: completionLogProb,
            };

            const numTopChoicesReturn = this._module.HEAP32[completionTokensPtr / Int32Array.BYTES_PER_ELEMENT];
            completionTokensPtr += Int32Array.BYTES_PER_ELEMENT;

            const topChoices: PicoLLMToken[] = [];
            let topChoicesPtr = unsignedAddress(
              this._module.HEAP32[completionTokensPtr / Int32Array.BYTES_PER_ELEMENT]
            );
            for (let j = 0; j < numTopChoicesReturn; j++) {
              const topChoiceTokenAddress = unsignedAddress(
                this._module.HEAP32[topChoicesPtr / Int32Array.BYTES_PER_ELEMENT]
              );
              const topChoiceToken = arrayBufferToStringAtIndex(
                this._module.HEAPU8,
                topChoiceTokenAddress
              );
              topChoicesPtr += Int32Array.BYTES_PER_ELEMENT;

              const topChoiceLogProb = this._module.HEAPF32[topChoicesPtr / Float32Array.BYTES_PER_ELEMENT];
              topChoicesPtr += Float32Array.BYTES_PER_ELEMENT;

              topChoices.push({
                token: topChoiceToken,
                logProb: topChoiceLogProb,
              });
            }

            completionTokensPtr += Int32Array.BYTES_PER_ELEMENT;
            completionTokens.push({
              token,
              topChoices,
            });
          }

          this._module._pv_picollm_delete_completion_tokens(
            completionTokensAddress,
            numCompletionTokens
          );
          this._module._pv_free(completionTokensAddressAddress);
          const completionAddress = unsignedAddress(
            this._module.HEAP32[completionAddressAddress / Int32Array.BYTES_PER_ELEMENT]
          );
          const completion = arrayBufferToStringAtIndex(
            this._module.HEAPU8,
            completionAddress
          );

          this._module._pv_picollm_delete_completion(completionAddress);
          this._module._pv_free(completionAddressAddress);
          return {
            usage,
            endpoint,
            completionTokens,
            completion,
          };
        })
        .then((result: PicoLLMCompletion) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * Interrupts `generate()` if generation is in progress. Otherwise, it has no effect.
   */
  public async interrupt(): Promise<void> {
    if (this._module === undefined) {
      throw new PicoLLMErrors.PicoLLMInvalidStateError(
        'Attempted to call PicoLLM interrupt after release.'
      );
    }

    const status = await this._module._pv_picollm_interrupt(this._objectAddress);
    if (status !== PvStatus.SUCCESS) {
      throw pvStatusToException(status, 'Interrupt failed');
    }
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
    return new Promise<number[]>((resolve, reject) => {
      this._functionMutex
        .runExclusive(async () => {
          if (this._module === undefined) {
            throw new PicoLLMErrors.PicoLLMInvalidStateError(
              'Attempted to call PicoLLM tokenize after release.'
            );
          }

          const encoded = new TextEncoder().encode(text);

          const textAddress = this._module._malloc((encoded.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
          if (textAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for text'
            );
          }
          this._module.HEAPU8.set(encoded, textAddress);
          this._module.HEAPU8[textAddress + encoded.length] = 0;

          const numTokensAddress = this._module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (numTokensAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for numTokens'
            );
          }

          const tokensAddressAddress = this._module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (tokensAddressAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for tokens'
            );
          }

          const status = this._module._pv_picollm_tokenize(
            this._objectAddress,
            textAddress,
            bos,
            eos,
            numTokensAddress,
            tokensAddressAddress
          );
          this._module._pv_free(textAddress);

          if (status !== PvStatus.SUCCESS) {
            const messageStack = PicoLLM.getMessageStack(
              this._module._pv_get_error_stack,
              this._module._pv_free_error_stack,
              this._messageStackAddressAddressAddress,
              this._messageStackDepthAddress,
              this._module.HEAP32,
              this._module.HEAPU8
            );

            throw pvStatusToException(status, 'Tokenize failed', messageStack);
          }

          const numTokens = this._module.HEAP32[numTokensAddress / Int32Array.BYTES_PER_ELEMENT];
          this._module._pv_free(numTokensAddress);

          const tokens: number[] = [];
          const tokensAddress = unsignedAddress(
            this._module.HEAP32[tokensAddressAddress / Int32Array.BYTES_PER_ELEMENT]
          );
          for (let i = 0; i < numTokens; i++) {
            tokens.push(
              this._module.HEAP32[tokensAddress / Int32Array.BYTES_PER_ELEMENT + i]
            );
          }

          this._module._pv_picollm_delete_tokens(tokensAddress);
          this._module._pv_free(tokensAddressAddress);

          return tokens;
        })
        .then((result: number[]) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * Performs a single forward pass given a token and returns the logits. This is a low-level function for
   * benchmarking and advanced usage. `.generate()` should be used when possible.
   *
   * @param token Input token.
   * @returns Logits.
   */
  public async forward(token: number): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      this._functionMutex
        .runExclusive(async () => {
          if (this._module === undefined) {
            throw new PicoLLMErrors.PicoLLMInvalidStateError(
              'Attempted to call PicoLLM forward after release.'
            );
          }

          const numLogitsAddress = this._module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (numLogitsAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for numLogits'
            );
          }

          const logitsAddressAddress = this._module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (logitsAddressAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for logits'
            );
          }

          const status = await this._pv_picollm_forward(
            this._objectAddress,
            token,
            numLogitsAddress,
            logitsAddressAddress
          );

          if (status !== PvStatus.SUCCESS) {
            const messageStack = PicoLLM.getMessageStack(
              this._module._pv_get_error_stack,
              this._module._pv_free_error_stack,
              this._messageStackAddressAddressAddress,
              this._messageStackDepthAddress,
              this._module.HEAP32,
              this._module.HEAPU8
            );

            throw pvStatusToException(status, 'Forward failed', messageStack);
          }

          const numLogits = this._module.HEAP32[numLogitsAddress / Int32Array.BYTES_PER_ELEMENT];
          this._module._pv_free(numLogitsAddress);

          const logits: number[] = [];
          const logitsAddress = unsignedAddress(this._module.HEAP32[logitsAddressAddress / Int32Array.BYTES_PER_ELEMENT]);
          for (let i = 0; i < numLogits; i++) {
            logits.push(this._module.HEAPF32[logitsAddress / Float32Array.BYTES_PER_ELEMENT + i]);
          }

          this._module._pv_picollm_delete_logits(logitsAddress);
          this._module._pv_free(logitsAddressAddress);

          return logits;
        })
        .then((result: number[]) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * Resets the internal state of LLM. It should be called in conjunction with `.forward()` when processing a new
   * sequence of tokens. This is a low-level function for benchmarking and advanced usage. `.generate()` should be
   * used when possible.
   */
  public async reset(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._functionMutex
        .runExclusive(async () => {
          if (this._module === undefined) {
            throw new PicoLLMErrors.PicoLLMInvalidStateError(
              'Attempted to call PicoLLM forward after release.'
            );
          }
          const status = this._module._pv_picollm_reset(this._objectAddress);

          if (status !== PvStatus.SUCCESS) {
            const messageStack = PicoLLM.getMessageStack(
              this._module._pv_get_error_stack,
              this._module._pv_free_error_stack,
              this._messageStackAddressAddressAddress,
              this._messageStackDepthAddress,
              this._module.HEAP32,
              this._module.HEAPU8
            );

            throw pvStatusToException(status, 'Reset failed', messageStack);
          }
        })
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
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
  public async release(): Promise<void> {
    if (!this._module) {
      return;
    }

    this._module._pv_picollm_delete(this._objectAddress);
    this._module._pv_free(this._messageStackAddressAddressAddress);
    this._module._pv_free(this._messageStackDepthAddress);
  }

  /**
   * Lists all available devices that picoLLM can use for inference. Each entry in the list can be the `device` argument
   * of `.create` method.
   *
   * @returns List of all available devices that picoLLM can use for inference.
   */
  public static async listAvailableDevices(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      PicoLLM._picoLLMMutex
        .runExclusive(async () => {
          const isSimd = await simd();
          if (!isSimd) {
            throw new PicoLLMErrors.PicoLLMRuntimeError('Unsupported Browser');
          }

          const blob = new Blob(
            [base64ToUint8Array(this._wasmSimdLib)],
            { type: 'application/javascript' }
          );
          const module: PicoLLMModule = await createModuleSimd({
            mainScriptUrlOrBlob: blob,
            wasmBinary: base64ToUint8Array(this._wasmSimd),
          });

          const hardwareDevicesAddressAddress = module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (hardwareDevicesAddressAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for hardwareDevices'
            );
          }

          const numHardwareDevicesAddress = module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (numHardwareDevicesAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for numHardwareDevices'
            );
          }

          const status: PvStatus = await module._pv_picollm_list_hardware_devices(
            hardwareDevicesAddressAddress,
            numHardwareDevicesAddress
          );

          const messageStackDepthAddress = module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (!messageStackDepthAddress) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for messageStackDepth'
            );
          }

          const messageStackAddressAddressAddress = module._malloc(Int32Array.BYTES_PER_ELEMENT);
          if (!messageStackAddressAddressAddress) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory messageStack'
            );
          }

          if (status !== PvStatus.SUCCESS) {
            const messageStack = PicoLLM.getMessageStack(
              module._pv_get_error_stack,
              module._pv_free_error_stack,
              messageStackAddressAddressAddress,
              messageStackDepthAddress,
              module.HEAP32,
              module.HEAPU8,
            );
            module._pv_free(messageStackAddressAddressAddress);
            module._pv_free(messageStackDepthAddress);

            throw pvStatusToException(
              status,
              'Get context length failed',
              messageStack
            );
          }
          module._pv_free(messageStackAddressAddressAddress);
          module._pv_free(messageStackDepthAddress);

          const numHardwareDevices: number = module.HEAP32[numHardwareDevicesAddress / Int32Array.BYTES_PER_ELEMENT];
          module._pv_free(numHardwareDevicesAddress);

          const hardwareDevicesAddress = unsignedAddress(module.HEAP32[hardwareDevicesAddressAddress / Int32Array.BYTES_PER_ELEMENT]);

          const hardwareDevices: string[] = [];
          for (let i = 0; i < numHardwareDevices; i++) {
            const deviceAddress = module.HEAP32[hardwareDevicesAddress / Int32Array.BYTES_PER_ELEMENT + i];
            hardwareDevices.push(arrayBufferToStringAtIndex(module.HEAPU8, deviceAddress));
          }
          module._pv_picollm_free_hardware_devices(
            hardwareDevicesAddress,
            numHardwareDevices
          );
          module._pv_free(hardwareDevicesAddressAddress);

          return hardwareDevices;
        })
        .then((result: string[]) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  private static async initWasm(
    accessKey: string,
    modelPath: string,
    device: string,
    wasmBase64: string,
    wasmLibBase64: string,
    createModuleFunc: any
  ): Promise<PicoLLMWasmOutput> {
    const blob = new Blob(
      [base64ToUint8Array(wasmLibBase64)],
      { type: 'application/javascript' }
    );
    const module: PicoLLMModule = await createModuleFunc({
      mainScriptUrlOrBlob: blob,
      wasmBinary: base64ToUint8Array(wasmBase64),
    });

    // setup async functions
    const pv_picollm_init: pv_picollm_init_type = this.wrapAsyncFunction(module, "pv_picollm_init", 4);
    const pv_picollm_generate: pv_picollm_generate_type = this.wrapAsyncFunction(module, "pv_picollm_generate", 18);
    const pv_picollm_forward: pv_picollm_forward_type = this.wrapAsyncFunction(module, "pv_picollm_forward", 6);

    const objectAddressAddress = module._malloc(Int32Array.BYTES_PER_ELEMENT);
    if (objectAddressAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }

    const accessKeyAddress = module._malloc((accessKey.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
    if (accessKeyAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }
    for (let i = 0; i < accessKey.length; i++) {
      module.HEAPU8[accessKeyAddress + i] = accessKey.charCodeAt(i);
    }
    module.HEAPU8[accessKeyAddress + accessKey.length] = 0;

    const modelPathEncoded = new TextEncoder().encode(modelPath);
    const modelPathAddress = module._malloc((modelPathEncoded.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
    if (modelPathAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }

    module.HEAPU8.set(modelPathEncoded, modelPathAddress);
    module.HEAPU8[modelPathAddress + modelPathEncoded.length] = 0;

    const deviceAddress = module._malloc((device.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
    if (deviceAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }
    for (let i = 0; i < device.length; i++) {
      module.HEAPU8[deviceAddress + i] = device.charCodeAt(i);
    }
    module.HEAPU8[deviceAddress + device.length] = 0;

    const sdkEncoded = new TextEncoder().encode(this._sdk);
    const sdkAddress = module._malloc((sdkEncoded.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
    if (!sdkAddress) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }
    module.HEAPU8.set(sdkEncoded, sdkAddress);
    module.HEAPU8[sdkAddress + sdkEncoded.length] = 0;
    module._pv_set_sdk(sdkAddress);

    const messageStackDepthAddress = module._malloc(Int32Array.BYTES_PER_ELEMENT);
    if (!messageStackDepthAddress) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }

    const messageStackAddressAddressAddress = module._malloc(Int32Array.BYTES_PER_ELEMENT);
    if (!messageStackAddressAddressAddress) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }

    let status: PvStatus = await pv_picollm_init(
      accessKeyAddress,
      modelPathAddress,
      deviceAddress,
      objectAddressAddress
    );

    module._pv_free(accessKeyAddress);
    module._pv_free(modelPathAddress);
    module._pv_free(deviceAddress);

    if (status !== PvStatus.SUCCESS) {
      const messageStack = PicoLLM.getMessageStack(
        module._pv_get_error_stack,
        module._pv_free_error_stack,
        messageStackAddressAddressAddress,
        messageStackDepthAddress,
        module.HEAP32,
        module.HEAPU8,
      );

      throw pvStatusToException(
        status,
        'Initialization failed',
        messageStack,
      );
    }

    const objectAddress = module.HEAP32[objectAddressAddress / Int32Array.BYTES_PER_ELEMENT];
    module._pv_free(objectAddressAddress);

    const maxTopChoices = module._pv_picollm_max_top_choices();

    const versionAddress = module._pv_picollm_version();
    const version = arrayBufferToStringAtIndex(
      module.HEAPU8,
      versionAddress
    );

    const contextLengthAddress = module._malloc(Int32Array.BYTES_PER_ELEMENT);
    if (contextLengthAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }

    status = module._pv_picollm_context_length(
      objectAddress,
      contextLengthAddress
    );
    if (status !== PvStatus.SUCCESS) {
      const messageStack = PicoLLM.getMessageStack(
        module._pv_get_error_stack,
        module._pv_free_error_stack,
        messageStackAddressAddressAddress,
        messageStackDepthAddress,
        module.HEAP32,
        module.HEAPU8
      );

      throw pvStatusToException(
        status,
        'Get context length failed',
        messageStack,
      );
    }

    const contextLength = module.HEAP32[contextLengthAddress / Int32Array.BYTES_PER_ELEMENT];
    module._pv_free(contextLengthAddress);

    const modelAddressAddress = module._malloc(Int32Array.BYTES_PER_ELEMENT);
    if (modelAddressAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }
    status = module._pv_picollm_model(objectAddress, modelAddressAddress);
    if (status !== PvStatus.SUCCESS) {
      const messageStack = PicoLLM.getMessageStack(
        module._pv_get_error_stack,
        module._pv_free_error_stack,
        messageStackAddressAddressAddress,
        messageStackDepthAddress,
        module.HEAP32,
        module.HEAPU8
      );

      throw pvStatusToException(
        status,
        'Failed to get model name',
        messageStack,
      );
    }

    const modelAddress = module.HEAP32[modelAddressAddress / Int32Array.BYTES_PER_ELEMENT];
    module._pv_free(modelAddressAddress);
    const model = arrayBufferToStringAtIndex(module.HEAPU8, modelAddress);

    return {
      module: module,

      pv_picollm_generate: pv_picollm_generate,
      pv_picollm_forward: pv_picollm_forward,

      contextLength: contextLength,
      maxTopChoices: maxTopChoices,
      model: model,
      version: version,

      objectAddress: objectAddress,
      messageStackAddressAddressAddress: messageStackAddressAddressAddress,
      messageStackDepthAddress: messageStackDepthAddress,
    };
  }

  private static getMessageStack(
    pv_get_error_stack: pv_get_error_stack_type,
    pv_free_error_stack: pv_free_error_stack_type,
    messageStackAddressAddressAddress: number,
    messageStackDepthAddress: number,
    memoryBufferInt32: Int32Array,
    memoryBufferUint8: Uint8Array,
  ): string[] {
    const status = pv_get_error_stack(messageStackAddressAddressAddress, messageStackDepthAddress);
    if (status !== PvStatus.SUCCESS) {
      throw new Error(`Unable to get error state: ${status}`);
    }

    const messageStackAddressAddress = memoryBufferInt32[messageStackAddressAddressAddress / Int32Array.BYTES_PER_ELEMENT];

    const messageStackDepth = memoryBufferInt32[messageStackDepthAddress / Int32Array.BYTES_PER_ELEMENT];
    const messageStack: string[] = [];
    for (let i = 0; i < messageStackDepth; i++) {
      const messageStackAddress = memoryBufferInt32[
        (messageStackAddressAddress / Int32Array.BYTES_PER_ELEMENT) + i];
      const message = arrayBufferToStringAtIndex(memoryBufferUint8, messageStackAddress);
      messageStack.push(message);
    }

    pv_free_error_stack(messageStackAddressAddress);

    return messageStack;
  }

  private static wrapAsyncFunction(module: PicoLLMModule, functionName: string, numArgs: number): (...args: any[]) => any {
    // @ts-ignore
    return module.cwrap(
      functionName,
      "number",
      Array(numArgs).fill("number"),
      { async: true }
    );
  }
}
