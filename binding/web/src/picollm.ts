/*
  Copyright 2024 Picovoice Inc.

  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
  file accompanying this source.

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

/* eslint camelcase: 0 */

import { Mutex } from 'async-mutex';

import {
  aligned_alloc_type,
  arrayBufferToStringAtIndex,
  base64ToUint8Array,
  buildWasm,
  isAccessKeyValid,
  pv_free_type,
  PvError,
  unsignedAddress,
} from '@picovoice/web-utils';

import { simd } from 'wasm-feature-detect';

import initXpu from 'pv-xpu-web-worker';

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

import picoLLMWebWorkerHelperSimd from '../lib/pv_picollm_web_worker_helper_simd.wasm';
import { loadModel } from './utils';

import { Dialog, DIALOGS } from './dialog';

export class PicoLLMStreamCallback {
  private _wasmMemory: WebAssembly.Memory | undefined;

  private _userCallback?: (token: string) => void;

  public constructor(memory: WebAssembly.Memory) {
    this._wasmMemory = memory;
  }

  public release(): void {
    this._wasmMemory = undefined;
  }

  public setUserCallback(userCallback?: (token: string) => void): void {
    this._userCallback = userCallback;
  }

  public streamCallbackWasm = (tokenAddress: number): void => {
    if (this._wasmMemory === undefined) {
      return;
    }

    const tokenAddressUnsigned = unsignedAddress(tokenAddress);
    const memoryBufferUint8 = new Uint8Array(this._wasmMemory.buffer);
    const token = arrayBufferToStringAtIndex(
      memoryBufferUint8,
      tokenAddressUnsigned
    );
    if (this._userCallback) {
      this._userCallback(token);
    }
  };
}

/**
 * WebAssembly function types
 */
type pv_picollm_init_type = (
  accessKey: number,
  modelPath: number,
  device: number,
  object: number
) => Promise<number>;
type pv_picollm_delete_type = (object: number) => Promise<void>;
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
) => Promise<number>;
type pv_picollm_delete_completion_tokens_type = (
  object: number,
  numCompletionTokens: number
) => Promise<void>;
type pv_picollm_delete_completion_type = (completion: number) => Promise<void>;
type pv_picollm_tokenize_type = (
  object: number,
  text: number,
  bos: boolean,
  eos: boolean,
  numTokens: number,
  tokens: number
) => Promise<number>;
type pv_picollm_delete_tokens_type = (tokens: number) => Promise<void>;
type pv_picollm_forward_type = (
  object: number,
  token: number,
  numLogits: number,
  logits: number
) => Promise<number>;
type pv_picollm_delete_logits_type = (logits: number) => Promise<void>;
type pv_picollm_reset_type = (object: number) => Promise<number>;
type pv_picollm_model_type = (object: number, model: number) => Promise<number>;
type pv_picollm_context_length_type = (
  object: number,
  contextLength: number
) => Promise<number>;
type pv_picollm_version_type = () => Promise<number>;
type pv_picollm_max_top_choices_type = () => Promise<number>;
type pv_picollm_list_hardware_devices_type = (
  hardwareDevices: number,
  numHardwareDevices: number
) => Promise<number>;
type pv_picollm_free_hardware_devices_type = (
  hardwareDevices: number,
  numHardwareDevices: number
) => Promise<void>;
type pv_set_sdk_type = (sdk: number) => Promise<void>;
type pv_get_error_stack_type = (
  messageStack: number,
  messageStackDepth: number
) => Promise<number>;
type pv_free_error_stack_type = (messageStack: number) => Promise<void>;

/**
 * JavaScript/WebAssembly Binding for picoLLM.
 */

type PicoLLMWasmOutput = {
  aligned_alloc: aligned_alloc_type;
  memory: WebAssembly.Memory;
  pvFree: pv_free_type;

  contextLength: number;
  maxTopChoices: number;
  model: string;
  version: string;
  streamCallback: PicoLLMStreamCallback;

  objectAddress: number;
  messageStackAddressAddressAddress: number;
  messageStackDepthAddress: number;

  pvPicoLLMDelete: pv_picollm_delete_type;
  pvPicoLLMGenerate: pv_picollm_generate_type;
  pvPicoLLMDeleteCompletionTokens: pv_picollm_delete_completion_tokens_type;
  pvPicoLLMDeleteCompletion: pv_picollm_delete_completion_type;
  pvPicoLLMTokenize: pv_picollm_tokenize_type;
  pvPicoLLMDeleteTokens: pv_picollm_delete_tokens_type;
  pvPicoLLMForward: pv_picollm_forward_type;
  pvPicoLLMDeleteLogits: pv_picollm_delete_logits_type;
  pvPicoLLMReset: pv_picollm_reset_type;
  pvGetErrorStack: pv_get_error_stack_type;
  pvFreeErrorStack: pv_free_error_stack_type;
};

