import { PvXpuType } from "../types";
export declare enum PvPicollmNormLayerAction {
    NORM_LAYER_FORWARD = 800
}
export type NormLayerForwardType = {
    dimension: number;
    eps: number;
    weightAddress: number;
    biasAddress: number;
    n: number;
    xOffset: number;
    xAddress: number;
    yOffset: number;
    yAddress: number;
} & PvXpuType<{
    pv_picollm_norm_layer_forward: (dimension: number, eps: number, weightAddress: number, biasAddress: number, n: number, xAddress: number, yAddress: number) => void;
}>;
//# sourceMappingURL=pv_picollm_norm_layer_types.d.ts.map