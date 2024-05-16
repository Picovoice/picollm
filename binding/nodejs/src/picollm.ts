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
  PicoLLMInputOptions, PicoLLMCompletionToken, PicoLLMEndpoint,
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
    completion_tokens: PicoLLMCompletionToken[];
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
  hardwareDevices: string[];
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
   * Creates an instance of PicoLLM.
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

  get contextLength(): number {
    return this._contextLength;
  }

  get maxTopChoices(): number {
    return this._maxTopChoices;
  }

  get model(): string {
    return this._model;
  }

  get version(): string {
    return this._version;
  }

  /**
   * Processes a given audio data and returns its transcription.
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

    return {
      usage: {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
      },
      endpoint: completion.endpoint,
      completionTokens: completion.completion_tokens,
      completion: completion.completion
    };
  }

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
   * Releases the resources acquired by PicoLLM.
   *
   * Be sure to call this when finished with the instance
   * to reclaim the memory that was allocated by the C library.
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

  static listAvailableDevices(options: PicoLLMInputOptions = {}): string[] {
    const {
      libraryPath = getSystemLibraryPath(),
    } = options;

    const pvPicoLLM = require(libraryPath); // eslint-disable-line

    let picollmHardwareDevicesResult: PicoLLMHardwareDevicesResult | null = null;
    try {
      picollmHardwareDevicesResult = pvPicoLLM.forward();
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

    return picollmHardwareDevicesResult!.hardwareDevices;
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
