declare const initXpu: (memory: WebAssembly.Memory, xpuHelperWasm?: Uint8Array) => {
    pv_matrix_vector_multiply_web_worker_wasm: (objAddress: number, matrixAddress: number, vectorAddress: number, m: number, n: number, resultAddress: number, statusAddress: number) => Promise<void>;
    pv_xpu_web_worker_device_init_wasm: (objAddress: number, numWorkers: number, statusAddress: number) => Promise<void>;
    pv_xpu_web_worker_device_cleanup_wasm: (objAddress: number) => void;
    pv_xpu_web_worker_device_mem_alloc_wasm: (objAddress: number, memAddress: number, sizeBytes: number, batchSize: number, isShared: number, statusAddress: number) => Promise<void>;
    pv_xpu_web_worker_device_mem_free_wasm: (memAddress: number) => Promise<void>;
    pv_xpu_web_worker_device_mem_copy_to_xpu_wasm: (memAddress: number, hostAddress: number, sizeBytes: number) => Promise<void>;
    pv_xpu_web_worker_device_mem_copy_from_xpu_wasm: (memAddress: number, hostAddress: number, sizeBytes: number) => Promise<void>;
};
export { initXpu };
//# sourceMappingURL=pv_xpu.d.ts.map