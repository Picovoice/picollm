#! /usr/bin/env node
//
// Copyright 2024-2026 Picovoice Inc.
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
    "Absolute path to picollm dynamic library."
  )
  .option("--model_path <string>", "Absolute path to picollm model")
  .option("--prompt <string>", "Prompt string.")
  .option(
    "--image_path <string>",
    "Absolute path to the image file to include in the prompt. Only for use with with vision models.")
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
    "--stop_phrases <string>",
    "The generation process stops when it encounters any of these phrases in the completion. The already " +
    "generated completion, including the encountered stop phrase, will be returned.")
  .option(
    "--seed <number>",
    "The internal random number generator uses it as its seed if set to a positive integer value. Seeding " +
    "enforces deterministic outputs. Set to `None` for randomized responses.",
    Number)
  .option(
    "--presence_penalty <number>",
    "It penalizes logits already appearing in the partial completion if set to a positive value. If set to " +
    "`0.0`, it has no effect.",
    Number,
    0)
  .option(
    "--frequency_penalty <number>",
    "If set to a positive floating-point value, it penalizes logits proportional to the frequency of their " +
    "appearance in the partial completion. If set to `0.0`, it has no effect.",
    Number,
    0)
  .option(
    "--temperature <number>",
    "Sampling temperature. Temperature is a non-negative floating-point value that controls the randomness of " +
    "the sampler. A higher temperature smoothens the samplers' output, increasing the randomness. In " +
    "contrast, a lower temperature creates a narrower distribution and reduces variability. Setting it to " +
    "`0` selects the maximum logit during sampling.",
    Number,
    0)
  .option(
    "--top_p <number>",
    "A positive floating-point number within (0, 1]. It restricts the sampler's choices to high-probability " +
    "logits that form the `top_p` portion of the probability mass. Hence, it avoids randomly selecting " +
    "unlikely logits. A value of `1.` enables the sampler to pick any token with non-zero probability, " +
    "turning off the feature.",
    Number,
    1)
  .option(
    "--num_top_choices <number>",
    "If set to a positive value, picoLLM returns the list of the highest probability tokens for any generated " +
    "token. Set to `0` to turn off the feature.",
    Number,
    0)
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

async function completionDemo() {
  const accessKey = program["access_key"];
  const libraryPath = program["library_path"];
  const modelPath = program["model_path"];
  const prompt = program["prompt"];
  const imagePath = program["image_path"];
  const image = (imagePath === undefined || imagePath === "") ? null : await readAbsoluteImageFile(imagePath);
  const device = program["device"];
  const completionTokenLimit = program["completion_token_limit"];
  const stopPhrases = program["stop_phrases"];
  const seed = program["seed"];
  const presencePenalty = program["presence_penalty"];
  const frequencyPenalty = program["frequency_penalty"];
  const temperature = program["temperature"];
  const topP = program["top_p"];
  const numTopChoices = program["num_top_choices"];
  const showAvailableDevices = program["show_available_devices"];
  const verbose = program["verbose"];

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

  try {
    console.log(picoLLM);

    const startSec = performance.now();
    
    let res;
    if (image === null) {
      console.log("Generating... (press `Enter` to interrupt)");
      
      res = await picoLLM.generate(
        prompt,
        {
          completionTokenLimit,
          stopPhrases,
          seed,
          presencePenalty,
          frequencyPenalty,
          temperature,
          topP,
          numTopChoices,
          streamCallback,
        }
      );
    } else {
      const promptProgressCallback = (progress) => {
        let barWidth = Math.max(10,
                                process.stdout.columns
                                - "Processing Prompt [".length
                                - "] 100.0%".length
                                - 1);

        let filledLen = Math.trunc((progress / 100.0) * barWidth);

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);

        process.stdout.write("Processing Prompt [");
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
  
      process.stdout.write("\nProcessing Prompt ...");

      res = await picoLLM.generateWithImage(
        prompt,
        image,
        {
          completionTokenLimit,
          stopPhrases,
          seed,
          presencePenalty,
          frequencyPenalty,
          temperature,
          topP,
          numTopChoices,
          streamCallback,
          promptProgressCallback,
        }
      );
    }

    console.log();

    if (verbose) {
      console.log(res?.completionTokens);
    }

    const generateElapsedSec = (performance.now() - generateStartSec) / 1000;
    const totalElapsedSec = (performance.now() - startSec) / 1000;
    const imageElapsedSec = totalElapsedSec - generateElapsedSec;

    const generateTPS = (res.usage.completionTokens - 1) / generateElapsedSec;

    console.log(`Processed prompt in ${(imageElapsedSec).toFixed(2)} seconds`);
    console.log(`Generated result in ${(generateElapsedSec).toFixed(2)} seconds (${generateTPS.toFixed(2)} tokens per second)`);
    console.log(`Total time elapsed is ${(totalElapsedSec).toFixed(2)} seconds`);
  } catch (e) {
    console.error(e);
  } finally {
    picoLLM.release();
    process.exit();
  }
}

completionDemo();
