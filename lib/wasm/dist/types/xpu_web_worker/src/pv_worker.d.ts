declare class PvWorker {
    private worker;
    private listeners;
    constructor(worker: Worker);
    postMessage(message: any, options?: {
        transfer: Transferable[];
    }): void;
    terminate(): void;
    addListener(workId: number, listener: (...args: any[]) => void): void;
    removeListener(workId: number): void;
}
declare const generateWorkId: () => number;
declare const promisifyPvWorker: <T = any>(workId: number, worker: PvWorker) => Promise<T>;
declare const poolPvWorker: <T = any>(worker: PvWorker, command: Record<string, any>, options?: any) => Promise<T>;
export { PvWorker, generateWorkId, promisifyPvWorker, poolPvWorker, };
//# sourceMappingURL=pv_worker.d.ts.map