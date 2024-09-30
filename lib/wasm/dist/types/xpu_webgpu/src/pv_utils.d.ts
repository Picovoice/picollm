export declare const sdataReduce = "\n  for (var s: u32 = workgroup_size_x / 2; s > 0; s >>= 1) {\n    if tid < s {\n        sdata[tid] += sdata[tid + s];\n    }\n    workgroupBarrier();\n  }\n";
export declare const dividePadFunction = "\n  fn divide_pad(a: u32, b: u32) -> u32 { \n    return (a + b - 1) / b;\n  }\n";
export declare const atomicAddSnippet: (ptr: string, v: string, type: 'int32' | 'float32') => string;
//# sourceMappingURL=pv_utils.d.ts.map