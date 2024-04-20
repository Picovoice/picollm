/*
  Copyright 2022-2023 Picovoice Inc.
  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
  file accompanying this source.
  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

export type PicoLLMUsage = {
  promptTokens: number;
  completionTokens: number;
};

export enum PicoLLMEndpoint = {
  EndOfSentence = 0,
  CompletionTokenLimitReached = 1,
  StopPhraseEncountered = 2,
};

export type PicoLLMToken = {
  token: string;
  logProb: float;
};

export type PicoLLMCompletionToken = {
  token: PicoLLMToken;
  topChoices: PicoLLMToken[];
};

export type PicoLLMCompletion = {
  usage: PicoLLMUsage;
  endpoint: PicoLLMEndpoint;
  completionTokens: PicoLLMCompletionToken[];
  completion: string;
};

export type PicoLLMGenerateOptions = {
  completionTokenLimit?: number;
  stopPhrases?: string[];
  seed?: number;
  presencePenalty?: float;
  frequencyPenalty?: float;
  temperature?: float;
  topP?: float;
  numTopChoices?: number;
  streamCallback?: (string) => void;
}

export type PicoLLMInitOptions = {
  device?: string;
};

export type PicoLLMInputOptions = {
  libraryPath?: string;
};

export type PicoLLMOptions = PicoLLMInitOptions & PicoLLMInputOptions;
