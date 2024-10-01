import { PvWebGPUShaderLoad } from "../pv_types";
export declare const gateForwardShader: PvWebGPUShaderLoad;
export declare const getPicollmGateWebGpuFunctions: (memory: WebAssembly.Memory) => {
    pv_picollm_gate_forward_webgpu_wasm: (objAddress: number, n: number, k: number, numExperts: number, yAddress: number, yOffset: number, indicesAddress: number, indicesOffset: number, weightsAddress: number, weightsOffset: number, statusAddress: number) => void;
};
//# sourceMappingURL=pv_picollm_gate.d.ts.map