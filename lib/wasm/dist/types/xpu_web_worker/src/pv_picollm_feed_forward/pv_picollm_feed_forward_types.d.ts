import { PvXpuType } from "../types";
export declare enum PvPicollmFeedForwardAction {
    FEED_FORWARD_SILU = 300,
    FEED_FORWARD_GELU = 301,
    FEED_FORWARD_ALMOST_GELU = 302,
    FEED_FORWARD_MULTIPLY_BUFFERS = 303
}
export type FeedForwardSiluType = {
    n: number;
    xAddress: number;
} & PvXpuType<{
    pv_picollm_feed_forward_silu: (n: number, xAddress: number) => void;
}>;
export type FeedForwardGeluType = {
    n: number;
    xAddress: number;
} & PvXpuType<{
    pv_picollm_feed_forward_gelu: (n: number, xAddress: number) => void;
}>;
export type FeedForwardAlmostGeluType = {
    n: number;
    xAddress: number;
} & PvXpuType<{
    pv_picollm_feed_forward_almost_gelu: (n: number, xAddress: number) => void;
}>;
export type FeedForwardMultiplyBuffersType = {
    n: number;
    xAddress: number;
    yAddress: number;
} & PvXpuType<{
    pv_picollm_feed_forward_multiply_buffers: (n: number, xAddress: number, yAddress: number) => void;
}>;
//# sourceMappingURL=pv_picollm_feed_forward_types.d.ts.map