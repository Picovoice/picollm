import { PvWebGPUShaderLoad } from "../pv_types";
export declare const weightBlockMixed16x8Shaders: PvWebGPUShaderLoad;
export declare const getPicollmWeightBlockMixed16x8WebGpuFunctions: (memory: WebAssembly.Memory) => {
    pv_picollm_weight_block_mixed_16x8_preprocess_blocks_webgpu_wasm: (objAddress: number, bitDepth: number, blocksAddress: number, blocksOffsetBytes: number, nbr: number, nbc: number, statusAddress: number) => void;
    pv_picollm_weight_block_mixed_16x8_forward_single_shuffle_x_webgpu_wasm: (objAddress: number, xAddress: number, xOffsetBytes: number, indicesAddress: number, indicesOffsetBytes: number, shape1: number, yAddress: number, statusAddress: number) => void;
    pv_picollm_weight_block_mixed_16x8_forward_single_webgpu_wasm: (objAddress: number, bitDepth: number, xAddress: number, xOffsetBytes: number, metasAddress: number, metasOffsetBytes: number, blocksAddress: number, blocksOffsetBytes: number, nbr: number, totalNbc: number, bitDepthNbc: number, yAddress: number, yOffsetBytes: number, statusAddress: number) => void;
    pv_picollm_weight_block_mixed_16x8_forward_single_reduce_y_webgpu_wasm: (objAddress: number, nbr: number, nbc: number, xAddress: number, yAddress: number, statusAddress: number) => void;
    pv_picollm_weight_block_mixed_16x8_forward_multiple_shuffle_x_webgpu_wasm: (objAddress: number, xAddress: number, xOffsetBytes: number, indicesAddress: number, indicesOffsetBytes: number, n: number, shape1: number, yAddress: number, statusAddress: number) => void;
    pv_picollm_weight_block_mixed_16x8_forward_multiple_webgpu_wasm: (objAddress: number, bitDepth: number, xAddress: number, xOffsetBytes: number, metasAddress: number, metasOffsetBytes: number, blocksAddress: number, blocksOffsetBytes: number, nbc: number, nbr: number, n: number, yAddress: number, yOffsetBytes: number, statusAddress: number) => void;
    pv_picollm_weight_block_mixed_16x8_forward_multiple_shuffle_y_webgpu_wasm: (objAddress: number, n: number, shape0: number, xAddress: number, yAddress: number, statusAddress: number) => void;
    pv_picollm_weight_block_mixed_16x8_add_bias_webgpu_wasm: (objAddress: number, n: number, dimension: number, biasAddress: number, yAddress: number, statusAddress: number) => void;
};
//# sourceMappingURL=pv_picollm_weight_block_mixed_16x8.d.ts.map