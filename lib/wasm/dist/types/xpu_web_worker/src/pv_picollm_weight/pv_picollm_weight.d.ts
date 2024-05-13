import { PvGraph } from "../pv_graph";
export declare const getPicollmWeightWasmFunctions: (memory: WebAssembly.Memory, graph: PvGraph, imports?: any) => {
    pv_picollm_weight_block_mixed_16x8_preprocess_blocks_web_worker_wasm: (objAddress: number, nameAddress: number, shapeAddress: number, numBitDepths: number, bitDepthsAddress: number, bitDepthsStartAddress: number, batchSize: number, numBlockBytes: number, blocksAddress: number, blocksXpuAddress: number, statusAddress: number) => Promise<void>;
    pv_picollm_weight_block_mixed_16x8_preprocess_metas_web_worker_wasm: (objAddress: number, shapeAddress: number, numBitDepths: number, bitDepthsStartAddress: number, blocksXpuAddress: number, batchSize: number, numMetas: number, metasAddress: number, metasXpuAddress: number, statusAddress: number) => Promise<void>;
    pv_picollm_weight_block_mixed_16x8_preprocess_bias_web_worker_wasm: (objAddress: number, shapeAddress: number, blocksXpuAddress: number, batchSize: number, biasAddress: number, biasXpuAddress: number, statusAddress: number) => Promise<void>;
    pv_picollm_weight_block_mixed_16x8_forward_single_web_worker_wasm: (...args: any[]) => Promise<void>;
    pv_picollm_weight_block_mixed_16x8_forward_multiple_web_worker_wasm: (...args: any[]) => Promise<void>;
    pv_picollm_weight_float_forward_web_worker_wasm: (...args: any[]) => Promise<void>;
};
//# sourceMappingURL=pv_picollm_weight.d.ts.map