const DEFAULT_DEVICE = 'best';

export class PicoLLM {
  private readonly _pvPicoLLMDelete: pv_picollm_delete_type;
  private readonly _pvPicoLLMGenerate: pv_picollm_generate_type;
  private readonly _pvPicoLLMDeleteCompletionTokens: pv_picollm_delete_completion_tokens_type;
  private readonly _pvPicoLLMDeleteCompletion: pv_picollm_delete_completion_type;
  private readonly _pvPicoLLMTokenize: pv_picollm_tokenize_type;
  private readonly _pvPicoLLMDeleteTokens: pv_picollm_delete_tokens_type;
  private readonly _pvPicoLLMForward: pv_picollm_forward_type;
  private readonly _pvPicoLLMDeleteLogits: pv_picollm_delete_logits_type;
  private readonly _pvPicoLLMReset: pv_picollm_reset_type;
  private readonly _pvGetErrorStack: pv_get_error_stack_type;
  private readonly _pvFreeErrorStack: pv_free_error_stack_type;

  private _wasmMemory: WebAssembly.Memory | undefined;
  private readonly _aligned_alloc: aligned_alloc_type;
  private readonly _pvFree: pv_free_type;
  private readonly _functionMutex: Mutex;

  private readonly _objectAddress: number;
  private readonly _messageStackAddressAddressAddress: number;
  private readonly _messageStackDepthAddress: number;

  private readonly _contextLength: number;
  private readonly _maxTopChoices: number;
  private readonly _model: string;
  private readonly _version: string;
  private readonly _streamCallback: PicoLLMStreamCallback;

  private static _wasmSimd: string;
  private static _sdk: string = 'web';

  private static _picoLLMMutex = new Mutex();

