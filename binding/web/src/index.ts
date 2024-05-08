import { PicoLLM } from './picollm';
import { PicoLLMWorker } from './picollm_worker';

import {
  Dialog,
  GemmaChatDialog,
  Phi2Dialog,
  Phi2QADialog,
  Phi2ChatDialog,
} from './dialog';

import {
  PicoLLMInitOptions,
  PicoLLMGenerateOptions,
  PicoLLMModel,
  PicoLLMWorkerFailureResponse,
  PicoLLMWorkerInitRequest,
  PicoLLMWorkerInitResponse,
  PicoLLMWorkerGenerateRequest,
  PicoLLMWorkerGenerateResponse,
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

import picoLLMWasm from '../lib/pv_picollm.wasm';
import picoLLMWasmSimd from '../lib/pv_picollm_simd.wasm';

import * as PicoLLMErrors from './picollm_errors';

PicoLLM.setWasm(picoLLMWasm);
PicoLLM.setWasmSimd(picoLLMWasmSimd);
PicoLLMWorker.setWasm(picoLLMWasm);
PicoLLMWorker.setWasmSimd(picoLLMWasmSimd);

export {
  Dialog,
  GemmaChatDialog,
  Phi2Dialog,
  Phi2QADialog,
  Phi2ChatDialog,
  PicoLLM,
  PicoLLMGenerateOptions,
  PicoLLMInitOptions,
  PicoLLMModel,
  PicoLLMWorker,
  PicoLLMWorkerFailureResponse,
  PicoLLMWorkerInitRequest,
  PicoLLMWorkerInitResponse,
  PicoLLMWorkerGenerateRequest,
  PicoLLMWorkerGenerateResponse,
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
