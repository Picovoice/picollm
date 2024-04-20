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

import { PicoLLM, PicoLLMWord, PicoLLMInvalidArgumentError } from '../src';

import * as fs from 'fs';
import { WaveFile } from 'wavefile';

import { getSystemLibraryPath } from '../src/platforms';

import {
  getModelPathByLanguage,
  getAudioFile,
  getLanguageTestParameters,
  getDiarizationTestParameters,
} from './test_utils';

const LANGUAGE_TEST_PARAMETERS = getLanguageTestParameters();
const DIARIZATION_TEST_PARAMETERS = getDiarizationTestParameters();

const ACCESS_KEY = process.argv
  .filter(x => x.startsWith('--access_key='))[0]
  .split('--access_key=')[1];

const levenshteinDistance = (words1: string[], words2: string[]) => {
  const res = Array.from(
    Array(words1.length + 1),
    () => new Array(words2.length + 1)
  );
  for (let i = 0; i <= words1.length; i++) {
    res[i][0] = i;
  }
  for (let j = 0; j <= words2.length; j++) {
    res[0][j] = j;
  }
  for (let i = 1; i <= words1.length; i++) {
    for (let j = 1; j <= words2.length; j++) {
      res[i][j] = Math.min(
        res[i - 1][j] + 1,
        res[i][j - 1] + 1,
        res[i - 1][j - 1] +
          (words1[i - 1].toUpperCase() === words2[j - 1].toUpperCase() ? 0 : 1)
      );
    }
  }
  return res[words1.length][words2.length];
};

const characterErrorRate = (
  transcript: string,
  expectedTranscript: string
): number => {
  const ed = levenshteinDistance(
    transcript.split(''),
    expectedTranscript.split('')
  );
  return ed / expectedTranscript.length;
};

const validateMetadata = (
  words: PicoLLMWord[],
  referenceWords: PicoLLMWord[],
  enableDiarization: boolean
) => {
  expect(words.length).toEqual(referenceWords.length);
  for (let i = 0; i < words.length; i += 1) {
    expect(words[i].word).toEqual(referenceWords[i].word);
    expect(words[i].startSec).toBeCloseTo(referenceWords[i].startSec, 1);
    expect(words[i].endSec).toBeCloseTo(referenceWords[i].endSec, 1);
    expect(words[i].confidence).toBeCloseTo(referenceWords[i].confidence, 1);
    if (enableDiarization) {
      expect(words[i].speakerTag).toEqual(referenceWords[i].speakerTag);
    } else {
      expect(words[i].speakerTag).toEqual(-1);
    }
  }
};

const loadPcm = (audioFile: string): any => {
  const waveFilePath = getAudioFile(audioFile);
  const waveBuffer = fs.readFileSync(waveFilePath);
  const waveAudioFile = new WaveFile(waveBuffer);

  return waveAudioFile.getSamples(false, Int16Array);
};

const testPicoLLMProcess = (
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

  let picollmEngine = new PicoLLM(ACCESS_KEY, {
    modelPath,
    enableAutomaticPunctuation,
    enableDiarization,
  });

  const waveFilePath = getAudioFile(audioFile);
  let res = picollmEngine.processFile(waveFilePath);

  expect(
    characterErrorRate(res.transcript, transcript) < errorRate
  ).toBeTruthy();
  validateMetadata(res.words, words, enableDiarization);

  picollmEngine.release();
};

describe('successful processes', () => {
  it.each(LANGUAGE_TEST_PARAMETERS)(
    'testing process `%p`',
    (
      language: string,
      transcript: string,
      _: string,
      errorRate: number,
      audioFile: string,
      words: PicoLLMWord[]
    ) => {
      testPicoLLMProcess(
        language,
        transcript,
        false,
        false,
        errorRate,
        audioFile,
        words
      );
    }
  );

  it.each(LANGUAGE_TEST_PARAMETERS)(
    'testing process file `%p`',
    (
      language: string,
      transcript: string,
      _: string,
      errorRate: number,
      audioFile: string,
      words: PicoLLMWord[]
    ) => {
      testPicoLLMProcessFile(
        language,
        transcript,
        false,
        false,
        errorRate,
        audioFile,
        words
      );
    }
  );

  it.each(LANGUAGE_TEST_PARAMETERS)(
    'testing process file `%p` with punctuation',
    (
      language: string,
      _: string,
      transcript: string,
      errorRate: number,
      audioFile: string,
      words: PicoLLMWord[]
    ) => {
      testPicoLLMProcessFile(
        language,
        transcript,
        true,
        false,
        errorRate,
        audioFile,
        words
      );
    }
  );
  it.each(LANGUAGE_TEST_PARAMETERS)(
    'testing process file `%p` with diarization',
    (
      language: string,
      transcript: string,
      _: string,
      errorRate: number,
      audioFile: string,
      words: PicoLLMWord[]
    ) => {
      testPicoLLMProcessFile(
        language,
        transcript,
        false,
        true,
        errorRate,
        audioFile,
        words
      );
    }
  );
});

describe('successful diarization', () => {
  it.each(DIARIZATION_TEST_PARAMETERS)(
    'testing diarization `%p`',
    (language: string, audioFile: string, referenceWords: PicoLLMWord[]) => {
      const modelPath = getModelPathByLanguage(language);

      let picollmEngine = new PicoLLM(ACCESS_KEY, {
        modelPath,
        enableDiarization: true,
      });

      const waveFilePath = getAudioFile(audioFile);
      let words = picollmEngine.processFile(waveFilePath).words;

      expect(words.length).toEqual(referenceWords.length);
      for (let i = 0; i < words.length; i += 1) {
        expect(words[i].word).toEqual(referenceWords[i].word);
        expect(words[i].speakerTag).toEqual(referenceWords[i].speakerTag);
      }

      picollmEngine.release();
    }
  );
});

describe('Defaults', () => {
  test('Empty AccessKey', () => {
    expect(() => {
      new PicoLLM('');
    }).toThrow(PicoLLMInvalidArgumentError);
  });
});

describe('manual paths', () => {
  test('manual library path', () => {
    const libraryPath = getSystemLibraryPath();

    let picollmEngine = new PicoLLM(ACCESS_KEY, {
      libraryPath: libraryPath,
      enableAutomaticPunctuation: false,
    });

    const waveFilePath = getAudioFile('test.wav');
    let res = picollmEngine.processFile(waveFilePath);

    expect(res.transcript.length).toBeGreaterThan(0);

    picollmEngine.release();
  });
});

describe('error message stack', () => {
  test('message stack cleared after read', () => {
    let error: string[] = [];
    try {
      new PicoLLM('invalid');
    } catch (e: any) {
      error = e.messageStack;
    }

    expect(error.length).toBeGreaterThan(0);
    expect(error.length).toBeLessThanOrEqual(8);

    try {
      new PicoLLM('invalid');
    } catch (e: any) {
      for (let i = 0; i < error.length; i++) {
        expect(error[i]).toEqual(e.messageStack[i]);
      }
    }
  });
});
