import { PicoLLM } from './picollm';
import { PicoLLMWorker } from './picollm_worker';

import {
  Dialog,
  GemmaChatDialog,
  Llama2ChatDialog,
  Llama3ChatDialog,
  Llama32ChatDialog,
  MistralChatDialog,
  MixtralChatDialog,
  Phi2Dialog,
  Phi2QADialog,
  Phi2ChatDialog,
  Phi3ChatDialog,
  Phi35ChatDialog,
} from './dialog';

import {
  PicoLLMCompletion,
  PicoLLMCompletionToken,
  PicoLLMEndpoint,
  PicoLLMToken,
  PicoLLMUsage,
  PicoLLMInitOptions,
  PicoLLMGenerateOptions,
  PicoLLMModel,
  PicoLLMWorkerFailureResponse,
  PicoLLMWorkerInitRequest,
  PicoLLMWorkerInitResponse,
  PicoLLMWorkerGenerateRequest,
  PicoLLMWorkerGenerateResponse,
  PicoLLMWorkerInterruptRequest,
  PicoLLMWorkerTokenizeRequest,
  PicoLLMWorkerTokenizeResponse,
  PicoLLMWorkerForwardRequest,
  PicoLLMWorkerForwardResponse,
  PicoLLMWorkerResetRequest,
  PicoLLMWorkerResetResponse,
  PicoLLMWorkerReleaseRequest,
  PicoLLMWorkerReleaseResponse,
  PicoLLMWorkerRequest,
  PicoLLMWorkerResponse,
} from './types';

import picoLLMWasmPThread from './lib/pv_picollm_pthread.wasm';
import picoLLMWasmPThreadLib from './lib/pv_picollm_pthread.txt';

import * as PicoLLMErrors from './picollm_errors';

PicoLLM.setWasmPThread(picoLLMWasmPThread);
PicoLLM.setWasmPThreadLib(picoLLMWasmPThreadLib);
PicoLLMWorker.setWasmPThread(picoLLMWasmPThread);
PicoLLMWorker.setWasmPThreadLib(picoLLMWasmPThreadLib);

export {
  Dialog,
  GemmaChatDialog,
  Llama2ChatDialog,
  Llama3ChatDialog,
  Llama32ChatDialog,
  MistralChatDialog,
  MixtralChatDialog,
  Phi2Dialog,
  Phi2QADialog,
  Phi2ChatDialog,
  Phi3ChatDialog,
  Phi35ChatDialog,
  PicoLLM,
  PicoLLMCompletion,
  PicoLLMCompletionToken,
  PicoLLMEndpoint,
  PicoLLMToken,
  PicoLLMUsage,
  PicoLLMGenerateOptions,
  PicoLLMInitOptions,
  PicoLLMModel,
  PicoLLMWorker,
  PicoLLMWorkerFailureResponse,
  PicoLLMWorkerInitRequest,
  PicoLLMWorkerInitResponse,
  PicoLLMWorkerGenerateRequest,
  PicoLLMWorkerGenerateResponse,
  PicoLLMWorkerInterruptRequest,
  PicoLLMWorkerTokenizeRequest,
  PicoLLMWorkerTokenizeResponse,
  PicoLLMWorkerForwardRequest,
  PicoLLMWorkerForwardResponse,
  PicoLLMWorkerResetRequest,
  PicoLLMWorkerResetResponse,
  PicoLLMWorkerReleaseRequest,
  PicoLLMWorkerReleaseResponse,
  PicoLLMWorkerRequest,
  PicoLLMWorkerResponse,
  PicoLLMErrors,
};
