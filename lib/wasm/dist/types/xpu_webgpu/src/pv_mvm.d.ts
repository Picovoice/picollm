import { ShaderType } from "./types";
export declare const mvmShader: ShaderType;
export declare const getMvmWasmFunctions: (memory: WebAssembly.Memory) => {
    pv_matrix_vector_multiply_webgpu_wasm: (objAddress: number, matrixAddress: number, vectorAddress: number, m: number, n: number, resultAddress: number, statusAddress: number) => Promise<void>;
};
//# sourceMappingURL=pv_mvm.d.ts.map