  private constructor(handleWasm: PicoLLMWasmOutput) {
    this._contextLength = handleWasm.contextLength;
    this._maxTopChoices = handleWasm.maxTopChoices;
    this._model = handleWasm.model;
    this._version = handleWasm.version;
    this._streamCallback = handleWasm.streamCallback;

    this._pvPicoLLMDelete = handleWasm.pvPicoLLMDelete;
    this._pvPicoLLMGenerate = handleWasm.pvPicoLLMGenerate;
    this._pvPicoLLMDeleteCompletionTokens =
      handleWasm.pvPicoLLMDeleteCompletionTokens;
    this._pvPicoLLMDeleteCompletion = handleWasm.pvPicoLLMDeleteCompletion;
    this._pvPicoLLMTokenize = handleWasm.pvPicoLLMTokenize;
    this._pvPicoLLMDeleteTokens = handleWasm.pvPicoLLMDeleteTokens;
    this._pvPicoLLMForward = handleWasm.pvPicoLLMForward;
    this._pvPicoLLMDeleteLogits = handleWasm.pvPicoLLMDeleteLogits;
    this._pvPicoLLMReset = handleWasm.pvPicoLLMReset;

    this._pvGetErrorStack = handleWasm.pvGetErrorStack;
    this._pvFreeErrorStack = handleWasm.pvFreeErrorStack;

    this._wasmMemory = handleWasm.memory;
    this._pvFree = handleWasm.pvFree;
    this._aligned_alloc = handleWasm.aligned_alloc;

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

  public static async _init(
    accessKey: string,
    modelPath: string,
    options: PicoLLMInitOptions = {}
  ): Promise<PicoLLM> {
    const { device = DEFAULT_DEVICE } = options;

    if (!isAccessKeyValid(accessKey)) {
      throw new PicoLLMErrors.PicoLLMInvalidArgumentError('Invalid AccessKey');
    }

    return new Promise<PicoLLM>((resolve, reject) => {
      PicoLLM._picoLLMMutex
        .runExclusive(async () => {
          const isSimd = await simd();
          if (!isSimd) {
            throw new PicoLLMErrors.PicoLLMRuntimeError('Unsupported Browser');
          }

          const wasmOutput = await PicoLLM.initWasm(
            this._wasmSimd,
            accessKey,
            modelPath,
            device
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

    this._streamCallback.setUserCallback(streamCallback);

    return new Promise<PicoLLMCompletion>((resolve, reject) => {
      this._functionMutex
        .runExclusive(async () => {
          if (this._wasmMemory === undefined) {
            throw new PicoLLMErrors.PicoLLMInvalidStateError(
              'Attempted to call PicoLLM generate after release.'
            );
          }

          let memoryBufferUint8 = new Uint8Array(this._wasmMemory.buffer);

          const encoded = new TextEncoder().encode(prompt);

          const promptAddress = await this._aligned_alloc(
            Uint8Array.BYTES_PER_ELEMENT,
            (encoded.length + 1) * Uint8Array.BYTES_PER_ELEMENT
          );
          if (promptAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for prompt'
            );
          }
          memoryBufferUint8.set(encoded, promptAddress);
          memoryBufferUint8[promptAddress + encoded.length] = 0;

          const stopPhrasesAddressAddress =
            stopPhrases.length === 0
              ? 0
              : await this._aligned_alloc(
                Int32Array.BYTES_PER_ELEMENT,
                stopPhrases.length * Int32Array.BYTES_PER_ELEMENT
              );

          const stopPhrasesAddressList: number[] = [];
          for (const stopPhrase of stopPhrases) {
            const stopPhrasesEncoded = new TextEncoder().encode(stopPhrase);
            const stopPhraseAddress = await this._aligned_alloc(
              Uint8Array.BYTES_PER_ELEMENT,
              (stopPhrasesEncoded.length + 1) * Uint8Array.BYTES_PER_ELEMENT
            );
            if (stopPhraseAddress === 0) {
              throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
                'malloc failed: Cannot allocate memory for stopPhrase'
              );
            }
            memoryBufferUint8.set(stopPhrasesEncoded, stopPhraseAddress);
            memoryBufferUint8[
              stopPhraseAddress + stopPhrasesEncoded.length
            ] = 0;
            stopPhrasesAddressList.push(stopPhraseAddress);
          }

          const memoryBufferInt32 = new Int32Array(this._wasmMemory.buffer);
          if (stopPhrasesAddressAddress > 0) {
            memoryBufferInt32.set(
              new Int32Array(stopPhrasesAddressList),
              stopPhrasesAddressAddress / Int32Array.BYTES_PER_ELEMENT
            );
          }

          const usageAddress = await this._aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT * 2
          );
          if (usageAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for usage'
            );
          }

          const endpointAddress = await this._aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (endpointAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for endpoint'
            );
          }

          const numCompletionTokensAddress = await this._aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (numCompletionTokensAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for numCompletionTokens'
            );
          }

          const completionTokensAddressAddress = await this._aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (completionTokensAddressAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for completionTokens'
            );
          }

          const completionAddressAddress = await this._aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (completionAddressAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for completion'
            );
          }

          const status = await this._pvPicoLLMGenerate(
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
            0,
            0,
            usageAddress,
            endpointAddress,
            completionTokensAddressAddress,
            numCompletionTokensAddress,
            completionAddressAddress
          );

          memoryBufferUint8 = new Uint8Array(this._wasmMemory.buffer);
          await this._pvFree(promptAddress);
          await this._pvFree(stopPhrasesAddressAddress);
          for (const stopPhraseAddress of stopPhrasesAddressList) {
            await this._pvFree(stopPhraseAddress);
          }

          const memoryBufferView = new DataView(this._wasmMemory.buffer);
          if (status !== PvStatus.SUCCESS) {
            const messageStack = await PicoLLM.getMessageStack(
              this._pvGetErrorStack,
              this._pvFreeErrorStack,
              this._messageStackAddressAddressAddress,
              this._messageStackDepthAddress,
              memoryBufferView,
              memoryBufferUint8
            );

            throw pvStatusToException(status, 'Generate failed', messageStack);
          }

          const usage: PicoLLMUsage = {
            promptTokens: memoryBufferView.getInt32(usageAddress, true),
            completionTokens: memoryBufferView.getInt32(
              usageAddress + Int32Array.BYTES_PER_ELEMENT,
              true
            ),
          };
          await this._pvFree(usageAddress);

          const endpoint: PicoLLMEndpoint = memoryBufferView.getInt32(
            endpointAddress,
            true
          );
          await this._pvFree(endpointAddress);

          const numCompletionTokens = memoryBufferView.getInt32(
            numCompletionTokensAddress,
            true
          );
          await this._pvFree(numCompletionTokensAddress);

          const completionTokensAddress = unsignedAddress(
            memoryBufferView.getInt32(completionTokensAddressAddress, true)
          );

          let completionTokensPtr = completionTokensAddress;
          const completionTokens: PicoLLMCompletionToken[] = [];
          for (let i = 0; i < numCompletionTokens; i++) {
            const tokenAddress = memoryBufferView.getInt32(
              completionTokensPtr,
              true
            );
            const completionToken = arrayBufferToStringAtIndex(
              memoryBufferUint8,
              tokenAddress
            );
            completionTokensPtr += Int32Array.BYTES_PER_ELEMENT;

            const completionLogProb = memoryBufferView.getFloat32(
              completionTokensPtr,
              true
            );
            completionTokensPtr += Float32Array.BYTES_PER_ELEMENT;

            const token: PicoLLMToken = {
              token: completionToken,
              logProb: completionLogProb,
            };

            const numTopChoicesReturn = memoryBufferView.getInt32(
              completionTokensPtr,
              true
            );
            completionTokensPtr += Int32Array.BYTES_PER_ELEMENT;

            const topChoices: PicoLLMToken[] = [];
            let topChoicesPtr = unsignedAddress(
              memoryBufferView.getInt32(completionTokensPtr, true)
            );
            for (let j = 0; j < numTopChoicesReturn; j++) {
              const topChoiceTokenAddress = unsignedAddress(
                memoryBufferView.getInt32(topChoicesPtr, true)
              );
              const topChoiceToken = arrayBufferToStringAtIndex(
                memoryBufferUint8,
                topChoiceTokenAddress
              );
              topChoicesPtr += Int32Array.BYTES_PER_ELEMENT;

              const topChoiceLogProb = memoryBufferView.getFloat32(
                topChoicesPtr,
                true
              );
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

          await this._pvPicoLLMDeleteCompletionTokens(
            completionTokensAddress,
            numCompletionTokens
          );
          await this._pvFree(completionTokensAddressAddress);

          const completionAddress = unsignedAddress(
            memoryBufferView.getInt32(completionAddressAddress, true)
          );
          const completion = arrayBufferToStringAtIndex(
            memoryBufferUint8,
            completionAddress
          );

          await this._pvPicoLLMDeleteCompletion(completionAddress);
          await this._pvFree(completionAddressAddress);

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
          if (this._wasmMemory === undefined) {
            throw new PicoLLMErrors.PicoLLMInvalidStateError(
              'Attempted to call PicoLLM tokenize after release.'
            );
          }

          let memoryBufferUint8 = new Uint8Array(this._wasmMemory.buffer);

          const encoded = new TextEncoder().encode(text);

          const textAddress = await this._aligned_alloc(
            Uint8Array.BYTES_PER_ELEMENT,
            (encoded.length + 1) * Uint8Array.BYTES_PER_ELEMENT
          );
          if (textAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for text'
            );
          }
          memoryBufferUint8.set(encoded, textAddress);
          memoryBufferUint8[textAddress + encoded.length] = 0;

          const numTokensAddress = await this._aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (numTokensAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for numTokens'
            );
          }

          const tokensAddressAddress = await this._aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (tokensAddressAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for tokens'
            );
          }

          const status = await this._pvPicoLLMTokenize(
            this._objectAddress,
            textAddress,
            bos,
            eos,
            numTokensAddress,
            tokensAddressAddress
          );

          memoryBufferUint8 = new Uint8Array(this._wasmMemory.buffer);
          await this._pvFree(textAddress);

          const memoryBufferView = new DataView(this._wasmMemory.buffer);
          if (status !== PvStatus.SUCCESS) {
            const messageStack = await PicoLLM.getMessageStack(
              this._pvGetErrorStack,
              this._pvFreeErrorStack,
              this._messageStackAddressAddressAddress,
              this._messageStackDepthAddress,
              memoryBufferView,
              memoryBufferUint8
            );

            throw pvStatusToException(status, 'Tokenize failed', messageStack);
          }

          const numTokens = memoryBufferView.getInt32(numTokensAddress, true);
          await this._pvFree(numTokensAddress);

          const tokens: number[] = [];
          const tokensAddress = unsignedAddress(
            memoryBufferView.getInt32(tokensAddressAddress, true)
          );
          for (let i = 0; i < numTokens; i++) {
            tokens.push(
              memoryBufferView.getInt32(
                tokensAddress + i * Int32Array.BYTES_PER_ELEMENT,
                true
              )
            );
          }

          await this._pvPicoLLMDeleteTokens(tokensAddress);
          await this._pvFree(tokensAddressAddress);

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
          if (this._wasmMemory === undefined) {
            throw new PicoLLMErrors.PicoLLMInvalidStateError(
              'Attempted to call PicoLLM forward after release.'
            );
          }

          const numLogitsAddress = await this._aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (numLogitsAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for numLogits'
            );
          }

          const logitsAddressAddress = await this._aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (logitsAddressAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for logits'
            );
          }

