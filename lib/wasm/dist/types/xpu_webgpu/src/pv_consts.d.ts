import { PvWebGPUBuffer, PvWebGPUDevice } from "./pv_types";
export declare const PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE = 256;
export declare const PV_PICOLLM_WEBGPU_MAX_GRID_DIM = 65535;
export declare const PV_PICOLLM_WEBGPU_MAX_BLOCK_DIM = 1024;
export declare const gpuDevices: Map<number, PvWebGPUDevice>;
export declare const gpuBuffers: Map<number, PvWebGPUBuffer>;
export declare const emptyShader = "\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main_empty() {}\n";
export declare const shaderEntryPoint = "main";
//# sourceMappingURL=pv_consts.d.ts.map