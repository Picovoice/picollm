/*
  Copyright 2024 Picovoice Inc.

  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
  file accompanying this source.

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

export enum PvStatus {
  SUCCESS = 10000,
  OUT_OF_MEMORY,
  IO_ERROR,
  INVALID_ARGUMENT,
  STOP_ITERATION,
  KEY_ERROR,
  INVALID_STATE,
  RUNTIME_ERROR,
  ACTIVATION_ERROR,
  ACTIVATION_LIMIT_REACHED,
  ACTIVATION_THROTTLED,
  ACTIVATION_REFUSED,
}

export enum PicoLLMEndpoint {
  END_OF_SENTENCE,
  COMPLETION_TOKEN_LIMIT_REACHED,
  STOP_PHRASE_ENCOUNTERED,
}

export type PicoLLMModel = {
  modelFile: string | File | Blob | (string | File | Blob)[];
  cacheFilePath?: string;
  cacheFileVersion?: number;
  cacheFileOverwrite?: boolean;
  numFetchRetries?: number;
};

export type PicoLLMInitOptions = {
  device?: string;
};

export type PicoLLMGenerateOptions = {
  completionTokenLimit?: number;
  stopPhrases?: string[];
  seed?: number;
  presencePenalty?: number;
  frequencyPenalty?: number;
  temperature?: number;
  topP?: number;
  numTopChoices?: number;
  streamCallback?: (token: string) => void;
};

export type PicoLLMUsage = {
  promptTokens: number;
  completionTokens: number;
};

export type PicoLLMToken = {
  token: string;
  logProb: number;
};

export type PicoLLMCompletionToken = {
  token: PicoLLMToken;
  topChoices: PicoLLMToken[];
};

export type PicoLLMCompletion = {
  usage: PicoLLMUsage;
  endpoint: PicoLLMEndpoint;
  completionTokens: PicoLLMCompletionToken[];
  completion: string;
};

export type PicoLLMWorkerInitRequest = {
  command: 'init';
  accessKey: string;
  modelPath: string;
  options: PicoLLMInitOptions;
  wasmSimd: string;
  sdk: string;
};

export type PicoLLMWorkerGenerateRequest = {
  command: 'generate';
  prompt: string;
  options: PicoLLMGenerateOptions;
};

export type PicoLLMWorkerTokenizeRequest = {
  command: 'tokenize';
  text: string;
  bos: boolean;
  eos: boolean;
};

export type PicoLLMWorkerForwardRequest = {
  command: 'forward';
  token: number;
};

export type PicoLLMWorkerResetRequest = {
  command: 'reset';
};

export type PicoLLMWorkerReleaseRequest = {
  command: 'release';
};

export type PicoLLMWorkerRequest =
  | PicoLLMWorkerInitRequest
  | PicoLLMWorkerGenerateRequest
  | PicoLLMWorkerTokenizeRequest
  | PicoLLMWorkerForwardRequest
  | PicoLLMWorkerResetRequest
  | PicoLLMWorkerReleaseRequest;

export type PicoLLMWorkerFailureResponse = {
  command: 'failed' | 'error';
  status: PvStatus;
  shortMessage: string;
  messageStack: string[];
};

export type PicoLLMWorkerInitResponse =
  | PicoLLMWorkerFailureResponse
  | {
      command: 'ok';
      contextLength: number;
      maxTopChoices: number;
      model: string;
      version: string;
    };

export type PicoLLMWorkerGenerateResponse =
  | PicoLLMWorkerFailureResponse
  | {
      command: 'ok';
      completion: PicoLLMCompletion;
    }
  | {
      command: 'stream',
      token: string
    };

export type PicoLLMWorkerTokenizeResponse =
  | PicoLLMWorkerFailureResponse
  | {
      command: 'ok';
      tokens: number[];
    };

export type PicoLLMWorkerForwardResponse =
  | PicoLLMWorkerFailureResponse
  | {
      command: 'ok';
      logits: number[];
    };

export type PicoLLMWorkerResetResponse =
  | PicoLLMWorkerFailureResponse
  | {
      command: 'ok';
    };

export type PicoLLMWorkerReleaseResponse =
  | PicoLLMWorkerFailureResponse
  | {
      command: 'ok';
    };

export type PicoLLMWorkerResponse =
  | PicoLLMWorkerInitResponse
  | PicoLLMWorkerGenerateResponse
  | PicoLLMWorkerTokenizeResponse
  | PicoLLMWorkerForwardResponse
  | PicoLLMWorkerResetResponse
  | PicoLLMWorkerReleaseResponse;
