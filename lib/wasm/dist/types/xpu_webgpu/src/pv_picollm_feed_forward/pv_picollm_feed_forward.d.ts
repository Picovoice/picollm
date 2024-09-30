import { PvWebGPUShaderLoad } from "../pv_types";
export declare const feedForwardShaders: PvWebGPUShaderLoad;
export declare const getPicollmFeedForwardWebGpuFunctions: (memory: WebAssembly.Memory) => {
    pv_picollm_feed_forward_silu_webgpu_wasm: (objAddress: number, n: number, xAddress: number, statusAddress: number) => void;
    pv_picollm_feed_forward_gelu_webgpu_wasm: (objAddress: number, n: number, xAddress: number, statusAddress: number) => void;
    pv_picollm_feed_forward_almost_gelu_webgpu_wasm: (objAddress: number, n: number, xAddress: number, statusAddress: number) => void;
    pv_picollm_feed_forward_multiply_buffers_webgpu_wasm: (objAddress: number, n: number, xAddress: number, yAddress: number, statusAddress: number) => void;
};
//# sourceMappingURL=pv_picollm_feed_forward.d.ts.map