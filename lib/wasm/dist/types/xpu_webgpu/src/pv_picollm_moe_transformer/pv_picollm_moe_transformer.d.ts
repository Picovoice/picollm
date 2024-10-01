import { PvWebGPUShaderLoad } from "../pv_types";
export declare const moeTransformerForwardShaders: PvWebGPUShaderLoad;
export declare const getPicollmMoeTransformerWebGpuFunctions: (memory: WebAssembly.Memory) => {
    pv_picollm_moe_transformer_add_to_buffer_webgpu_wasm: (objAddress: number, n: number, xAddress: number, xOffset: number, bufferAddress: number, bufferOffset: number, statusAddress: number) => void;
    pv_picollm_moe_transformer_add_buffers_webgpu_wasm: (objAddress: number, n: number, buffer1Address: number, buffer1Offset: number, buffer2Address: number, buffer2Offset: number, yAddress: number, yOffset: number, statusAddress: number) => void;
    pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer_webgpu_wasm: (objAddress: number, n: number, weightsIndex: number, yIndex: number, weightsAddress: number, weightsOffset: number, xAddress: number, xOffset: number, yAddress: number, yOffset: number, statusAddress: number) => void;
};
//# sourceMappingURL=pv_picollm_moe_transformer.d.ts.map