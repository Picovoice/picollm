import { PvXpuType } from "../types";
export declare enum PvPicollmTransformerAction {
    ADD_TO_BUFFER = 700,
    ADD_BUFFERS = 701
}
export type TransformerAddToBufferType = {
    n: number;
    xAddress: number;
    bufferAddress: number;
} & PvXpuType<{
    pv_picollm_transformer_add_to_buffer: (n: number, xAddress: number, bufferAddress: number) => void;
}>;
export type TransformerAddBuffersType = {
    n: number;
    buffer1Address: number;
    buffer2Address: number;
    yAddress: number;
} & PvXpuType<{
    pv_picollm_transformer_add_buffers: (n: number, buffer1Address: number, buffer2Address: number, yAddress: number) => void;
}>;
//# sourceMappingURL=pv_picollm_transformer_types.d.ts.map