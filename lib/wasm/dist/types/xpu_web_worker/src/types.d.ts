export declare enum PvXpuAction {
    INIT = 0,
    ALLOC = 1,
    FREE = 2,
    COPY_TO_XPU = 3,
    COPY_FROM_XPU = 4,
    MATRIX_VECTOR_MULTIPLY = 5,
    SYNC_VECTOR = 6
}
export type XpuType = {
    deviceMem: Set<number>;
    numWorkers: number;
    workers: Worker[];
};
export type MemType = {
    objAddress: number;
    isShared: boolean;
    allocSize: number;
    chunkSize: number;
};
//# sourceMappingURL=types.d.ts.map