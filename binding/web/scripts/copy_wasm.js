const fs = require("fs");
const { join, extname } = require("path");

const wasmFiles = [
  "pv_picollm.wasm",
  "pv_picollm_simd.wasm",
  "pv_picollm.js",
  "pv_picollm_simd.js",
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

const outputDirectory = join(__dirname, "..", "src", "lib");

try {
  fs.mkdirSync(outputDirectory, { recursive: true });
  wasmFiles.forEach(file => {
    fs.copyFileSync(join(sourceDirectory, file), join(outputDirectory, file))
    const ext = extname(file);
    if (ext === ".js") {
      fs.copyFileSync(join(sourceDirectory, file), join(outputDirectory, file.replace(ext, ".txt")));
    }
  })
} catch (error) {
  console.error(error);
}

console.log("... Done!");
