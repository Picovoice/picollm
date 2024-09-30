/// <reference types="@webgpu/types" />
export type PvWebGPUBuffer = {
    deviceAddress: number;
    buffer: GPUBuffer;
};
export type PvWebGPUShader = {
    computePipeline: GPUComputePipeline;
    pipelineLayout?: GPUPipelineLayout;
    shaderModule?: GPUShaderModule;
};
export type PvWebGPUShaderLoad = {
    [shaderName: string]: (device: GPUDevice) => PvWebGPUShader;
};
export declare class PvWebGPUDevice {
    private _numCommandsEncoded;
    private _commandEncoder;
    private _passEncoder;
    private _stageBuffersPendingMap;
    private _uniformBuffersPendingRelease;
    device: GPUDevice;
    bufferReusePool: Map<string, GPUBuffer[]>;
    shaders: Record<string, PvWebGPUShader>;
    isTimerEnabled: boolean;
    timestampBuffers: Record<string, GPUBuffer[]>;
    shaderTimes: Record<string, bigint[]>;
    adapterInfo: GPUAdapterInfo;
    constructor(device: GPUDevice, adapterInfo: GPUAdapterInfo);
    private getBufferKey;
    get commandEncoder(): GPUCommandEncoder;
    get numCommandsEncoded(): number;
    set numCommandsEncoded(value: number);
    endComputePass(): void;
    getBuffer(sizeBytes: number, usage: GPUBufferUsageFlags, mappedAtCreation?: boolean, label?: string): GPUBuffer;
    scheduleUniformBufferForRelease(buffer: GPUBuffer): void;
    releaseBuffer(buffer: GPUBuffer, clearBuffer?: boolean): void;
    sync(): Promise<void>;
    reportShaderTimes(): void;
    flushCommandEncoder(): void;
    writeBuffer(sizeBytes: number, offset: number, srcArray: Uint8Array, dstBuffer: GPUBuffer): void;
    dispatchComputerShader(bindGroup: GPUBindGroup | null, pipeline: GPUComputePipeline, shaderName: string, workgroupCountX: number, workgroupCountY?: number, workgroupCountZ?: number): void;
}
//# sourceMappingURL=pv_types.d.ts.map