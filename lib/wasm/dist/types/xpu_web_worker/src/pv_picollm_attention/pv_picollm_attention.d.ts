import { PvGraph } from "../pv_graph";
export declare const getPicollmAttentionWasmFunctions: (memory: WebAssembly.Memory, graph: PvGraph, imports?: any) => {
    pv_picollm_attention_precompute_encoding_web_worker_wasm: (objAddress: number, encodingAddress: number, dimension: number, steps: number, theta: number, statusAddress: number) => Promise<void>;
    pv_picollm_attention_attend_combined_web_worker_wasm: (...args: any[]) => Promise<void>;
};
//# sourceMappingURL=pv_picollm_attention.d.ts.map