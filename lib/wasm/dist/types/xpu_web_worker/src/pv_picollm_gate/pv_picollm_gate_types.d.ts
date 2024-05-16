import { PvXpuType } from "../types";
export declare enum PvPicollmGateAction {
    GATE_FORWARD = 400
}
export type GateForwardType = {
    n: number;
    k: number;
    numExperts: number;
    indicesAddress: number;
    weightsAddress: number;
    yAddress: number;
} & PvXpuType<{
    pv_picollm_gate_forward: (n: number, k: number, numExperts: number, indicesAddress: number, weightsAddress: number, yAddress: number) => void;
}>;
//# sourceMappingURL=pv_picollm_gate_types.d.ts.map