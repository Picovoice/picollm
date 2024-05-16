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
'use strict';

import PvStatus from './pv_status_t';

export class PicoLLMError extends Error {
  private readonly _message: string;
  private readonly _messageStack: string[];

  constructor(message: string, messageStack: string[] = []) {
    super(PicoLLMError.errorToString(message, messageStack));
    this._message = message;
    this._messageStack = messageStack;
  }

  get message(): string {
    return this._message;
  }

  get messageStack(): string[] {
    return this._messageStack;
  }

  private static errorToString(
    initial: string,
    messageStack: string[]
  ): string {
    let msg = initial;

    if (messageStack.length > 0) {
      msg += `: ${messageStack.reduce(
        (acc, value, index) => acc + '\n  [' + index + '] ' + value,
        ''
      )}`;
    }

    return msg;
  }
}

export class PicoLLMOutOfMemoryError extends PicoLLMError {}
export class PicoLLMIOError extends PicoLLMError {}
export class PicoLLMInvalidArgumentError extends PicoLLMError {}
export class PicoLLMStopIterationError extends PicoLLMError {}
export class PicoLLMKeyError extends PicoLLMError {}
export class PicoLLMInvalidStateError extends PicoLLMError {}
export class PicoLLMRuntimeError extends PicoLLMError {}
export class PicoLLMActivationError extends PicoLLMError {}
export class PicoLLMActivationLimitReachedError extends PicoLLMError {}
export class PicoLLMActivationThrottledError extends PicoLLMError {}
export class PicoLLMActivationRefusedError extends PicoLLMError {}

export function pvStatusToException(
  pvStatus: PvStatus,
  errorMessage: string,
  messageStack: string[] = []
): void {
  switch (pvStatus) {
    case PvStatus.OUT_OF_MEMORY:
      throw new PicoLLMOutOfMemoryError(errorMessage, messageStack);
    case PvStatus.IO_ERROR:
      throw new PicoLLMIOError(errorMessage, messageStack);
    case PvStatus.INVALID_ARGUMENT:
      throw new PicoLLMInvalidArgumentError(errorMessage, messageStack);
    case PvStatus.STOP_ITERATION:
      throw new PicoLLMStopIterationError(errorMessage, messageStack);
    case PvStatus.KEY_ERROR:
      throw new PicoLLMKeyError(errorMessage, messageStack);
    case PvStatus.INVALID_STATE:
      throw new PicoLLMInvalidStateError(errorMessage, messageStack);
    case PvStatus.RUNTIME_ERROR:
      throw new PicoLLMRuntimeError(errorMessage, messageStack);
    case PvStatus.ACTIVATION_ERROR:
      throw new PicoLLMActivationError(errorMessage, messageStack);
    case PvStatus.ACTIVATION_LIMIT_REACHED:
      throw new PicoLLMActivationLimitReachedError(errorMessage, messageStack);
    case PvStatus.ACTIVATION_THROTTLED:
      throw new PicoLLMActivationThrottledError(errorMessage, messageStack);
    case PvStatus.ACTIVATION_REFUSED:
      throw new PicoLLMActivationRefusedError(errorMessage, messageStack);
    default:
      // eslint-disable-next-line no-console
      console.warn(`Unmapped error code: ${pvStatus}`);
      throw new PicoLLMError(errorMessage);
  }
}