          const status = await this._pvPicoLLMForward(
            this._objectAddress,
            token,
            numLogitsAddress,
            logitsAddressAddress
          );

          const memoryBufferUint8 = new Uint8Array(this._wasmMemory.buffer);
          const memoryBufferView = new DataView(this._wasmMemory.buffer);

          if (status !== PvStatus.SUCCESS) {
            const messageStack = await PicoLLM.getMessageStack(
              this._pvGetErrorStack,
              this._pvFreeErrorStack,
              this._messageStackAddressAddressAddress,
              this._messageStackDepthAddress,
              memoryBufferView,
              memoryBufferUint8
            );

            throw pvStatusToException(status, 'Forward failed', messageStack);
          }

          const numLogits = memoryBufferView.getInt32(numLogitsAddress, true);
          await this._pvFree(numLogitsAddress);

          const logits: number[] = [];
          const logitsAddress = unsignedAddress(
            memoryBufferView.getInt32(logitsAddressAddress, true)
          );
          for (let i = 0; i < numLogits; i++) {
            logits.push(
              memoryBufferView.getFloat32(
                logitsAddress + i * Float32Array.BYTES_PER_ELEMENT,
                true
              )
            );
          }

          await this._pvPicoLLMDeleteLogits(logitsAddress);
          await this._pvFree(logitsAddressAddress);

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
          if (this._wasmMemory === undefined) {
            throw new PicoLLMErrors.PicoLLMInvalidStateError(
              'Attempted to call PicoLLM forward after release.'
            );
          }
          const status = await this._pvPicoLLMReset(this._objectAddress);

