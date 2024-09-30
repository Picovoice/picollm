import { PvGraph } from "../pv_graph";
export declare const getPicollmFeedForwardWasmFunctions: (memory: WebAssembly.Memory, graph: PvGraph, imports?: any) => {
    pv_picollm_feed_forward_silu_web_worker_wasm: (...args: any[]) => Promise<void>;
    pv_picollm_feed_forward_gelu_web_worker_wasm: (...args: any[]) => Promise<void>;
    pv_picollm_feed_forward_almost_gelu_web_worker_wasm: (...args: any[]) => Promise<void>;
    pv_picollm_feed_forward_multiply_buffers_web_worker_wasm: (...args: any[]) => Promise<void>;
};
//# sourceMappingURL=pv_picollm_feed_forward.d.ts.map