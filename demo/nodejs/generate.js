#! /usr/bin/env node
//
// Copyright 2022-2023 Picovoice Inc.
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
const fs = require("fs");

const { PicoLLM, PicoLLMActivationLimitReachedError } = require("@picovoice/picollm-node");


program
  .requiredOption(
    "-a, --access_key <string>",
    "AccessKey obtain from the Picovoice Console (https://con sole.picovoice.ai/)"
  )
  .requiredOption(
    "-m, --model_file_path <string>",
    "absolute path to picollm model"
  )
  .requiredOption(
    "-g, --generate <string>",
    "prompt"
  )
  .option(
    "-d, --device <string>",
    "device string to run engine on"
  )
  .option(
    "-c, --completion_token_limit <number>",
    "completion token limit"
  )
  .option(
    "-l, --library_file_path <string>",
    "absolute path to picollm dynamic library"
  )
  .option("-v, --verbose", "verbose mode, prints usage");


if (process.argv.length < 2) {
  program.help();
}
program.parse(process.argv);

function demo() {
  let accessKey = program["access_key"]
  let modelFilePath = program["model_file_path"];
  let generate = program["generate"];
  let device = program["device"];
  let completionTokenLimit = parseInt(program["completion_token_limit"]);
  let libraryFilePath = program["library_file_path"];
  let verbose = program["verbose"];

  let engineInstance = new PicoLLM(
      accessKey,
      modelFilePath,
      {
        'device': device,
        'libraryPath': libraryFilePath,
      }
  );

  try {
    const res = engineInstance.generate(
      generate,
      {
        'completionTokenLimit': isNaN(completionTokenLimit) ? 128 : completionTokenLimit,
        'streamCallback': (completion => process.stdout.write(completion))
      }
    );
      console.log("\n");
    if (verbose) {
      console.log("Prompt Tokens: " + res.usage.prompt_tokens);
      console.log("Completion Tokens: " + res.usage.completion_tokens);
    }
  } catch (err) {
    if (err instanceof PicoLLMActivationLimitReachedError) {
      console.error(`AccessKey '${accessKey}' has reached it's processing limit.`);
    } else {
      console.error(err);
    }
  }

  engineInstance.release();
}

demo();
