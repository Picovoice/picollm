import { MemType, XpuType } from "./types";
export declare class PvXpu {
    private static xpuObjects;
    private static memoryObjects;
    private static uniquePointers;
    static addXpu(objAddress: number, data: XpuType): void;
    static getXpu(objAddress: number): XpuType | undefined;
    static hasXpu(objAddress: number): boolean;
    static removeXpu(objAddress: number): void;
    static addMemory(memAddress: number, data: MemType): void;
    static getMemory(memAddress: number): MemType | undefined;
    static hasMemory(memAddress: number): boolean;
    static removeMemory(memAddress: number): void;
    static getUniquePointer(): number;
    static removeUniquePointer(ptr: number): void;
}
export declare const waitForWorker: (worker: Worker, command: any, options?: any) => Promise<unknown>;
//# sourceMappingURL=pv_xpu_device.d.ts.map