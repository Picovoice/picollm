import { PvWorker } from "./pv_worker";
import { PvGraph } from "./pv_graph";
export declare enum PvXpuAction {
    INIT = 0,
    ALLOC = 1,
    FREE = 2,
    COPY_TO_XPU = 3,
    COPY_FROM_XPU = 4,
    MEMSET = 5,
    TIMER_START = 6,
    TIMER_STOP = 7,
    MATRIX_VECTOR_MULTIPLY = 8,
    SYNC_VECTOR = 9
}
export type XpuType = {
    deviceMem: Set<number>;
    numWorkers: number;
    workers: PvWorker[];
    graph: PvGraph;
};
export type MemType = {
    objAddress: number;
    memFlag: number;
    allocSize: number;
    chunkSize: number;
    numWorkers?: number;
    workerSet?: number[];
};
export type ExportType = {
    aligned_alloc: (alignment: number, size: number) => number;
    calloc: (num: number, size: number) => number;
    free: (ptr: number) => void;
};
export type MemAllocType = Map<number, {
    allocSize: number;
    workerMemAddress: number;
}>;
export type PvXpuType<T> = {
    globals: {
        exports: ExportType & T;
        memory: WebAssembly.Memory;
        memAlloc: MemAllocType;
    };
};
export type InitType = {
    wasm: Uint8Array;
};
export type AllocMemType = {
    size: number;
    memAddress: number;
};
export type FreeMemType = {
    memAddress: number;
};
export type CopyToXpuType = {
    memAddress: number;
    offset: number;
    buffer: Uint8Array;
};
export type CopyFromXpuType = {
    memAddress: number;
    offset: number;
    size: number;
};
export type MemsetType = {
    memAddress: number;
    fillByte: number;
    size: number;
};
export type TimerStartType = {
    workerIndex: number;
};
//# sourceMappingURL=types.d.ts.map