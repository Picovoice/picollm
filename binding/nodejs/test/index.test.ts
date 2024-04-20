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
'use strict';

import { PicoLLM, PicoLLMCompletion  } from '../src';

import * as fs from 'fs';

const ACCESS_KEY = process.argv
  .filter(x => x.startsWith('--access_key='))[0]
  .split('--access_key=')[1];

const testPicoLLMGenerate = (
  language: string,
  transcript: string,
  enableAutomaticPunctuation: boolean,
  enableDiarization: boolean,
  errorRate: number,
  audioFile: string,
  words: PicoLLMWord[]
) => {
  const modelPath = getModelPathByLanguage(language);
  const pcm = loadPcm(audioFile);

  let picollmEngine = new PicoLLM(ACCESS_KEY, {
    modelPath,
    enableAutomaticPunctuation,
    enableDiarization,
  });

  let res = picollmEngine.process(pcm);

  expect(
    characterErrorRate(res.transcript, transcript) < errorRate
  ).toBeTruthy();
  validateMetadata(res.words, words, enableDiarization);

  picollmEngine.release();
};

const testPicoLLMProcessFile = (
  language: string,
  transcript: string,
  enableAutomaticPunctuation: boolean,
  enableDiarization: boolean,
  errorRate: number,
  audioFile: string,
  words: PicoLLMWord[]
) => {
  const modelPath = getModelPathByLanguage(language);



  const waveFilePath = getAudioFile(audioFile);
  let res = picollmEngine.processFile(waveFilePath);

  expect(
    characterErrorRate(res.transcript, transcript) < errorRate
  ).toBeTruthy();
  validateMetadata(res.words, words, enableDiarization);

  picollmEngine.release();
};

describe('successful processes', () => {
  test('generate', () => {
    let picollmEngine = new PicoLLM(
      ACCESS_KEY,
      "phi2-290.bin"
    );

    picollmEngine.release();
  });
});

// describe('error message stack', () => {
//   test('message stack cleared after read', () => {
//     let error: string[] = [];
//     try {
//       new PicoLLM('invalid');
//     } catch (e: any) {
//       error = e.messageStack;
//     }

//     expect(error.length).toBeGreaterThan(0);
//     expect(error.length).toBeLessThanOrEqual(8);

//     try {
//       new PicoLLM('invalid');
//     } catch (e: any) {
//       for (let i = 0; i < error.length; i++) {
//         expect(error[i]).toEqual(e.messageStack[i]);
//       }
//     }
//   });
// });
