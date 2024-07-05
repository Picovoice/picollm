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
  PicoLLM,
  PicoLLMGenerateOptions,
  PicoLLMCompletion,
  PicoLLMEndpoint,
} from '../src';

import * as testData from '../../../resources/.test/test_data.json';

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
}

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

  try {
    const picoLLM = new PicoLLM(
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

    picoLLM.release();
  } catch (e) {
    if (expectFailure) {
      isFailed = true;
    } else {
      expect(e).toBeUndefined();
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

const runGenerateTest = (
  prompt: string,
  expectations: CompletionExpectation[],
  options?: PicoLLMGenerateOptions,
) => {
  const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
    device: DEVICE
  });

  try {
    const res = picoLLM.generate(prompt, options);
    verifyCompletion(res, expectations);
  } catch (e) {
    expect(e).toBeUndefined();
  } finally {
    picoLLM.release();
  }
};

const runDialogTest = async (
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
  test(`should be able to generate default`, () => {
    const data = testData.picollm.default;
    const prompt = data.prompt;

    runGenerateTest(prompt, data.expectations);
  });

  test(`should be able to generate with completion token limit`, () => {
    const data = testData.picollm['with-completion-token-limit'];
    const prompt = data.prompt;
    const completionTokenLimit = data.parameters['completion-token-limit'];

    runGenerateTest(prompt, data.expectations, {
      completionTokenLimit: completionTokenLimit
    });
  });

  test(`should be able to generate with stop phrases`, () => {
    const data = testData.picollm['with-stop-phrases'];
    const prompt = data.prompt;
    const stopPhrases = data.parameters['stop-phrases'];

    runGenerateTest(prompt, data.expectations, {
      stopPhrases: stopPhrases
    });
  });

  test(`should be able to generate with presence penalty`, () => {
    const data = testData.picollm['with-presence-penalty'];
    const prompt = data.prompt;
    const presencePenalty = data.parameters['presence-penalty'];

    runGenerateTest(prompt, data.expectations, {
      presencePenalty: presencePenalty
    });
  });

  test(`should be able to generate with frequency penalty`, () => {
    const data = testData.picollm['with-frequency-penalty'];
    const prompt = data.prompt;
    const frequencyPenalty = data.parameters['frequency-penalty'];

    runGenerateTest(prompt, data.expectations, {
      frequencyPenalty: frequencyPenalty
    });
  });

  test(`should be able to generate with temperature`, () => {
    const data = testData.picollm['with-temperature'];
    const prompt = data.prompt;
    const completionTokenLimit = data.parameters['completion-token-limit'];
    const seeds = data.parameters.seeds;
    const temperature = data.parameters.temperature;

    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

    const numPromptTokens = (picoLLM.tokenize(prompt, true, false)).length;

    const res = picoLLM.generate(prompt, {
      completionTokenLimit: completionTokenLimit,
      seed: seeds[0],
      temperature: temperature
    });

    const res2 = picoLLM.generate(prompt, {
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

    picoLLM.release();
  });

  test(`should be able to generate with temperature and identical seeds`, () => {
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

    const numPromptTokens = (picoLLM.tokenize(prompt, true, false)).length;

    const res = picoLLM.generate(prompt, {
      completionTokenLimit: completionTokenLimit,
      seed: seed,
      temperature: temperature
    });

    const res2 = picoLLM.generate(prompt, {
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

    picoLLM.release();
  });

  test(`should be able to generate with temperature and top_p`, () => {
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

    const res = picoLLM.generate(prompt, {
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

    picoLLM.release();
  });

  test(`should be able to generate with top choices`, () => {
    const data = testData.picollm['with-top-choices'];
    const prompt = data.prompt;
    const numTopChoices = data.parameters['num-top-choices'];

    runGenerateTest(prompt, data.expectations, {
      numTopChoices: numTopChoices
    });
  });

  test(`should be able to generate with streamCallback`, () => {
    const data = testData.picollm.default;
    const prompt = data.prompt;

    const pieces: string[] = [];

    runGenerateTest(prompt, data.expectations, {
      streamCallback: token => { pieces.push(token); }
    });

    expect(pieces.join('')).toEqual(data.expectations[0].completion);
  });

  test(`should be able to tokenize`, () => {
    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

    const data = testData.picollm.tokenize;
    const text = data.text;

    const tokens = picoLLM.tokenize(text, true, false);
    expect(tokens).toEqual(data.tokens);

    picoLLM.release();
  });

  test(`should be able to forward`, () => {
    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

    const logits = picoLLM.forward(79);
    expect(logits.length).toBeGreaterThan(0);

    const sum = logits.reduce((acc, x) => acc + Math.exp(x), 0);
    expect(Math.abs(1 - (sum / logits.reduce((acc, x) => acc + Math.exp(x), 0)))).toBeLessThan(0.0001);

    picoLLM.release();
  });

  test(`should be able to reset`, () => {
    const picoLLM = new PicoLLM(ACCESS_KEY, MODEL_PATH, {
      device: DEVICE
    });

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

    picoLLM.release();
  });
});

describe('PicoLLM Dialog tests', () => {
  test('should be able to get prompt', async () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const prompts = data.prompts;

    await runDialogTest(prompts, conversation);
  });

  test('should be able to get prompt with system', async () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const system = data.system;
    const prompts = data['prompts-with-system'];

    await runDialogTest(prompts, conversation, {
      system: system
    });
  });

  test('should be able to get prompt with history', async () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const prompts = data['prompts-with-history'];

    await runDialogTest(prompts, conversation, {
      history: 0
    });
  });

  test('should be able to get prompt with system and history', async () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const system = data.system;
    const prompts = data['prompts-with-system-and-history'];

    await runDialogTest(prompts, conversation, {
      system: system,
      history: 0
    });
  });
});
