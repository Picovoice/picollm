declare const initXpu: (memory: WebAssembly.Memory, xpuHelperWasm?: Uint8Array) => {
    pv_matrix_vector_multiply_web_worker_wasm: (objAddress: number, matrixAddress: number, vectorAddress: number, m: number, n: number, resultAddress: number, statusAddress: number) => Promise<void>;
    aligned_alloc: (alignment: number, size: number) => Promise<number>;
    free: (address: number) => Promise<void>;
    pv_picollm_table_forward: (objAddress: number, numTokens: number, xAddress: number, yAddress: number) => Promise<void>;
    pv_picollm_feed_forward_almost_gelu_init_lookup_table: CallableFunction | undefined;
    pv_xpu_graphified_alloc_wasm: (...args: any[]) => Promise<void>;
    pv_xpu_graphified_free_wasm: (...args: any[]) => Promise<void>;
    pv_xpu_web_worker_device_info_wasm: (browserNameAddressAddress: number, browserVersionAddressAddress: number, osNameAddressAddress: number, numCoresAddress: number, statusAddress: number) => Promise<void>;
    pv_xpu_web_worker_device_init_wasm: (objAddress: number, numWorkers: number, statusAddress: number) => Promise<void>;
    pv_xpu_web_worker_device_cleanup_wasm: (objAddress: number) => void;
    pv_xpu_web_worker_device_get_unique_pointer_wasm: () => number;
    pv_xpu_web_worker_device_mem_alloc_wasm: (...args: any[]) => Promise<void>;
    pv_xpu_web_worker_device_mem_free_wasm: (...args: any[]) => Promise<void>;
    pv_xpu_web_worker_device_mem_copy_to_xpu_wasm: (...args: any[]) => Promise<void>;
    pv_xpu_web_worker_device_mem_copy_from_xpu_wasm: (...args: any[]) => Promise<void>;
    pv_xpu_web_worker_device_mem_memset_wasm: (...args: any[]) => Promise<void>;
    pv_xpu_web_worker_get_max_workers_wasm: (maxWorkersAddress: number) => Promise<void>;
    pv_xpu_web_worker_timer_start_wasm: (objAddress: number) => Promise<void>;
    pv_xpu_web_worker_timer_stop_wasm: (objAddress: number) => Promise<void>;
    pv_xpu_web_worker_start_graph_wasm: (objAddress: number) => Promise<void>;
    pv_xpu_web_worker_stop_graph_wasm: (objAddress: number) => Promise<void>;
    pv_xpu_web_worker_execute_graph_wasm: (objAddress: number, statusAddress: number) => Promise<void>;
    pv_xpu_web_worker_picollm_table_forward_wasm: (...args: any[]) => Promise<void>;
};
export { initXpu, };
//# sourceMappingURL=pv_xpu.d.ts.map