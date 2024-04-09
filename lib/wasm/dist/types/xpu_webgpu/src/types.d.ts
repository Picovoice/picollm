/// <reference types="@webgpu/types" />
export type DeviceSettings = {
    workgroupSize: number;
};
export type DeviceType = {
    device: GPUDevice;
    settings?: DeviceSettings;
    bindGroupLayout?: GPUBindGroupLayout;
    pipeline?: GPUComputePipeline;
    metadataBuffer?: GPUBuffer;
};
export type ShaderType = {
    [shaderName: string]: (obj: DeviceType, settings: DeviceSettings) => void;
};
//# sourceMappingURL=types.d.ts.map