import { PicoLLM } from './picollm';
import { PicoLLMWorker } from './picollm_worker';

import {
  Dialog,
  GemmaChatDialog,
  Llama2ChatDialog,
  Llama3ChatDialog,
  MistralChatDialog,
  MixtralChatDialog,
  Phi2Dialog,
  Phi2QADialog,
  Phi2ChatDialog,
  Phi3ChatDialog,
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

import picoLLMWasmSimd from './lib/pv_picollm_simd.wasm';
import picoLLMWasmLib from './lib/pv_picollm_simd.txt';

import * as PicoLLMErrors from './picollm_errors';

PicoLLM.setWasmSimd(picoLLMWasmSimd);
PicoLLMWorker.setWasmSimd(picoLLMWasmSimd);
PicoLLM.setWasmLib(picoLLMWasmLib);
PicoLLMWorker.setWasmLib(picoLLMWasmLib);

export {
  Dialog,
  GemmaChatDialog,
  Llama2ChatDialog,
  Llama3ChatDialog,
  MistralChatDialog,
  MixtralChatDialog,
  Phi2Dialog,
  Phi2QADialog,
  Phi2ChatDialog,
  Phi3ChatDialog,
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
