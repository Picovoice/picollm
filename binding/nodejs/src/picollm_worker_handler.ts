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

import { parentPort, MessagePort } from 'node:worker_threads';

if (!parentPort) {
  throw new Error("This file must be run as a worker thread");
}

const parent : MessagePort = parentPort;

import { PicoLLMInternal } from './picollm_internal';
import {
  PicoLLMWorkerFailureResponse,
  PicoLLMWorkerForwardRequest,
  PicoLLMWorkerGenerateRequest,
  PicoLLMWorkerGenerateEmbeddingsRequest,
  PicoLLMWorkerGenerateOCRRequest,
  PicoLLMWorkerInitRequest,
  PicoLLMWorkerRequest,
  PicoLLMWorkerTokenizeRequest,
  PicoLLMWorkerGenerateWithImageRequest,
  PicoLLMWorkerResponse,
} from './types';
import PvStatus from './pv_status_t';
import { PicoLLMInternalError } from './errors';

let picoLLM: PicoLLMInternal | null = null;

const streamCallback = (token: string): void => {
  parent.postMessage({
    command: 'stream',
    token: token,
  });
};

const promptProgressCallback = (progress: number): void => {
  parent.postMessage({
    command: 'progress',
    progress: progress,
  });
};

const notInitializedError: PicoLLMWorkerFailureResponse = {
  command: 'error',
  status: PvStatus.INVALID_STATE,
  message: 'picoLLM not initialized',
  messageStack: [],
};

const checkError = (e: any): PicoLLMWorkerFailureResponse => {
  if (e instanceof PicoLLMInternalError) {
    return {
      command: 'error',
      status: e.status,
      message: e.message,
      messageStack: e.messageStack,
    };
  }
  return {
    command: 'error',
    status: PvStatus.RUNTIME_ERROR,
    message: e.message,
    messageStack: [],
  };
};

const initRequest = (request: PicoLLMWorkerInitRequest): PicoLLMWorkerResponse => {
  if (picoLLM !== null) {
    return {
      command: 'error',
      status: PvStatus.INVALID_STATE,
      message: 'picoLLM already initialized',
      messageStack: [],
    };
  }

  picoLLM = new PicoLLMInternal(
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
  request.options.streamCallback = streamCallback;
  const completion = await picoLLM.generate(request.prompt, request.options);
  return {
    command: 'ok',
    completion,
  };
};

const generateWithImageRequest = async (
  request: PicoLLMWorkerGenerateWithImageRequest
): Promise<any> => {
  if (picoLLM === null) {
    return notInitializedError;
  }
  request.options.streamCallback = streamCallback;
  request.options.promptProgressCallback = promptProgressCallback;
  const completion = await picoLLM.generateWithImage(request.prompt, request.image, request.options);
  return {
    command: 'ok',
    completion,
  };
};

const generateEmbeddingsRequest = async (
  request: PicoLLMWorkerGenerateEmbeddingsRequest
): Promise<any> => {
  if (picoLLM === null) {
    return notInitializedError;
  }
  const embeddings = await picoLLM.generateEmbeddings(request.prompt);
  return {
    command: 'ok',
    embeddings,
  };
};

const generateOCRRequest = async (
  request: PicoLLMWorkerGenerateOCRRequest
): Promise<any> => {
  if (picoLLM === null) {
    return notInitializedError;
  }
  request.options.streamCallback = streamCallback;
  request.options.promptProgressCallback = promptProgressCallback;
  const completion = await picoLLM.generateOCR(request.image, request.options);
  return {
    command: 'ok',
    completion,
  };
};

const interruptRequest = async (): Promise<void> => {
  if (picoLLM !== null) {
    picoLLM.interrupt();
  }
};

const tokenizeRequest = async (
  request: PicoLLMWorkerTokenizeRequest
): Promise<any> => {
  if (picoLLM === null) {
    return notInitializedError;
  }
  const tokens = picoLLM.tokenize(
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
  const logits = picoLLM.forward(request.token);
  return {
    command: 'ok',
    logits,
  };
};

const resetRequest = async (): Promise<any> => {
  if (picoLLM === null) {
    return notInitializedError;
  }
  picoLLM.reset();
  return {
    command: 'ok',
  };
};

const releaseRequest = async (): Promise<any> => {
  if (picoLLM !== null) {
    picoLLM.release();
    picoLLM = null;
  }
  return {
    command: 'ok',
  };
};

/**
 * picoLLM worker handler.
 */
parent.on('message',
  async function (
    event: PicoLLMWorkerRequest
  ): Promise<void> {
    try {
      switch (event.command) {
      case 'init':
        parent.postMessage(initRequest(event));
        break;
      case 'generate':
        parent.postMessage(await generateRequest(event));
        break;
      case 'generateWithImage':
        parent.postMessage(await generateWithImageRequest(event));
        break;
      case 'generateEmbeddings':
        parent.postMessage(await generateEmbeddingsRequest(event));
        break;
      case 'generateOCR':
        parent.postMessage(await generateOCRRequest(event));
        break;
      case 'interrupt':
        await interruptRequest();
        break;
      case 'tokenize':
        parent.postMessage(await tokenizeRequest(event));
        break;
      case 'forward':
        parent.postMessage(await forwardRequest(event));
        break;
      case 'reset':
        parent.postMessage(await resetRequest());
        break;
      case 'release':
        parent.postMessage(await releaseRequest());
        break;
      default:
        parent.postMessage({
          command: 'failed',
          // @ts-ignore
          message: `Unrecognized command: ${event.command}`,
        });
      }
    } catch (error: any) {
      parent.postMessage(checkError(error));
    }
  }
);