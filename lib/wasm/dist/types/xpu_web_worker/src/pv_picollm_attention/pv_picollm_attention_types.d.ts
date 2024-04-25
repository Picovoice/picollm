import { PvXpuType } from "../types";
export declare enum PvPicollmAttentionAction {
    ATTENTION_PRECOMPUTE_ENCODING = 200,
    ATTENTION_ENCODE = 201,
    ATTENTION_ATTEND = 202,
    ATTENTION_UPDATE_KEYS = 203,
    ATTENTION_UPDATE_VALUES = 204,
    ATTENTION_TRANSPOSE_QUERY = 205
}
export type AttentionPrecomputeEncodingType = {
    encodingAddress: number;
    dimension: number;
    steps: number;
    theta: number;
} & PvXpuType<{
    pv_picollm_attention_precompute_encoding: (encodingAddress: number, dimension: number, steps: number, theta: number) => void;
}>;
export type AttentionEncodeType = {
    xAddress: number;
    newEncodingAddress: number;
    n: number;
    numHeads: number;
    ropeInterleaved: number;
    headDimension: number;
    ropeDimension: number;
    position: number;
} & PvXpuType<{
    pv_picollm_attention_encode: (xAddress: number, newEncodingAddress: number, n: number, numHeads: number, ropeInterleaved: number, headDimension: number, ropeDimension: number, position: number) => void;
}>;
export type AttentionAttendType = {
    numHeads: number;
    numKvHeads: number;
    windowLength: number;
    headDimension: number;
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
    pv_picollm_attention_attend: (numHeads: number, numKvHeads: number, windowLength: number, headDimension: number, keysAddress: number, keyInterceptsAddress: number, keySlopesAddress: number, valuesAddress: number, valueInterceptsAddress: number, valueSlopesAddress: number, position: number, queryAddress: number, n: number, outputAddress: number) => void;
}>;
export type AttentionUpdateKeysType = {
    numKvHeads: number;
    windowLength: number;
    headDimension: number;
    keysAddress: number;
    keyInterceptsAddress: number;
    keySlopesAddress: number;
    position: number;
    n: number;
    tfAddress: number;
} & PvXpuType<{
    pv_picollm_attention_update_keys: (numKvHeads: number, windowLength: number, headDimension: number, keysAddress: number, keyInterceptsAddress: number, keySlopesAddress: number, position: number, n: number, tfAddress: number) => void;
}>;
export type AttentionUpdateValuesType = {
    numKvHeads: number;
    windowLength: number;
    headDimension: number;
    valuesAddress: number;
    valueInterceptsAddress: number;
    valueSlopesAddress: number;
    position: number;
    n: number;
    tfAddress: number;
} & PvXpuType<{
    pv_picollm_attention_update_values: (numKvHeads: number, windowLength: number, headDimension: number, valuesAddress: number, valueInterceptsAddress: number, valueSlopesAddress: number, position: number, n: number, tfAddress: number) => void;
}>;
export type AttentionTransposeQueryType = {
    n: number;
    tfAddress: number;
    hfAddress: number;
    numHeads: number;
    headDimension: number;
} & PvXpuType<{
    pv_picollm_attention_transpose_query: (n: number, tfAddress: number, hfAddress: number, numHeads: number, headDimension: number) => void;
}>;
//# sourceMappingURL=pv_picollm_attention_types.d.ts.map