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

export enum PicoLLMEndpoint {
  END_OF_SENTENCE,
  COMPLETION_TOKEN_LIMIT_REACHED,
  STOP_PHRASE_ENCOUNTERED,
}

export type PicoLLMInitOptions = {
  device?: string;
};

export type PicoLLMInputOptions = {
  libraryPath?: string;
};

export type PicoLLMOptions = PicoLLMInitOptions & PicoLLMInputOptions;

export type PicoLLMGenerateOptions = {
  completionTokenLimit?: number;
  stopPhrases?: string[];
  seed?: number;
  presencePenalty?: number;
  frequencyPenalty?: number;
  temperature?: number;
  topP?: number;
  numTopChoices?: number;
  streamCallback?: (token: string) => void;
};

export type PicoLLMUsage = {
  promptTokens: number;
  completionTokens: number;
};

export type PicoLLMToken = {
  token: string;
  logProb: number;
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
