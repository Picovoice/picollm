//
// Copyright 2024 Picovoice Inc.
//
// You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
// file accompanying this source.
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import * as fs from 'fs';

import PvStatus from './pv_status_t';
import {
  PicoLLMInvalidArgumentError,
  PicoLLMInvalidStateError,
  PicoLLMRuntimeError,
  pvStatusToException,
} from './errors';
import { Dialog, DIALOGS } from './dialog';

import {
  PicoLLMCompletion,
  PicoLLMGenerateOptions,
  PicoLLMOptions,
  PicoLLMInputOptions,
} from './types';

import { getSystemLibraryPath } from './platforms';

type PicoLLMInitResult = {
  handle: any;
  status: PvStatus
};
type PicoLLMGenerateResult = {
  completion: {
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
    };
    endpoint: number;
    completion_tokens: {
      token: {
        token: string;
        log_prob: number;
      }
      top_choices: {
        token: string;
        log_prob: number;
      }[];
    }[];
    completion: string;
  };
  status: PvStatus;
};
type PicoLLMTokenizeResult = {
  tokens: number[];
  status: PvStatus;
};
type PicoLLMForwardResult = {
  logits: number[];
  status: PvStatus;
};
type PicoLLMModelResult = {
  model: string;
  status: PvStatus;
};
type PicoLLMContextLengthResult = {
  contextLength: number;
  status: PvStatus;
};
type PicoLLMHardwareDevicesResult = {
  hardware_devices: string[];
  status: PvStatus;
};
type PicoLLMResult = {
  status: PvStatus;
};

/**
 * Node.js binding for PicoLLM engine.
 *
 * Performs the calls to the PicoLLM node library. Does some basic parameter validation to prevent
 * errors occurring in the library layer. Provides clearer error messages in native JavaScript.
 */
export class PicoLLM {
  private _pvPicoLLM: any;

  private _handle: any;

  private readonly _contextLength: number;
  private readonly _maxTopChoices: number;
  private readonly _model: string;
  private readonly _version: string;

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
  constructor(accessKey: string, modelPath: string, options: PicoLLMOptions = {}) {
    if (
      accessKey === null ||
      accessKey === undefined ||
      accessKey.length === 0
    ) {
      throw new PicoLLMInvalidArgumentError(`No AccessKey provided to PicoLLM`);
    }

    const {
      libraryPath = getSystemLibraryPath(),
      device = "best",
    } = options;

    if (!fs.existsSync(libraryPath)) {
      throw new PicoLLMInvalidArgumentError(
        `File not found at 'libraryPath': ${libraryPath}`
      );
    }

    if (!fs.existsSync(modelPath)) {
      throw new PicoLLMInvalidArgumentError(
        `File not found at 'modelPath': ${modelPath}`
      );
    }

    const pvPicoLLM = require(libraryPath); // eslint-disable-line
    this._pvPicoLLM = pvPicoLLM;

    let picoLLMInitResult: PicoLLMInitResult | null = null;
    try {
      pvPicoLLM.set_sdk('nodejs');

      picoLLMInitResult = pvPicoLLM.init(
        accessKey,
        modelPath,
        device
      );
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picoLLMInitResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to initialize');
    }

    this._handle = picoLLMInitResult!.handle;
    this._contextLength = this.getContextLength();
    this._maxTopChoices = pvPicoLLM.max_top_choices();
    this._model = this.getModel();
    this._version = pvPicoLLM.version();
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
   * @returns Completion result.
   */
  generate(prompt: string, options: PicoLLMGenerateOptions = {}): PicoLLMCompletion {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError('PicoLLM is not initialized');
    }

    const {
      completionTokenLimit = -1,
      stopPhrases = null,
      seed = -1,
      presencePenalty = 0.0,
      frequencyPenalty = 0.0,
      temperature = 0.0,
      topP = 1,
      numTopChoices = 0,
      streamCallback = null,
    } = options;

    const numStopPhrases = (stopPhrases !== null) ? stopPhrases.length : 0;

    if (prompt === undefined || prompt === null) {
      throw new PicoLLMInvalidArgumentError(
        `prompt provided to 'PicoLLM.generate()' is undefined or null`
      );
    }

    let picollmGenerateResult: PicoLLMGenerateResult | null = null;
    try {
      picollmGenerateResult = this._pvPicoLLM.generate(
        this._handle,
        prompt,
        completionTokenLimit,
        stopPhrases,
        numStopPhrases,
        seed,
        presencePenalty,
        frequencyPenalty,
        temperature,
        topP,
        numTopChoices,
        streamCallback);
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmGenerateResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to generate');
    }

    const completion = picollmGenerateResult!.completion;
    const completionTokens = completion.completion_tokens.map(x => ({
      token: {
        token: x.token.token,
        logProb: x.token.log_prob
      },
      topChoices: x.top_choices.map(t => ({
        token: t.token,
        logProb: t.log_prob,
      })),
    }));

    return {
      usage: {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
      },
      endpoint: completion.endpoint,
      completionTokens: completionTokens,
      completion: completion.completion
    };
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
  tokenize(text: string, bos: boolean, eos: boolean): number[] {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError('PicoLLM is not initialized');
    }

    if (text === undefined || text === null) {
      throw new PicoLLMInvalidArgumentError(
        `text provided to 'PicoLLM.tokenize()' is undefined or null`
      );
    }

    let picollmTokenizeResult: PicoLLMTokenizeResult | null = null;
    try {
      picollmTokenizeResult = this._pvPicoLLM.tokenize(
        this._handle,
        text,
        bos,
        eos);
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmTokenizeResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to tokenize');
    }

    return picollmTokenizeResult!.tokens;
  }

