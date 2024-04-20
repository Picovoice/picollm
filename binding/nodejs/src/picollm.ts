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

import { PicoLLMWord, PicoLLMTranscript, PicoLLMOptions } from './types';

import { getSystemLibraryPath } from './platforms';

const DEFAULT_MODEL_PATH = '../lib/common/picollm_params.pv';

const VALID_AUDIO_EXTENSIONS = [
  '.flac',
  '.mp3',
  '.ogg',
  '.opus',
  '.vorbis',
  '.wav',
  '.webm',
  '.mp4',
  '.m4a',
  '.3gp',
];

type PicoLLMHandleAndStatus = { handle: any; status: PvStatus };
type PicoLLMResult = {
  transcript: string;
  words: PicoLLMWord[];
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
  private readonly _sampleRate: number;

  /**
   * Creates an instance of PicoLLM.
   * @param {string} accessKey AccessKey obtained from Picovoice Console (https://console.picovoice.ai/).
   * @param {PicoLLMOptions} options Optional configuration arguments.
   * @param {string} options.modelPath The path to save and use the model from (.pv extension)
   * @param {string} options.libraryPath the path to the PicoLLM dynamic library (.node extension)
   * @param {boolean} options.enableAutomaticPunctuation Flag to enable automatic punctuation insertion.
   * @param {boolean} options.enableDiarization Flag to enable speaker diarization, which allows PicoLLM to
   * differentiate speakers as part of the transcription process. Word metadata will include a `speakerTag`
   * to identify unique speakers.
   */
  constructor(accessKey: string, options: PicoLLMOptions = {}) {
    if (
      accessKey === null ||
      accessKey === undefined ||
      accessKey.length === 0
    ) {
      throw new PicoLLMInvalidArgumentError(`No AccessKey provided to PicoLLM`);
    }

    const {
      modelPath = path.resolve(__dirname, DEFAULT_MODEL_PATH),
      libraryPath = getSystemLibraryPath(),
      enableAutomaticPunctuation = false,
      enableDiarization = false,
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

    let picollmHandleAndStatus: PicoLLMHandleAndStatus | null = null;
    try {
      pvPicoLLM.set_sdk('nodejs');

      picollmHandleAndStatus = pvPicoLLM.init(
        accessKey,
        modelPath,
        enableAutomaticPunctuation,
        enableDiarization
      );
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmHandleAndStatus!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to initialize');
    }

    this._handle = picollmHandleAndStatus!.handle;
    this._sampleRate = pvPicoLLM.sample_rate();
    this._version = pvPicoLLM.version();
  }

  /**
   * @returns the audio sampling rate accepted by the process function
   * @see {@link process}
   */
  get sampleRate(): number {
    return this._sampleRate;
  }

  /**
   * @returns the version of the PicoLLM engine
   */
  get version(): string {
    return this._version;
  }

  /**
   * Processes a given audio data and returns its transcription.
   *
   * @param {Int16Array} pcm Audio data. The audio needs to have a sample rate equal to `PicoLLM.sampleRate` and be 16-bit linearly-encoded.
   * This function operates on single-channel audio. If you wish to process data in a different
   * sample rate or format consider using `PicoLLM.processFile()`.
   * @returns {PicoLLMTranscript} PicoLLMTranscript object which contains the transcription results of the engine.
   */
  process(pcm: Int16Array): PicoLLMTranscript {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError('PicoLLM is not initialized');
    }

    if (pcm === undefined || pcm === null) {
      throw new PicoLLMInvalidArgumentError(
        `PCM array provided to 'PicoLLM.process()' is undefined or null`
      );
    } else if (pcm.length === 0) {
      throw new PicoLLMInvalidArgumentError(
        `PCM array provided to 'PicoLLM.process()' is empty`
      );
    }

    let picollmResult: PicoLLMResult | null = null;
    try {
      picollmResult = this._pvPicoLLM.process(this._handle, pcm, pcm.length);
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to process the audio data');
    }

    return {
      transcript: picollmResult!.transcript,
      words: picollmResult!.words,
    };
  }

  /**
   * Processes a given audio file and returns its transcription.
   *
   * @param {string} audioPath Absolute path to the audio file.
   * The file needs to have a sample rate equal to or greater than `.sampleRate`.
   * The supported formats are: `FLAC`, `MP3`, `Ogg`, `WAV`, `WebM`, `MP4/m4a (AAC)`, and `3gp (AMR)`
   * @returns {PicoLLMTranscript} object which contains the transcription results of the engine.
   */
  processFile(audioPath: string): PicoLLMTranscript {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError('PicoLLM is not initialized');
    }

    if (!fs.existsSync(audioPath)) {
      throw new PicoLLMInvalidArgumentError(
        `Could not find the audio file at '${audioPath}'`
      );
    }

    let picollmResult: PicoLLMResult | null = null;
    try {
      picollmResult = this._pvPicoLLM.process_file(this._handle, audioPath);
    } catch (err: any) {
      pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmResult!.status;
    if (status !== PvStatus.SUCCESS) {
      if (
        status === PvStatus.INVALID_ARGUMENT &&
        !VALID_AUDIO_EXTENSIONS.includes(path.extname(audioPath.toLowerCase()))
      ) {
        pvStatusToException(
          status,
          `Specified file with extension '${path.extname(
            audioPath.toLowerCase()
          )}' is not supported`
        );
      }
      this.handlePvStatus(status, 'PicoLLM failed to process the audio file');
    }
    return {
      transcript: picollmResult!.transcript,
      words: picollmResult!.words,
    };
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
