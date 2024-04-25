export declare const getPicollmMoeTransformerWasmFunctions: (memory: WebAssembly.Memory) => {
    pv_picollm_moe_transformer_add_to_buffer_web_worker_wasm: (objAddress: number, n: number, xAddress: number, bufferAddress: number, statusAddress: number) => Promise<void>;
    pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer_web_worker_wasm: (objAddress: number, n: number, weightsIndex: number, yIndex: number, weightsAddress: number, xAddress: number, yAddress: number, statusAddress: number) => Promise<void>;
    pv_picollm_moe_transformer_add_buffers_web_worker_wasm: (objAddress: number, n: number, buffer1Address: number, buffer2Address: number, yAddress: number, statusAddress: number) => Promise<void>;
};
//# sourceMappingURL=pv_picollm_moe_transformer.d.ts.map