  /**
   * Performs a single forward pass given a token and returns the logits. This is a low-level function for
   * benchmarking and advanced usage. `.generate()` should be used when possible.
   *
   * @param token Input token.
   * @returns Logits.
   */
  forward(token: number): number[] {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError('PicoLLM is not initialized');
    }

    let picollmForwardResult: PicoLLMForwardResult | null = null;
    try {
      picollmForwardResult = this._pvPicoLLM.forward(this._handle, token);
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmForwardResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to forward');
    }

    return picollmForwardResult!.logits;
  }

  /**
   * Resets the internal state of LLM. It should be called in conjunction with `.forward()` when processing a new
   * sequence of tokens. This is a low-level function for benchmarking and advanced usage. `.generate()` should be
   * used when possible.
   */
  reset(): void {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError('PicoLLM is not initialized');
    }

    let picollmResetResult: PicoLLMResult | null = null;
    try {
      picollmResetResult = this._pvPicoLLM.reset(this._handle);
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmResetResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to reset');
    }
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
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError('PicoLLM is not initialized');
    }

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
  release(): void {
    if (this._handle !== 0) {
      try {
        this._pvPicoLLM.delete(this._handle);
      } catch (err: any) {
        pvStatusToException(<PvStatus>err.code, err);
      }
      this._handle = 0;
    } else {
      // eslint-disable-next-line no-console
      console.warn('PicoLLM is not initialized');
    }
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

  private getContextLength(): number {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError('PicoLLM is not initialized');
    }

    let picollmContextLengthResult: PicoLLMContextLengthResult | null = null;
    try {
      picollmContextLengthResult = this._pvPicoLLM.context_length(this._handle);
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmContextLengthResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to get model');
    }

    return picollmContextLengthResult!.contextLength;
  }

  private getModel(): string {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError('PicoLLM is not initialized');
    }

    let picollmModelResult: PicoLLMModelResult | null = null;
    try {
      picollmModelResult = this._pvPicoLLM.model(this._handle);
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmModelResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to get model');
    }

    return picollmModelResult!.model;
  }

  private handlePvStatus(status: PvStatus, message: string): void {
    const errorObject = this._pvPicoLLM.get_error_stack();
    if (errorObject.status === PvStatus.SUCCESS) {
      pvStatusToException(status, message, errorObject.message_stack);
    } else {
      pvStatusToException(status, 'Unable to get PicoLLM error state');
    }
  }
}
