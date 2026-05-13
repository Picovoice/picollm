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

import PvStatus from './pv_status_t';

export type PicoLLMInitResult = {
  handle: any;
  status: PvStatus;
};
export type PicoLLMGenerateResult = {
  completion: {
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
    };
    endpoint: number;
    completion_tokens: {
      token: {
        token: string;
        log_prob: number;
      }
      top_choices: {
        token: string;
        log_prob: number;
      }[];
    }[] | null;
    completion: string;
  };
  status: PvStatus;
  errorStack: string[];
};
export type PicoLLMGenerateOCRResult = {
  completion: {
    endpoint: number;
    completion: string;
  };
  status: PvStatus;
  errorStack: string[];
};
export type PicoLLMGenerateEmbeddingsResult = {
  embeddings: Float32Array;
  status: PvStatus;
};
export type PicoLLMTokenizeResult = {
  tokens: number[];
  status: PvStatus;
};
export type PicoLLMForwardResult = {
  logits: number[];
  status: PvStatus;
};
export type PicoLLMModelResult = {
  model: string;
  status: PvStatus;
};
export type PicoLLMContextLengthResult = {
  context_length: number;
  status: PvStatus;
};
export type PicoLLMResult = {
  status: PvStatus;
};