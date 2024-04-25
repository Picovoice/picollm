import { PicoLLM } from './picollm';

import {
  PicoLLMInitOptions,
  PicoLLMGenerateOptions,
  PicoLLMModel,
} from './types';

import picoLLMWasm from '../lib/pv_picollm.wasm';
import picoLLMWasmSimd from '../lib/pv_picollm_simd.wasm';

import * as PicoLLMErrors from './picollm_errors';

PicoLLM.setWasm(picoLLMWasm);
PicoLLM.setWasmSimd(picoLLMWasmSimd);

export {
  PicoLLM,
  PicoLLMGenerateOptions,
  PicoLLMInitOptions,
  PicoLLMModel,
  PicoLLMErrors,
};
