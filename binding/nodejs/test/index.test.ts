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
'use strict';

import * as path from 'path';

import {
  Dialog,
  GemmaChatDialog,
  Llama2ChatDialog,
  Llama3ChatDialog,
  MistralChatDialog,
  Phi2ChatDialog,
  Phi2QADialog,
  Phi3ChatDialog,
  PicoLLM,
  PicoLLMGenerateOptions,
  PicoLLMCompletion,
  PicoLLMEndpoint,
} from '../src';

import * as testData from '../../../resources/.test/test_data.json';

jest.setTimeout(60000);

const ACCESS_KEY = process.argv
  .filter(x => x.startsWith('--access_key='))[0]
  .split('--access_key=')[1];

const DEVICE = process.argv
  .filter(x => x.startsWith('--device='))[0]
  .split('--device=')[1];

const MODEL_PATH = path.join(__dirname, 'phi2-290.pllm');

const DIALOG_CLASSES: { [key: string]: typeof Dialog } = {
  'gemma-chat-dialog': GemmaChatDialog,
  "llama-2-chat-dialog": Llama2ChatDialog,
  "llama-3-chat-dialog": Llama3ChatDialog,
  "mistral-chat-dialog": MistralChatDialog,
  'phi2-chat-dialog': Phi2ChatDialog,
  'phi2-qa-dialog': Phi2QADialog,
  'phi3-chat-dialog': Phi3ChatDialog,
};

type CompletionExpectation = {
  'num-prompt-tokens': number,
  'num-completion-tokens': number,
  'endpoint': string,
  'num-top-choices': number,
  'completion': string
};

type DialogExpectations = {
  'gemma-chat-dialog': string,
  "llama-2-chat-dialog": string,
  "llama-3-chat-dialog": string,
  "mistral-chat-dialog": string,
  'phi2-chat-dialog': string,
  'phi2-qa-dialog': string,
  'phi3-chat-dialog': string,
}

const sleep = async (ms: number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const runInitTest = (
  params: {
    accessKey?: string;
    modelPath?: string;
    device?: string;
    libraryPath? : string;
    expectFailure?: boolean;
  } = {}
) => {
  const {
    accessKey = ACCESS_KEY,
    modelPath = MODEL_PATH,
    device = DEVICE,
    libraryPath,
    expectFailure = false,
  } = params;

  let isFailed = false;
  let picoLLM: PicoLLM | undefined = undefined;

  try {
    picoLLM = new PicoLLM(
      accessKey,
      modelPath,
      {
        libraryPath,
        device
      }
    );

    expect(picoLLM.contextLength).toBeGreaterThan(0);
    expect(picoLLM.maxTopChoices).toBeGreaterThan(0);
    expect(typeof picoLLM.version).toEqual('string');
    expect(picoLLM.version.length).toBeGreaterThan(0);
    expect(typeof picoLLM.model).toEqual('string');
    expect(picoLLM.model.length).toBeGreaterThan(0);
  } catch (e) {
    if (expectFailure) {
      isFailed = true;
    } else {
      expect(e).toBeUndefined();
    }
  } finally {
    if (picoLLM) {
      picoLLM.release();
    }
  }

  if (expectFailure) {
    expect(isFailed).toBeTruthy();
  }
};

const verifyCompletion = (res: PicoLLMCompletion, expectations: CompletionExpectation[]) => {
  let error: any;
  for (const expectation of expectations) {
    try {
      expect(res.usage.promptTokens).toEqual(expectation['num-prompt-tokens']);
      expect(res.usage.completionTokens).toEqual(expectation['num-completion-tokens']);
      expect(res.endpoint).toEqual(PicoLLMEndpoint[expectation.endpoint as keyof typeof PicoLLMEndpoint]);

      for (const completionToken of res.completionTokens) {
        expect(completionToken.token.token.length).toBeGreaterThan(0);
        expect(completionToken.token.logProb).toBeLessThanOrEqual(0);
        expect(completionToken.topChoices.length).toEqual(expectation['num-top-choices']);

        for (const topChoice of completionToken.topChoices) {
          expect(topChoice.token.length).toBeGreaterThan(0);
          expect(topChoice.logProb).toBeLessThanOrEqual(0);
        }

        if (completionToken.topChoices.length > 0) {
          expect(
            completionToken.topChoices.reduce((acc, topChoice) => acc + Math.exp(topChoice.logProb), 0)
          ).toBeLessThanOrEqual(1);
        }

        if (!res.completionTokens.some(x => x.token.token.includes('\\x'))) {
          expect(
            res.completionTokens.reduce((acc, completionToken) => acc + completionToken.token.token, '')
          ).toEqual(expectation.completion);
        }

        expect(res.completion).toEqual(expectation.completion);
      }

      return;
    } catch (e) {
      error = e;
    }
  }

  if (error) {
    throw error;
  }
};

const runGenerateTest = async (
  prompt: string,
  expectations: CompletionExpectation[],
  options: PicoLLMGenerateOptions = {
    streamCallback: () => {},
  },
) => {
  const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
    device: DEVICE
  });

  try {
    const res = await picoLLM.generate(prompt, options);
    verifyCompletion(res, expectations);
  } catch (e) {
    expect(e).toBeUndefined();
  } finally {
    picoLLM.release();
  }
};

