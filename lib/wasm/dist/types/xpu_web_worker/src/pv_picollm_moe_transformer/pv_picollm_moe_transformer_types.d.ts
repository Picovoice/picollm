import { PvXpuType } from "../types";
export declare enum PvPicollmMoeTransformerAction {
    ADD_TO_BUFFER = 500,
    MULTIPLY_WEIGHT_AND_ADD_TO_BUFFER = 501,
    ADD_BUFFERS = 502
}
export type MoeTransformerAddToBufferType = {
    n: number;
    xAddress: number;
    bufferAddress: number;
} & PvXpuType<{
    pv_picollm_moe_transformer_add_to_buffer: (n: number, xAddress: number, bufferAddress: number) => void;
}>;
export type MoeTransformerMultiplyWeightAndAddToBufferType = {
    n: number;
    weightsIndex: number;
    yIndex: number;
    weightsAddress: number;
    xAddress: number;
    yAddress: number;
} & PvXpuType<{
    pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer: (n: number, weightsIndex: number, yIndex: number, weightsAddress: number, xAddress: number, yAddress: number) => void;
}>;
export type MoeTransformerAddBuffersType = {
    n: number;
    buffer1Address: number;
    buffer2Address: number;
    yAddress: number;
} & PvXpuType<{
    pv_picollm_moe_transformer_add_buffers: (n: number, buffer1Address: number, buffer2Address: number, yAddress: number) => void;
}>;
//# sourceMappingURL=pv_picollm_moe_transformer_types.d.ts.map