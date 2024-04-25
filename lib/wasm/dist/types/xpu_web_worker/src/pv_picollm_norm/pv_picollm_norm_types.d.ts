import { PvXpuType } from "../types";
export declare enum PvPicollmNormAction {
    NORM_FORWARD = 600
}
export type NormForwardType = {
    dimension: number;
    eps: number;
    weightAddress: number;
    n: number;
    xOffset: number;
    xAddress: number;
    yOffset: number;
    yAddress: number;
} & PvXpuType<{
    pv_picollm_norm_forward: (dimension: number, eps: number, weightAddress: number, n: number, xAddress: number, yAddress: number) => void;
}>;
//# sourceMappingURL=pv_picollm_norm_types.d.ts.map