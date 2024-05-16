/// <reference types="@webgpu/types" />
import { DeviceType } from "./types";
export declare const gpuDevices: Map<number, DeviceType>;
export declare const gpuBuffers: Map<number, {
    deviceAddress: number;
    buffer: GPUBuffer;
    stageBuffer?: GPUBuffer | undefined;
}>;
//# sourceMappingURL=pv_devices.d.ts.map