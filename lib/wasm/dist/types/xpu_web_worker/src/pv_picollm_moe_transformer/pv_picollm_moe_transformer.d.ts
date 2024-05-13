import { PvGraph } from "../pv_graph";
export declare const getPicollmMoeTransformerWasmFunctions: (memory: WebAssembly.Memory, graph: PvGraph, imports?: any) => {
    pv_picollm_moe_transformer_add_to_buffer_web_worker_wasm: (...args: any[]) => Promise<void>;
    pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer_web_worker_wasm: (...args: any[]) => Promise<void>;
    pv_picollm_moe_transformer_add_buffers_web_worker_wasm: (...args: any[]) => Promise<void>;
};
//# sourceMappingURL=pv_picollm_moe_transformer.d.ts.map