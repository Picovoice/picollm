import { PvWebGPUShaderLoad } from "../pv_types";
export declare const normLayerForwardShader: PvWebGPUShaderLoad;
export declare const getPicollmNormLayerWebGpuFunctions: (memory: WebAssembly.Memory) => {
    pv_picollm_norm_layer_forward_webgpu_wasm: (objAddress: number, dimension: number, eps: number, weightAddress: number, weightOffset: number, biasAddress: number, biasOffset: number, n: number, xAddress: number, xOffset: number, yAddress: number, yOffset: number, statusAddress: number) => void;
};
//# sourceMappingURL=pv_picollm_norm_layer.d.ts.map