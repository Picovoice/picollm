export declare const getPicollmFeedForwardWasmFunctions: (memory: WebAssembly.Memory) => {
    pv_picollm_feed_forward_silu_web_worker_wasm: (objAddress: number, n: number, xAddress: number, statusAddress: number) => Promise<void>;
    pv_picollm_feed_forward_gelu_web_worker_wasm: (objAddress: number, n: number, xAddress: number, statusAddress: number) => Promise<void>;
    pv_picollm_feed_forward_almost_gelu_web_worker_wasm: (objAddress: number, n: number, xAddress: number, statusAddress: number) => Promise<void>;
    pv_picollm_feed_forward_multiply_buffers_web_worker_wasm: (objAddress: number, n: number, xAddress: number, yAddress: number, statusAddress: number) => Promise<void>;
};
//# sourceMappingURL=pv_picollm_feed_forward.d.ts.map