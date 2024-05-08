const fs = require("fs");
const { join } = require("path");

const wasmFiles = [
  "pv_picollm.wasm",
  "pv_picollm_simd.wasm",
  "pv_picollm_web_worker_helper.wasm",
  "pv_picollm_web_worker_helper_simd.wasm",
]

console.log("Copying the WASM model...");

const sourceDirectory = join(
  __dirname,
  "..",
  "..",
  "..",
  "lib",
  "wasm"
);

const outputDirectory = join(__dirname, "..", "lib");

try {
  fs.mkdirSync(outputDirectory, { recursive: true });
  wasmFiles.forEach(file => {
    fs.copyFileSync(join(sourceDirectory, file), join(outputDirectory, file))
  })
} catch (error) {
  console.error(error);
}

console.log("... Done!");
