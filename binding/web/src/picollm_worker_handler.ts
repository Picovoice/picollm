/*
  Copyright 2024 Picovoice Inc.

  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
  file accompanying this source.

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

/// <reference no-default-lib="false"/>
/// <reference lib="webworker" />

import { PicoLLM } from './picollm';
import {
  PicoLLMWorkerFailureResponse,
  PicoLLMWorkerForwardRequest,
  PicoLLMWorkerGenerateRequest,
  PicoLLMWorkerInitRequest,
  PicoLLMWorkerRequest,
  PicoLLMWorkerTokenizeRequest,
  PvStatus,
} from './types';
import { PicoLLMError } from './picollm_errors';

let picoLLM: PicoLLM | null = null;

const streamingCallback = (token: string): void => {
  self.postMessage({
    command: 'stream',
    token: token,
  });
};

const notInitializedError: PicoLLMWorkerFailureResponse = {
  command: 'error',
  status: PvStatus.INVALID_STATE,
  shortMessage: 'picoLLM not initialized',
  messageStack: [],
};

const checkError = (e: any): PicoLLMWorkerFailureResponse => {
  if (e instanceof PicoLLMError) {
    return {
      command: 'error',
      status: e.status,
      shortMessage: e.shortMessage,
      messageStack: e.messageStack,
    };
  }
  return {
    command: 'error',
    status: PvStatus.RUNTIME_ERROR,
    shortMessage: e.message,
    messageStack: [],
  };
};

const initRequest = async (request: PicoLLMWorkerInitRequest): Promise<any> => {
  if (picoLLM !== null) {
    return {
      command: 'error',
      status: PvStatus.INVALID_STATE,
      shortMessage: 'picoLLM already initialized',
    };
  }

  PicoLLM.setWasmSimd(request.wasmSimd);
  PicoLLM.setSdk(request.sdk);
  picoLLM = await PicoLLM._init(
    request.accessKey,
    request.modelPath,
    request.options
  );
  return {
    command: 'ok',
    contextLength: picoLLM.contextLength,
    maxTopChoices: picoLLM.maxTopChoices,
    model: picoLLM.model,
    version: picoLLM.version,
  };
};

const generateRequest = async (
  request: PicoLLMWorkerGenerateRequest
): Promise<any> => {
  if (picoLLM === null) {
    return notInitializedError;
  }
  request.options.streamCallback = streamingCallback;
  const completion = await picoLLM.generate(request.prompt, request.options);
  return {
    command: 'ok',
    completion,
  };
};

const tokenizeRequest = async (
  request: PicoLLMWorkerTokenizeRequest
): Promise<any> => {
  if (picoLLM === null) {
    return notInitializedError;
  }
  const tokens = await picoLLM.tokenize(
    request.text,
    request.bos,
    request.eos
  );
  return {
    command: 'ok',
    tokens,
  };
};

const forwardRequest = async (
  request: PicoLLMWorkerForwardRequest
): Promise<any> => {
  if (picoLLM === null) {
    return notInitializedError;
  }
  const logits = await picoLLM.forward(request.token);
  return {
    command: 'ok',
    logits,
  };
};

const resetRequest = async (): Promise<any> => {
  if (picoLLM === null) {
    return notInitializedError;
  }
  await picoLLM.reset();
  return {
    command: 'ok',
  };
};

const releaseRequest = async (): Promise<any> => {
  if (picoLLM !== null) {
    await picoLLM.release();
    picoLLM = null;
    close();
  }
  return {
    command: 'ok',
  };
};

/**
 * picoLLM worker handler.
 */
self.onmessage = async function (
  event: MessageEvent<PicoLLMWorkerRequest>
): Promise<void> {
  try {
    switch (event.data.command) {
      case 'init':
        self.postMessage(await initRequest(event.data));
        break;
      case 'generate':
        self.postMessage(await generateRequest(event.data));
        break;
      case 'tokenize':
        self.postMessage(await tokenizeRequest(event.data));
        break;
      case 'forward':
        self.postMessage(await forwardRequest(event.data));
        break;
      case 'reset':
        self.postMessage(await resetRequest());
        break;
      case 'release':
        self.postMessage(await releaseRequest());
        break;
      default:
        self.postMessage({
          command: 'failed',
          // @ts-ignore
          message: `Unrecognized command: ${event.data.command}`,
        });
    }
  } catch (error: any) {
    self.postMessage(checkError(error));
  }
};
