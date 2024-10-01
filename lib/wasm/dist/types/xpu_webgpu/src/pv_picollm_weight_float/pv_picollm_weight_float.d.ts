import { PvWebGPUShaderLoad } from "../pv_types";
export declare const weightFloatForwardShader: PvWebGPUShaderLoad;
export declare const getPicollmWeightFloatWebGpuFunctions: (memory: WebAssembly.Memory) => {
    pv_picollm_weight_float_forward_webgpu_wasm: (objAddress: number, n: number, nc: number, nr: number, wOffset: number, wAddress: number, xOffset: number, xAddress: number, yOffset: number, yAddress: number, statusAddress: number) => void;
};
//# sourceMappingURL=pv_picollm_weight_float.d.ts.map