import { PvXpuType } from "../types";
export declare enum PvPicollmAttentionAction {
    ATTENTION_PRECOMPUTE_ENCODING = 200,
    ATTENTION_ATTEND_COMBINED = 201
}
export type AttentionPrecomputeEncodingType = {
    encodingAddress: number;
    dimension: number;
    steps: number;
    theta: number;
} & PvXpuType<{
    pv_picollm_attention_precompute_encoding_wasm: (encodingAddress: number, dimension: number, steps: number, theta: number) => void;
}>;
export type AttentionAttendAtOnceType = {
    numHeads: number;
    numKvHeads: number;
    windowLength: number;
    headDimension: number;
    ropeDimension: number;
    ropeInterleaved: number;
    newEncodingAddress: number;
    qBuffer: Float32Array;
    kBuffer: Float32Array;
    vBuffer: Float32Array;
    keysAddress: number;
    keyInterceptsAddress: number;
    keySlopesAddress: number;
    valuesAddress: number;
    valueInterceptsAddress: number;
    valueSlopesAddress: number;
    position: number;
    queryAddress: number;
    n: number;
    outputAddress: number;
} & PvXpuType<{
    pv_picollm_attention_encode_wasm: (xAddress: number, newEncodingAddress: number, n: number, numHeads: number, ropeInterleaved: number, headDimension: number, ropeDimension: number, position: number) => void;
    pv_picollm_attention_update_keys_wasm: (numKvHeads: number, windowLength: number, headDimension: number, keysAddress: number, keyInterceptsAddress: number, keySlopesAddress: number, position: number, n: number, tfAddress: number) => void;
    pv_picollm_attention_update_values_wasm: (numKvHeads: number, windowLength: number, headDimension: number, valuesAddress: number, valueInterceptsAddress: number, valueSlopesAddress: number, position: number, n: number, tfAddress: number) => void;
    pv_picollm_attention_transpose_query_wasm: (n: number, tfAddress: number, hfAddress: number, numHeads: number, headDimension: number) => void;
    pv_picollm_attention_attend_wasm: (numHeads: number, numKvHeads: number, windowLength: number, headDimension: number, keysAddress: number, keyInterceptsAddress: number, keySlopesAddress: number, valuesAddress: number, valueInterceptsAddress: number, valueSlopesAddress: number, position: number, queryAddress: number, n: number, outputAddress: number) => void;
}>;
//# sourceMappingURL=pv_picollm_attention_types.d.ts.map