          const memoryBufferUint8 = new Uint8Array(this._wasmMemory.buffer);
          const memoryBufferView = new DataView(this._wasmMemory.buffer);
          if (status !== PvStatus.SUCCESS) {
            const messageStack = await PicoLLM.getMessageStack(
              this._pvGetErrorStack,
              this._pvFreeErrorStack,
              this._messageStackAddressAddressAddress,
              this._messageStackDepthAddress,
              memoryBufferView,
              memoryBufferUint8
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
    await this._pvPicoLLMDelete(this._objectAddress);
    await this._pvFree(this._messageStackAddressAddressAddress);
    await this._pvFree(this._messageStackDepthAddress);
    this._streamCallback.release();

    delete this._wasmMemory;
    this._wasmMemory = undefined;
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
          const memory: WebAssembly.Memory = new WebAssembly.Memory({
            initial: 4096,
          });

          const isSimd = await simd();
          if (!isSimd) {
            throw new PicoLLMErrors.PicoLLMRuntimeError('Unsupported Browser');
          }

          const picoLLMWorkerWasmBuffer = base64ToUint8Array(picoLLMWebWorkerHelperSimd);
          const xpuWebWorkerImports = initXpu(memory, picoLLMWorkerWasmBuffer);

          const pvError = new PvError();

          const streamCallback = new PicoLLMStreamCallback(memory);

          const exports = await buildWasm(memory, this._wasmSimd, pvError, {
            ...xpuWebWorkerImports,
            stream_callback_wasm: streamCallback.streamCallbackWasm,
          });
          xpuWebWorkerImports.aligned_alloc = exports.aligned_alloc;

          const aligned_alloc = exports.aligned_alloc as aligned_alloc_type;
          const pv_free = exports.pv_free as pv_free_type;
          const pv_picollm_list_hardware_devices =
            exports.pv_picollm_list_hardware_devices as pv_picollm_list_hardware_devices_type;
          const pv_picollm_free_hardware_devices =
            exports.pv_picollm_free_hardware_devices as pv_picollm_free_hardware_devices_type;
          const pv_get_error_stack =
            exports.pv_get_error_stack as pv_get_error_stack_type;
          const pv_free_error_stack =
            exports.pv_free_error_stack as pv_free_error_stack_type;

          const hardwareDevicesAddressAddress = await aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (hardwareDevicesAddressAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for hardwareDevices'
            );
          }

          const numHardwareDevicesAddress = await aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (numHardwareDevicesAddress === 0) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for numHardwareDevices'
            );
          }

          const status: PvStatus = await pv_picollm_list_hardware_devices(
            hardwareDevicesAddressAddress,
            numHardwareDevicesAddress
          );

          const messageStackDepthAddress = await aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (!messageStackDepthAddress) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory for messageStackDepth'
            );
          }

          const messageStackAddressAddressAddress = await aligned_alloc(
            Int32Array.BYTES_PER_ELEMENT,
            Int32Array.BYTES_PER_ELEMENT
          );
          if (!messageStackAddressAddressAddress) {
            throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
              'malloc failed: Cannot allocate memory messageStack'
            );
          }

          const memoryBufferView = new DataView(memory.buffer);
          const memoryBufferUint8 = new Uint8Array(memory.buffer);
          if (status !== PvStatus.SUCCESS) {
            const messageStack = await PicoLLM.getMessageStack(
              pv_get_error_stack,
              pv_free_error_stack,
              messageStackAddressAddressAddress,
              messageStackDepthAddress,
              memoryBufferView,
              memoryBufferUint8
            );
            await pv_free(messageStackAddressAddressAddress);
            await pv_free(messageStackDepthAddress);

            throw pvStatusToException(
              status,
              'Get context length failed',
              messageStack,
              pvError
            );
          }
          await pv_free(messageStackAddressAddressAddress);
          await pv_free(messageStackDepthAddress);

          const numHardwareDevices: number = memoryBufferView.getInt32(
            numHardwareDevicesAddress,
            true
          );
          await pv_free(numHardwareDevicesAddress);

          const hardwareDevicesAddress = unsignedAddress(
            memoryBufferView.getInt32(hardwareDevicesAddressAddress, true)
          );

          const hardwareDevices: string[] = [];
          for (let i = 0; i < numHardwareDevices; i++) {
            const deviceAddress = memoryBufferView.getInt32(
              hardwareDevicesAddress + i * Int32Array.BYTES_PER_ELEMENT,
              true
            );
            hardwareDevices.push(
              arrayBufferToStringAtIndex(memoryBufferUint8, deviceAddress)
            );
          }
          await pv_picollm_free_hardware_devices(
            hardwareDevicesAddress,
            numHardwareDevices
          );
          await pv_free(hardwareDevicesAddressAddress);

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
    wasmBase64: string,
    accessKey: string,
    modelPath: string,
    device: string
  ): Promise<PicoLLMWasmOutput> {
    const memory = new WebAssembly.Memory({ initial: 4096 });

    let memoryBufferUint8 = new Uint8Array(memory.buffer);

    const picoLLMWorkerWasmBuffer = base64ToUint8Array(picoLLMWebWorkerHelperSimd);
    const xpuWebWorkerImports = initXpu(memory, picoLLMWorkerWasmBuffer);

    const pvError = new PvError();

    const streamCallback = new PicoLLMStreamCallback(memory);

    const exports = await buildWasm(memory, wasmBase64, pvError, {
      ...xpuWebWorkerImports,
      stream_callback_wasm: streamCallback.streamCallbackWasm,
    });
    for (const [k, v] of Object.entries(exports)) {
      // @ts-ignore
      xpuWebWorkerImports[k] = v;
    }

    const aligned_alloc = exports.aligned_alloc as aligned_alloc_type;
    const pv_free = exports.pv_free as pv_free_type;

    const pv_picollm_init = exports.pv_picollm_init as pv_picollm_init_type;
    const pv_picollm_delete =
      exports.pv_picollm_delete as pv_picollm_delete_type;
    const pv_picollm_generate =
      exports.pv_picollm_generate as pv_picollm_generate_type;
    const pv_picollm_delete_completion_tokens =
      exports.pv_picollm_delete_completion_tokens as pv_picollm_delete_completion_tokens_type;
    const pv_picollm_delete_completion =
      exports.pv_picollm_delete_completion as pv_picollm_delete_completion_type;
    const pv_picollm_tokenize =
      exports.pv_picollm_tokenize as pv_picollm_tokenize_type;
    const pv_picollm_delete_tokens =
      exports.pv_picollm_delete_tokens as pv_picollm_delete_tokens_type;
    const pv_picollm_forward =
      exports.pv_picollm_forward as pv_picollm_forward_type;
    const pv_picollm_delete_logits =
      exports.pv_picollm_delete_logits as pv_picollm_delete_logits_type;
    const pv_picollm_reset = exports.pv_picollm_reset as pv_picollm_reset_type;

    const pv_picollm_model = exports.pv_picollm_model as pv_picollm_model_type;
    const pv_picollm_context_length =
      exports.pv_picollm_context_length as pv_picollm_context_length_type;
    const pv_picollm_version =
      exports.pv_picollm_version as pv_picollm_version_type;
    const pv_picollm_max_top_choices =
      exports.pv_picollm_max_top_choices as pv_picollm_max_top_choices_type;
    const pv_set_sdk = exports.pv_set_sdk as pv_set_sdk_type;
    const pv_get_error_stack =
      exports.pv_get_error_stack as pv_get_error_stack_type;
    const pv_free_error_stack =
      exports.pv_free_error_stack as pv_free_error_stack_type;

    const objectAddressAddress = await aligned_alloc(
      Int32Array.BYTES_PER_ELEMENT,
      Int32Array.BYTES_PER_ELEMENT
    );
    if (objectAddressAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }

    const accessKeyAddress = await aligned_alloc(
      Uint8Array.BYTES_PER_ELEMENT,
      (accessKey.length + 1) * Uint8Array.BYTES_PER_ELEMENT
    );
    if (accessKeyAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }
    for (let i = 0; i < accessKey.length; i++) {
      memoryBufferUint8[accessKeyAddress + i] = accessKey.charCodeAt(i);
    }
    memoryBufferUint8[accessKeyAddress + accessKey.length] = 0;

    const modelPathEncoded = new TextEncoder().encode(modelPath);
    const modelPathAddress = await aligned_alloc(
      Uint8Array.BYTES_PER_ELEMENT,
      (modelPathEncoded.length + 1) * Uint8Array.BYTES_PER_ELEMENT
    );

    if (modelPathAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }

    memoryBufferUint8.set(modelPathEncoded, modelPathAddress);
    memoryBufferUint8[modelPathAddress + modelPathEncoded.length] = 0;

    const deviceAddress = await aligned_alloc(
      Uint8Array.BYTES_PER_ELEMENT,
      (device.length + 1) * Uint8Array.BYTES_PER_ELEMENT
    );
    if (deviceAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }
    for (let i = 0; i < device.length; i++) {
      memoryBufferUint8[deviceAddress + i] = device.charCodeAt(i);
    }
    memoryBufferUint8[deviceAddress + device.length] = 0;

    const sdkEncoded = new TextEncoder().encode(this._sdk);
    const sdkAddress = await aligned_alloc(
      Uint8Array.BYTES_PER_ELEMENT,
      (sdkEncoded.length + 1) * Uint8Array.BYTES_PER_ELEMENT
    );
    if (!sdkAddress) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }
    memoryBufferUint8.set(sdkEncoded, sdkAddress);
    memoryBufferUint8[sdkAddress + sdkEncoded.length] = 0;
    await pv_set_sdk(sdkAddress);

    const messageStackDepthAddress = await aligned_alloc(
      Int32Array.BYTES_PER_ELEMENT,
      Int32Array.BYTES_PER_ELEMENT
    );
    if (!messageStackDepthAddress) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }

    const messageStackAddressAddressAddress = await aligned_alloc(
      Int32Array.BYTES_PER_ELEMENT,
      Int32Array.BYTES_PER_ELEMENT
    );
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

    await pv_free(accessKeyAddress);
    await pv_free(modelPathAddress);
    await pv_free(deviceAddress);

    const memoryBufferView = new DataView(memory.buffer);
    memoryBufferUint8 = new Uint8Array(memory.buffer);

    if (status !== PvStatus.SUCCESS) {
      const messageStack = await PicoLLM.getMessageStack(
        pv_get_error_stack,
        pv_free_error_stack,
        messageStackAddressAddressAddress,
        messageStackDepthAddress,
        memoryBufferView,
        memoryBufferUint8
      );

      throw pvStatusToException(
        status,
        'Initialization failed',
        messageStack,
        pvError
      );
    }

    const objectAddress = memoryBufferView.getInt32(objectAddressAddress, true);
    await pv_free(objectAddressAddress);

    const maxTopChoices = await pv_picollm_max_top_choices();

    const versionAddress = await pv_picollm_version();
    const version = arrayBufferToStringAtIndex(
      memoryBufferUint8,
      versionAddress
    );

    const contextLengthAddress = await aligned_alloc(
      Int32Array.BYTES_PER_ELEMENT,
      Int32Array.BYTES_PER_ELEMENT
    );

    if (contextLengthAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }

    status = await pv_picollm_context_length(
      objectAddress,
      contextLengthAddress
    );
    if (status !== PvStatus.SUCCESS) {
      const messageStack = await PicoLLM.getMessageStack(
        pv_get_error_stack,
        pv_free_error_stack,
        messageStackAddressAddressAddress,
        messageStackDepthAddress,
        memoryBufferView,
        memoryBufferUint8
      );

      throw pvStatusToException(
        status,
        'Get context length failed',
        messageStack,
        pvError
      );
    }

    const contextLength = memoryBufferView.getInt32(contextLengthAddress, true);
    await pv_free(contextLengthAddress);

    const modelAddressAddress = await aligned_alloc(
      Int32Array.BYTES_PER_ELEMENT,
      Int32Array.BYTES_PER_ELEMENT
    );
    if (modelAddressAddress === 0) {
      throw new PicoLLMErrors.PicoLLMOutOfMemoryError(
        'malloc failed: Cannot allocate memory'
      );
    }
    status = await pv_picollm_model(objectAddress, modelAddressAddress);
    if (status !== PvStatus.SUCCESS) {
      const messageStack = await PicoLLM.getMessageStack(
        pv_get_error_stack,
        pv_free_error_stack,
        messageStackAddressAddressAddress,
        messageStackDepthAddress,
        memoryBufferView,
        memoryBufferUint8
      );

      throw pvStatusToException(
        status,
        'Failed to get model name',
        messageStack,
        pvError
      );
    }

    const modelAddress = memoryBufferView.getInt32(modelAddressAddress, true);
    await pv_free(modelAddressAddress);
    const model = arrayBufferToStringAtIndex(memoryBufferUint8, modelAddress);

    return {
      aligned_alloc,
      memory: memory,
      pvFree: pv_free,

      streamCallback: streamCallback,
      contextLength: contextLength,
      maxTopChoices: maxTopChoices,
      model: model,
      version: version,

      objectAddress: objectAddress,
      messageStackAddressAddressAddress: messageStackAddressAddressAddress,
      messageStackDepthAddress: messageStackDepthAddress,

      pvPicoLLMDelete: pv_picollm_delete,
      pvPicoLLMGenerate: pv_picollm_generate,
      pvPicoLLMDeleteCompletionTokens: pv_picollm_delete_completion_tokens,
      pvPicoLLMDeleteCompletion: pv_picollm_delete_completion,
      pvPicoLLMTokenize: pv_picollm_tokenize,
      pvPicoLLMDeleteTokens: pv_picollm_delete_tokens,
      pvPicoLLMForward: pv_picollm_forward,
      pvPicoLLMDeleteLogits: pv_picollm_delete_logits,
      pvPicoLLMReset: pv_picollm_reset,

      pvGetErrorStack: pv_get_error_stack,
      pvFreeErrorStack: pv_free_error_stack,
    };
  }

  private static async getMessageStack(
    pv_get_error_stack: pv_get_error_stack_type,
    pv_free_error_stack: pv_free_error_stack_type,
    messageStackAddressAddressAddress: number,
    messageStackDepthAddress: number,
    memoryBufferView: DataView,
    memoryBufferUint8: Uint8Array
  ): Promise<string[]> {
    const status = await pv_get_error_stack(
      messageStackAddressAddressAddress,
      messageStackDepthAddress
    );
    if (status !== PvStatus.SUCCESS) {
      throw pvStatusToException(status, 'Unable to get PicoLLM error state');
    }

    const messageStackAddressAddress = memoryBufferView.getInt32(
      messageStackAddressAddressAddress,
      true
    );

    const messageStackDepth = memoryBufferView.getInt32(
      messageStackDepthAddress,
      true
    );
    const messageStack: string[] = [];
    for (let i = 0; i < messageStackDepth; i++) {
      const messageStackAddress = memoryBufferView.getInt32(
        messageStackAddressAddress + i * Int32Array.BYTES_PER_ELEMENT,
        true
      );
      const message = arrayBufferToStringAtIndex(
        memoryBufferUint8,
        messageStackAddress
      );
      messageStack.push(message);
    }

    await pv_free_error_stack(messageStackAddressAddress);

    return messageStack;
  }
}
