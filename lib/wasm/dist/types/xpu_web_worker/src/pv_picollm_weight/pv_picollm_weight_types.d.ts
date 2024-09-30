import { PvXpuType } from "../types";
export declare enum PvPicollmWeightAction {
    WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BLOCKS = 100,
    WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_METAS = 101,
    WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BIAS = 102,
    WEIGHT_BLOCK_MIXED_16X8_FORWARD_SINGLE = 103,
    WEIGHT_BLOCK_MIXED_16X8_FORWARD_MULTIPLE = 104
}
export type WeightBlockMixed16x8PreprocessBlocksType = {
    shape: Int32Array;
    bitDepths: Int32Array;
    bitDepthStarts: Int32Array;
    numBlockBytes: number;
    blocksAddress: number;
    block: Uint8Array;
} & PvXpuType<{
    pv_picollm_weight_block_mixed_16x8_preprocess_blocks: (shapeAddress: number, numBitDepths: number, bitDepthsAddress: number, bitDepthStartsAddress: number, blocksAddress: number) => void;
}>;
export type WeightBlockMixed16x8PreprocessMetasType = {
    memAddress: number;
    metas: Uint16Array;
} & PvXpuType<object>;
export type WeightBlockMixed16x8PreprocessBiasType = {
    memAddress: number;
    bias: Float32Array;
} & PvXpuType<object>;
export type WeightBlockMixed16x8ForwardSingleType = {
    shape: Int32Array;
    indicesAddress: number;
    bitDepths: Int32Array;
    bitDepthStarts: Int32Array;
    numMetas: number;
    metasAddress: number;
    numBlockBytes: number;
    blocksAddress: number;
    xOffset: number;
    xAddress: number;
    yAddress: number;
    xBuffer: Float32Array;
    biasAddress: number;
} & PvXpuType<{
    pv_picollm_weight_block_mixed_16x8_forward_single: (shapeAddress: number, indicesAddress: number, numBitDepths: number, bitDepthsAddress: number, bitDepthStartsAddress: number, metasAddress: number, blocksAddress: number, xAddress: number, yAddress: number) => void;
    pv_picollm_weight_block_mixed_16x8_add_bias: (n: number, dimension: number, yAddress: number, biasAddress: number) => void;
}>;
export type WeightBlockMixed16x8ForwardMultipleType = {
    shape: Int32Array;
    indicesAddress: number;
    bitDepths: Int32Array;
    bitDepthStarts: Int32Array;
    numMetas: number;
    metasAddress: number;
    numBlockBytes: number;
    blocksAddress: number;
    n: number;
    xOffset: number;
    xAddress: number;
    yAddress: number;
    xBuffer: Float32Array;
    biasAddress: number;
} & PvXpuType<{
    pv_picollm_weight_block_mixed_16x8_forward_multiple: (shapeAddress: number, indicesAddress: number, numBitDepths: number, bitDepthsAddress: number, bitDepthStartsAddress: number, metasAddress: number, blocksAddress: number, n: number, xAddress: number, yAddress: number) => void;
    pv_picollm_weight_block_mixed_16x8_add_bias: (n: number, dimension: number, yAddress: number, biasAddress: number) => void;
}>;
//# sourceMappingURL=pv_picollm_weight_types.d.ts.map