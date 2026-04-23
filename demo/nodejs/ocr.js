#! /usr/bin/env node
//
// Copyright 2026 Picovoice Inc.
//
// You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
// file accompanying this source.
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//
"use strict";

const fs = require("fs");

const sharp = require("sharp");

const { program } = require("commander");
const readline = require("readline");
const { PicoLLM, PicoLLMInvalidArgumentError } = require("@picovoice/picollm-node");

program
  .option(
    "--access_key <string>",
    "AccessKey obtain from the Picovoice Console (https://console.picovoice.ai/)."
  )
  .option(
    "--library_path <string>",
    "Absolute path to picollm (node) dynamic library."
  )
  .option("--model_path <string>", "Absolute path to picollm model.")
  .option("--image_path <string>", "Absolute path to the image file to perform OCR on.")
  .option(
    "--device <string>",
    "String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`, picoLLM " +
    "picks the most suitable device. If set to `gpu`, the engine uses the first available GPU device. To " +
    "select a specific GPU device, set this argument to `gpu:${GPU_INDEX}`, where `${GPU_INDEX}` is the index " +
    "of the target GPU. If set to `cpu`, the engine will run on the CPU with the default number of threads. " +
    "To specify the number of threads, set this argument to `cpu:${NUM_THREADS}`, where `${NUM_THREADS}` is " +
    "the desired number of threads.")
  .option(
    "--completion_token_limit <number>",
    "Maximum number of tokens in the completion. Set to `undefined` to impose no limit.",
    Number,
    128)
  .option(
    "--show_available_devices",
    "Show the list of available devices for LLM inference.",
    false)
  .option("--verbose", "Enable verbose logging.");

if (process.argv.length < 1) {
  program.help();
}
program.parse(process.argv);

async function readAbsoluteImageFile(absoluteImagePath) {
  if (!fs.existsSync(absoluteImagePath)) {
    throw new PicoLLMInvalidArgumentError(`Image file not found at 'absoluteImagePath': ${absoluteImagePath}`);
  }

  const { data, info } = await sharp(absoluteImagePath)
    .toColorspace('srgb')
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return {
    data: new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
    width: info.width,
    height: info.height
  };
}

async function ocrDemo() {
  const accessKey = program["access_key"];
  const libraryPath = program["library_path"];
  const modelPath = program["model_path"];
  const imagePath = program["image_path"];
  const image = await readAbsoluteImageFile(imagePath);
  const device = program["device"];
  const completionTokenLimit = program["completion_token_limit"];
  const showAvailableDevices = program["show_available_devices"];
  const verbose = program["verbose"]; // TODO: impl verbose?

  if (showAvailableDevices) {
    console.log(PicoLLM.listAvailableDevices().join('\n'));
    process.exit();
  }

  if (accessKey === undefined) {
    console.error("No AccessKey provided");
    process.exit();
  }

  const picoLLM = new PicoLLM(
    accessKey,
    modelPath,
    {
      libraryPath: libraryPath,
      device: device
    }
  );

  console.log(`picoLLM '${picoLLM.version}'`);
  console.log(`Loaded '${picoLLM.model}'`);

  console.log(">>> Press `Enter` to exit: ");

  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  const generateStartSec = [0];

  process.stdin.on("keypress", (key, str) => {
    if (str.sequence === '\r') {
        picoLLM.interrupt();
    } else if (str.sequence === '\x03') {
      if (generateStartSec[0] === 0) {
        process.stdin.setRawMode(false);
        console.log("\nGot CTRL+C -> Exiting...");
        process.kill(process.pid, 'SIGINT');
      } else {
        picoLLM.interrupt();
      }
    }
  });

  const streamCallback = (token) => {
    if (generateStartSec[0] === 0) {
      generateStartSec[0] = performance.now();
    }

    process.stdout.write(token);
  };

  const promptProgressCallback = (progress) => {
    let barWidth = Math.max(10,
                        process.stdout.columns
                        - "Processing Image [".length
                        - "] 100.0%".length
                        - 1);

    let filledLen = Math.trunc((progress / 100.0) * barWidth);

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);

    process.stdout.write("Processing Image [");
    for (let i = 0; i < barWidth; i++) {
      process.stdout.write(i < filledLen ? "#" : " ");
    }

    if (progress >= 100.0) {
      process.stdout.write(`] ${progress.toFixed(1)}%`);
      process.stdout.write("\n\n");
      process.stdout.write("Generating... (press `Enter` to interrupt)\n\n");
      return;
    } else {
      process.stdout.write(`] ${progress.toFixed(1)}%`);
    }
  };

  try {
    console.log(picoLLM);
    process.stdout.write("Processing Image ...");

    const startSec = performance.now();
    const res = await picoLLM.generateOCR(
      image,
      {
        completionTokenLimit,
        streamCallback,
        promptProgressCallback,
      }
    );
    console.log();

    if (verbose) {
      console.log(res.completionTokens);
    }

    const generateElapsedSec = (performance.now() - generateStartSec) / 1000;
    const totalElapsedSec = (performance.now() - startSec) / 1000;
    const imageElapsedSec = totalElapsedSec - generateElapsedSec;

    const generateTPS = picoLLM.tokenize(res.completion, true, false).length / generateElapsedSec;

    console.log(`Processed image in ${(imageElapsedSec).toFixed(2)} seconds`);
    console.log(`Generated result in ${(generateElapsedSec).toFixed(2)} seconds (${generateTPS.toFixed(2)} tokens per second)`);
    console.log(`Total time elapsed is ${(totalElapsedSec).toFixed(2)} seconds`);
  } catch (e) {
    console.error(e);
  } finally {
    picoLLM.release();
    process.exit();
  }
}

ocrDemo();