const runDialogTest = (
  expectations: DialogExpectations,
  conversations: [string, string][],
  params: {
    history?: number,
    system?: string,
  } = {}
) => {
  const { history, system } = params;

  for (const [k, v] of Object.entries(expectations)) {
    const o = new DIALOG_CLASSES[k](history, system);
    for (let i = 0; i < conversations.length - 1; i++) {
      const [human, llm] = conversations[i];
      o.addHumanRequest(human);
      o.addLLMResponse(llm);
    }
    o.addHumanRequest(conversations.at(-1)![0]);
    expect(o.prompt()).toEqual(v);
  }
};

describe('PicoLLM basic tests', function () {
  test('List hardware devices', () => {
    const hardwareDevices: string[] = PicoLLM.listAvailableDevices();
    expect(Array.isArray(hardwareDevices)).toBeTruthy();
    expect(hardwareDevices.length).toBeGreaterThan(0);
  });

  test(`should return correct error message stack`, () => {
    let messageStack = [];
    try {
      const picollm = new PicoLLM(
        "invalidAccessKey",
        MODEL_PATH,
      );
      expect(picollm).toBeUndefined();
      picollm.release();
    } catch (e: any) {
      messageStack = e.messageStack;
    }

    expect(messageStack.length).toBeGreaterThan(0);
    expect(messageStack.length).toBeLessThan(8);

    try {
      const picollm = new PicoLLM(
        "invalidAccessKey",
        MODEL_PATH,
      );
      expect(picollm).toBeUndefined();
      picollm.release();
    } catch (e: any) {
      expect(messageStack.length).toEqual(e.messageStack.length);
    }
  });

  test(`should be able to handle invalid access key`, () => {
    runInitTest({
      accessKey: 'invalid',
      expectFailure: true,
    });
  });

  test(`should be able to handle invalid model path`, () => {
    runInitTest({
      expectFailure: true,
      modelPath: 'invalid'
    });
  });

  test(`should be able to handle invalid library path`, () => {
    runInitTest({
      expectFailure: true,
      libraryPath: 'invalid'
    });
  });

  test(`should be able to handle invalid device string`, () => {
    runInitTest({
      device: "nan",
      expectFailure: true,
    });
  });
});

