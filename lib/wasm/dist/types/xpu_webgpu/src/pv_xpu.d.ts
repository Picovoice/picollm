declare const initXpu: (memory: WebAssembly.Memory, _wasm?: Uint8Array) => {
    pv_matrix_vector_multiply_webgpu_wasm: (objAddress: number, matrixAddress: number, vectorAddress: number, m: number, n: number, resultAddress: number, statusAddress: number) => Promise<void>;
    pv_xpu_webgpu_device_init_wasm: (objAddress: number, statusAddress: number) => Promise<void>;
    pv_xpu_webgpu_device_load_shader_func_wasm: (objAddress: number, shaderNameAddress: number, statusAddress: number) => void;
    pv_xpu_webgpu_device_mem_alloc_wasm: (objAddress: number, memAddress: number, sizeBytes: number, isOutput: boolean, statusAddress: number) => void;
    pv_xpu_webgpu_device_mem_free_wasm: (memAddress: number) => void;
    pv_xpu_webgpu_device_mem_copy_to_xpu_wasm: (memAddress: number, hostAddress: number, offset: number, sizeBytes: number) => Promise<void>;
    pv_xpu_webgpu_device_mem_copy_from_xpu_wasm: (memAddress: number, hostAddress: number, offset: number, sizeBytes: number) => Promise<void>;
    pv_xpu_webgpu_device_mem_memset_wasm: (memAddress: number, fillByte: number, sizeBytes: number) => Promise<void>;
    pv_xpu_webgpu_device_cleanup_wasm: (objAddress: number) => void;
};
export { initXpu };
//# sourceMappingURL=pv_xpu.d.ts.map