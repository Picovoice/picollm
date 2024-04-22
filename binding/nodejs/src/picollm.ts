//
// Copyright 2022-2023 Picovoice Inc.
//
// You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
// file accompanying this source.
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import * as fs from 'fs';
import * as path from 'path';

import PvStatus from './pv_status_t';
import {
  PicoLLMInvalidArgumentError,
  PicoLLMInvalidStateError,
  pvStatusToException,
} from './errors';

import {
  PicoLLMUsage,
  PicoLLMEndpoint,
  PicoLLMToken,
  PicoLLMCompletionToken,
  PicoLLMCompletion,
  PicoLLMGenerateOptions,
  PicoLLMOptions,
} from './types';

import { getSystemLibraryPath } from './platforms';

type PicoLLMInitResult = {
  handle: any;
  status: PvStatus
};
type PicoLLMGenerateResult = {
  completion: PicoLLMCompletion;
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
  contextLength: string;
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
 * Node.js binding for PicoLLM speech-to-text engine.
 *
 * Performs the calls to the PicoLLM node library. Does some basic parameter validation to prevent
 * errors occurring in the library layer. Provides clearer error messages in native JavaScript.
 */
export class PicoLLM {
  private _pvPicoLLM: any;

  private _handle: any;

  private readonly _version: string;
  private readonly _maxTopChoices: number;

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
    this._maxTopChoices = pvPicoLLM.max_top_choices();
    this._version = pvPicoLLM.version();
  }

  get maxTopChoices(): number {
    return this._maxTopChoices;
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

    return picollmGenerateResult!.completion;
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

  private handlePvStatus(status: PvStatus, message: string): void {
    const errorObject = this._pvPicoLLM.get_error_stack();
    if (errorObject.status === PvStatus.SUCCESS) {
      pvStatusToException(status, message, errorObject.message_stack);
    } else {
      pvStatusToException(status, 'Unable to get PicoLLM error state');
    }
  }
}
