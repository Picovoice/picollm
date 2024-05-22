#! /usr/bin/env node
//
// Copyright 2024 Picovoice Inc.
//
// You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
// file accompanying this source.
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//
"use strict";

const { program } = require("commander");
const { PicoLLM } = require("@picovoice/picollm-node");
const readline = require("node:readline");

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
        "--dialog_mode <string>",
        "Some instruction-tuned models provide multiple instruction modes. For example, `phi2` has `qa` and " +
        "`chat` modes.")
    .option(
        "--system_instruction <string>",
        "Some instruction-tuned models, such as `llama-2-70b-chat` accept a system-level instruction that can " +
        "change the model's behavior or tone throughout the entire dialog.")
    .option(
        "--history <number>",
        "All models have limited context. Hence, when going back and forth for a long time, we need to limit the " +
        "scope of previous conversations we pass to the model as a prompt to generate a response. The History " +
        "parameter controls how many of the latest back-and-forths should be serialized in each prompt. Set to " +
        "`None` to impose no limit.",
        Number,
        0)
    .option(
        "--show_available_devices",
        "Show the list of available devices for LLM inference.",
        false);

if (process.argv.length < 1) {
  program.help();
}
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getPrompt = () => {
  return new Promise(resolve => {
      rl.question(">>> ", input => {
        resolve(input);
      });
  });
}

async function completionDemo() {
  const accessKey = program["access_key"];
  const libraryPath = program["library_path"];
  const modelPath = program["model_path"];
  const prompt = program["prompt"];
  const device = program["device"];
  const completionTokenLimit = program["completion_token_limit"];
  const stopPhrases = program["stop_phrases"];
  const seed = program["seed"];
  const presencePenalty = program["presence_penalty"];
  const frequencyPenalty = program["frequency_penalty"];
  const temperature = program["temperature"];
  const topP = program["top_p"];
  const numTopChoices = program["num_top_choices"];
  const dialogMode = program["dialog_mode"];
  const systemInstruction = program["system_instruction"];
  const history = program["history"];
  const showAvailableDevices = program["show_available_devices"];

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

  const dialog = picoLLM.getDialog(dialogMode, history, systemInstruction);

  const streamCallback = (token) => {
    process.stdout.write(token);
  };

  process.on('SIGINT', function() {
    picoLLM.release();
    rl.close();
    process.exit();
  });

  try {
    while (true) {
      const prompt = await getPrompt();
      dialog.addHumanRequest(prompt);
      const res = await picoLLM.generate(
        dialog.prompt(),
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
      console.log();
      dialog.addLLMResponse(res.completion);
    }
  } catch (e) {
    console.error(e);
  } finally {
    picoLLM.release();
    rl.close();
  }

}

completionDemo();