describe('PicoLLM generate tests', () => {
  test(`should be able to generate default`, async () => {
    const data = testData.picollm.default;
    const prompt = data.prompt;

    await runGenerateTest(prompt, data.expectations);
  });

  test(`should be able to generate with completion token limit`, async () => {
    const data = testData.picollm['with-completion-token-limit'];
    const prompt = data.prompt;
    const completionTokenLimit = data.parameters['completion-token-limit'];

    await runGenerateTest(prompt, data.expectations, {
      completionTokenLimit: completionTokenLimit
    });
  });

  test(`should be able to generate with stop phrases`, async () => {
    const data = testData.picollm['with-stop-phrases'];
    const prompt = data.prompt;
    const stopPhrases = data.parameters['stop-phrases'];

    await runGenerateTest(prompt, data.expectations, {
      stopPhrases: stopPhrases
    });
  });

  test(`should be able to generate with presence penalty`, async () => {
    const data = testData.picollm['with-presence-penalty'];
    const prompt = data.prompt;
    const presencePenalty = data.parameters['presence-penalty'];

    await runGenerateTest(prompt, data.expectations, {
      presencePenalty: presencePenalty
    });
  });

  test(`should be able to generate with frequency penalty`, async () => {
    const data = testData.picollm['with-frequency-penalty'];
    const prompt = data.prompt;
    const frequencyPenalty = data.parameters['frequency-penalty'];

    await runGenerateTest(prompt, data.expectations, {
      frequencyPenalty: frequencyPenalty
    });
  });

  test(`should be able to generate with temperature`, async () => {
    const data = testData.picollm['with-temperature'];
    const prompt = data.prompt;
    const completionTokenLimit = data.parameters['completion-token-limit'];
    const seeds = data.parameters.seeds;
    const temperature = data.parameters.temperature;

    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

    try {
      const numPromptTokens = (picoLLM.tokenize(prompt, true, false)).length;

      const res = await picoLLM.generate(prompt, {
        completionTokenLimit: completionTokenLimit,
        seed: seeds[0],
        temperature: temperature
      });

      const res2 = await picoLLM.generate(prompt, {
        completionTokenLimit: completionTokenLimit,
        seed: seeds[1],
        temperature: temperature
      });

      verifyCompletion(res, [{
        'num-prompt-tokens': numPromptTokens,
        'num-completion-tokens': res.usage.completionTokens,
        'endpoint': PicoLLMEndpoint[res.endpoint],
        'num-top-choices': 0,
        'completion': res.completion
      }]);

      verifyCompletion(res2, [{
        'num-prompt-tokens': numPromptTokens,
        'num-completion-tokens': res2.usage.completionTokens,
        'endpoint': PicoLLMEndpoint[res2.endpoint],
        'num-top-choices': 0,
        'completion': res2.completion
      }]);

      expect(res.completion).not.toEqual(res2.completion);
    } catch (e) {
      expect(e).toBeUndefined();
    } finally {
      picoLLM.release();
    }
  });

  test(`should be able to generate with temperature and identical seeds`, async () => {
    if (DEVICE.includes('gpu')) {
      return;
    }

    const data = testData.picollm['with-temperature-and-identical-seeds'];
    const prompt = data.prompt;
    const completionTokenLimit = data.parameters['completion-token-limit'];
    const seed = data.parameters.seed;
    const temperature = data.parameters.temperature;

    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

    try {
      const numPromptTokens = (picoLLM.tokenize(prompt, true, false)).length;

      const res = await picoLLM.generate(prompt, {
        completionTokenLimit: completionTokenLimit,
        seed: seed,
        temperature: temperature
      });

      const res2 = await picoLLM.generate(prompt, {
        completionTokenLimit: completionTokenLimit,
        seed: seed,
        temperature: temperature
      });

      verifyCompletion(res, [{
        'num-prompt-tokens': numPromptTokens,
        'num-completion-tokens': res.usage.completionTokens,
        'endpoint': PicoLLMEndpoint[res.endpoint],
        'num-top-choices': 0,
        'completion': res.completion
      }]);

      verifyCompletion(res2, [{
        'num-prompt-tokens': numPromptTokens,
        'num-completion-tokens': res2.usage.completionTokens,
        'endpoint': PicoLLMEndpoint[res2.endpoint],
        'num-top-choices': 0,
        'completion': res2.completion
      }]);

      expect(res.completion).toEqual(res2.completion);
    } catch (e) {
      expect(e).toBeUndefined();
    } finally {
      picoLLM.release();
    }
  });

  test(`should be able to generate with temperature and top_p`, async () => {
    if (DEVICE.includes('gpu')) {
      return;
    }

    const data = testData.picollm['with-temperature-and-top-p'];
    const prompt = data.prompt;
    const completionTokenLimit = data.parameters['completion-token-limit'];
    const seed = data.parameters.seed;
    const temperature = data.parameters.temperature;
    const topP = data.parameters['top-p'];
    const expectations = data.expectations;

    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

    const numPromptTokens = (picoLLM.tokenize(prompt, true, false)).length;

    try {
      const res = await picoLLM.generate(prompt, {
        completionTokenLimit: completionTokenLimit,
        seed: seed,
        temperature: temperature,
        topP: topP,
      });

      verifyCompletion(res, expectations.map(x => ({
        'num-prompt-tokens': numPromptTokens,
        'num-completion-tokens': res.usage.completionTokens,
        'endpoint': PicoLLMEndpoint[res.endpoint],
        'num-top-choices': 0,
        'completion': x
      })));
    } catch (e) {
      expect(e).toBeUndefined();
    } finally {
      picoLLM.release();
    }
  });

  test(`should be able to generate with top choices`, async () => {
    const data = testData.picollm['with-top-choices'];
    const prompt = data.prompt;
    const numTopChoices = data.parameters['num-top-choices'];

    await runGenerateTest(prompt, data.expectations, {
      numTopChoices: numTopChoices
    });
  });

  test(`should be able to generate with streamCallback`, async () => {
    const data = testData.picollm.default;
    const prompt = data.prompt;

    const pieces: string[] = [];

    await runGenerateTest(prompt, data.expectations, {
      streamCallback: token => { pieces.push(token); }
    });

    await sleep(100);
    expect(pieces.join('')).toEqual(data.expectations[0].completion);
  });

  test(`should be able to interrupt`, async () => {
    const data = testData.picollm.default;
    const prompt = data.prompt;

    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

    try {
      const generatePromise = picoLLM.generate(prompt, {
        completionTokenLimit: 200
      });

      if (process.platform === "win32") {
        await sleep(10);
      } else {
        await sleep(500);
      }

      picoLLM.interrupt();

      const res = await generatePromise;
      expect(res.endpoint).toEqual(PicoLLMEndpoint.INTERRUPTED);
    } catch (e) {
      expect(e).toBeUndefined();
    } finally {
      picoLLM.release();
    }
  });

  test(`should be able to tokenize`, () => {
    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

    const data = testData.picollm.tokenize;
    const text = data.text;

    try {
      const tokens = picoLLM.tokenize(text, true, false);
      expect(tokens).toEqual(data.tokens);
    } catch (e) {
      expect(e).toBeUndefined();
    } finally {
      picoLLM.release();
    }
  });

  test(`should be able to forward`, () => {
    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

    try {
      const logits = picoLLM.forward(79);
      expect(logits.length).toBeGreaterThan(0);

      const sum = logits.reduce((acc, x) => acc + Math.exp(x), 0);
      expect(Math.abs(1 - (sum / logits.reduce((acc, x) => acc + Math.exp(x), 0)))).toBeLessThan(0.0001);
    } catch (e) {
      expect(e).toBeUndefined();
    } finally {
      picoLLM.release();
    }
  });

  test(`should be able to reset`, () => {
    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

    try {
      const logits = picoLLM.forward(79);
      picoLLM.reset();

      const newLogits = picoLLM.forward(79);

      if (DEVICE.includes('gpu')) {
        for (let i = 0; i < newLogits.length; i++) {
          expect(logits[i]).toBeCloseTo(newLogits[i], 0.01);
        }
      } else {
        expect(logits).toEqual(newLogits);
      }
    } catch (e) {
      expect(e).toBeUndefined();
    } finally {
      picoLLM.release();
    }
  });
});

describe('PicoLLM Dialog tests', () => {
  test('should be able to get prompt', () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const prompts = data.prompts;

    runDialogTest(prompts, conversation);
  });

  test('should be able to get prompt with system', () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const system = data.system;
    const prompts = data['prompts-with-system'];

    runDialogTest(prompts, conversation, {
      system: system
    });
  });

  test('should be able to get prompt with history', () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const prompts = data['prompts-with-history'];

    runDialogTest(prompts, conversation, {
      history: 0
    });
  });

  test('should be able to get prompt with system and history', () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const system = data.system;
    const prompts = data['prompts-with-system-and-history'];

    runDialogTest(prompts, conversation, {
      system: system,
      history: 0
    });
  });
});
