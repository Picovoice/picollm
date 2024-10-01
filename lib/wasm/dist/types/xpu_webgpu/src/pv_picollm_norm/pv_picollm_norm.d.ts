import { PvWebGPUShaderLoad } from "../pv_types";
export declare const normForwardShader: PvWebGPUShaderLoad;
export declare const getPicollmNormWebGpuFunctions: (memory: WebAssembly.Memory) => {
    pv_picollm_norm_forward_webgpu_wasm: (objAddress: number, dimension: number, eps: number, weightAddress: number, n: number, xOffset: number, xAddress: number, yOffset: number, yAddress: number, statusAddress: number) => void;
};
//# sourceMappingURL=pv_picollm_norm.d.ts.map