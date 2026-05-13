//
// Copyright 2026 Picovoice Inc.
//
// You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
// file accompanying this source.
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import PvStatus from './pv_status_t';

export class PicoLLMErrorInternal extends Error {
  private readonly _status: PvStatus;
  private readonly _message: string;
  private readonly _messageStack: string[];

  constructor(status: PvStatus, message: string, messageStack: string[] = []) {
    super();
    this._status = status;
    this._message = message;
    this._messageStack = messageStack;
  }

  get status(): PvStatus {
    return this._status;
  }

  get message(): string {
    return this._message;
  }

  get messageStack(): string[] {
    return this._messageStack;
  }
}

export class PicoLLMOutOfMemoryError extends PicoLLMErrorInternal {}
export class PicoLLMIOError extends PicoLLMErrorInternal {}
export class PicoLLMInvalidArgumentError extends PicoLLMErrorInternal {}
export class PicoLLMStopIterationError extends PicoLLMErrorInternal {}
export class PicoLLMKeyError extends PicoLLMErrorInternal {}
export class PicoLLMInvalidStateError extends PicoLLMErrorInternal {}
export class PicoLLMRuntimeError extends PicoLLMErrorInternal {}
export class PicoLLMActivationError extends PicoLLMErrorInternal {}
export class PicoLLMActivationLimitReachedError extends PicoLLMErrorInternal {}
export class PicoLLMActivationThrottledError extends PicoLLMErrorInternal {}
export class PicoLLMActivationRefusedError extends PicoLLMErrorInternal {}

export function pvStatusToException(
  pvStatus: PvStatus | string,
  errorMessage: string,
  messageStack: string[] = []
): PicoLLMErrorInternal {
  const status = (typeof pvStatus === "string") ? PvStatus[pvStatus as any] : pvStatus;

  switch (status) {
    case PvStatus.OUT_OF_MEMORY:
      return new PicoLLMOutOfMemoryError(status, errorMessage, messageStack);
    case PvStatus.IO_ERROR:
      return new PicoLLMIOError(status, errorMessage, messageStack);
    case PvStatus.INVALID_ARGUMENT:
      return new PicoLLMInvalidArgumentError(status, errorMessage, messageStack);
    case PvStatus.STOP_ITERATION:
      return new PicoLLMStopIterationError(status, errorMessage, messageStack);
    case PvStatus.KEY_ERROR:
      return new PicoLLMKeyError(status, errorMessage, messageStack);
    case PvStatus.INVALID_STATE:
      return new PicoLLMInvalidStateError(status, errorMessage, messageStack);
    case PvStatus.RUNTIME_ERROR:
      return new PicoLLMRuntimeError(status, errorMessage, messageStack);
    case PvStatus.ACTIVATION_ERROR:
      return new PicoLLMActivationError(status, errorMessage, messageStack);
    case PvStatus.ACTIVATION_LIMIT_REACHED:
      return new PicoLLMActivationLimitReachedError(status, errorMessage, messageStack);
    case PvStatus.ACTIVATION_THROTTLED:
      return new PicoLLMActivationThrottledError(status, errorMessage, messageStack);
    case PvStatus.ACTIVATION_REFUSED:
      return new PicoLLMActivationRefusedError(status, errorMessage, messageStack);
    default:
      // eslint-disable-next-line no-console
      console.warn(`Unmapped error code: ${status}`);
      return new PicoLLMErrorInternal(PvStatus.RUNTIME_ERROR, errorMessage);
  }
}