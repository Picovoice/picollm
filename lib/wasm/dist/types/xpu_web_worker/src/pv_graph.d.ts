type PvFunctionType = (...args: any[]) => Promise<void>;
declare class PvGraph {
    private readonly _names;
    private readonly _paths;
    private _stack;
    private _enabled;
    private _memory;
    constructor();
    addName(addr: number, name: string): void;
    getName(addr: number): string | undefined;
    get enabled(): boolean;
    set enabled(value: boolean);
    get memory(): WebAssembly.Memory | null;
    set memory(value: WebAssembly.Memory | null);
    graphify(originalFunction: PvFunctionType, inputsIdx: number[], outputIdx: number, subNameIdx?: number, overrideStatus?: number): (...args: any[]) => Promise<void>;
    addNode(node: PvNode, inputs: number[]): void;
    addFreeNode(node: PvNode, input: number): void;
    private executeHelper;
    execute(): Promise<void>;
    generateViz(): void;
    clear(): void;
}
declare class PvNode {
    private static nodeId;
    static executeWasmFn: CallableFunction;
    static tick: number;
    id: number;
    name: string;
    subName?: string;
    visited: boolean;
    numVisited: number;
    executionPromise?: Promise<any>;
    inputs: Set<PvNode>;
    inputsAddr: number[];
    output: number;
    timeWait: number;
    timeExecute: number;
    level: number;
    private readonly _fn;
    private readonly _args;
    constructor(name: string, fn: PvFunctionType, args: any[]);
    runOnce(): void;
    runFn(): Promise<void>;
    static reset(): void;
}
export { PvGraph, PvNode, };
//# sourceMappingURL=pv_graph.d.ts.map