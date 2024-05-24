import {
  Dialog,
  GemmaChatDialog,
  Llama2ChatDialog,
  Llama3ChatDialog,
  MistralChatDialog,
  Phi2ChatDialog,
  Phi2QADialog,
  PicoLLM,
  PicoLLMWorker,
  PicoLLMModel,
  PicoLLMGenerateOptions,
  PicoLLMCompletion,
  PicoLLMEndpoint,
} from '../';

// @ts-ignore
import { modelName } from '../cypress/fixtures/model_data.json';
// @ts-ignore
import testData from './test_data.json';

const ACCESS_KEY = Cypress.env('ACCESS_KEY');

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

const runInitTest = async (
  instance: typeof PicoLLM | typeof PicoLLMWorker,
  chunks: Blob[],
  params: {
    accessKey?: string;
    modelPath?: string;
    forceWrite?: boolean;
    device?: string;
    expectFailure?: boolean;
  } = {}
) => {
  const {
    accessKey = ACCESS_KEY,
    modelPath = modelName,
    forceWrite = true,
    device = 'best',
    expectFailure = false,
  } = params;

  let isFailed = false;

  try {
    const model: PicoLLMModel = { modelFile: chunks, cacheFilePath: modelPath, cacheFileOverwrite: forceWrite };
    const picoLLM = await instance.create(
      accessKey,
      model,
      {
        device
      }
    );

    expect(picoLLM.contextLength).to.be.greaterThan(0);
    expect(picoLLM.maxTopChoices).to.be.greaterThan(0);
    expect(typeof picoLLM.version).to.eq('string');
    expect(picoLLM.version).length.to.be.greaterThan(0);
    expect(typeof picoLLM.model).to.eq('string');
    expect(picoLLM.model).length.to.be.greaterThan(0);

    await picoLLM.release();
  } catch (e) {
    if (expectFailure) {
      isFailed = true;
    } else {
      expect(e).to.be.undefined;
    }
  }

  if (expectFailure) {
    expect(isFailed).to.be.true;
  }
};

const verifyCompletion = (res: PicoLLMCompletion, expectations: CompletionExpectation[]) => {
  let error: any;
  for (const expectation of expectations) {
    try {
      expect(res.usage.promptTokens).to.eq(expectation['num-prompt-tokens'], 'Usage prompt tokens');
      expect(res.usage.completionTokens).to.eq(expectation['num-completion-tokens'], 'Usage completion tokens');
      expect(res.endpoint).to.eq(PicoLLMEndpoint[expectation.endpoint as keyof typeof PicoLLMEndpoint], 'Endpoint');

      for (const completionToken of res.completionTokens) {
        expect(completionToken.token.token.length).to.be.gt(0, 'Completion token length');
        expect(completionToken.token.logProb).to.be.lte(0, 'Completion token logProb');
        expect(completionToken.topChoices.length).to.eq(expectation['num-top-choices'], 'Completion token topChoices');

        for (const topChoice of completionToken.topChoices) {
          expect(topChoice.token.length).to.be.gt(0, 'TopChoice token length');
          expect(topChoice.logProb).to.be.lte(0, 'TopChoice logProb');
        }

        if (completionToken.topChoices.length > 0) {
          expect(
            completionToken.topChoices.reduce((acc, topChoice) => acc + Math.exp(topChoice.logProb), 0)
          ).to.be.lte(1, 'Sum topChoices logProb');
        }

        if (!res.completionTokens.every(x => x.token.token.includes('\\x'))) {
          expect(
            res.completionTokens.reduce((acc, completionToken) => acc + completionToken.token.token, '')
          ).to.eq(expectation.completion, 'Completion tokens');
        }

        expect(res.completion).to.eq(expectation.completion, 'Completion');
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
  picoLLM: PicoLLM | PicoLLMWorker,
  prompt: string,
  expectations: CompletionExpectation[],
  options?: PicoLLMGenerateOptions,
) => {
  try {
    const res = await picoLLM.generate(prompt, options);
    verifyCompletion(res, expectations);
  } catch (e) {
    expect(e).to.be.undefined;
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
    expect(o.prompt()).to.be.eq(v);
  }
};

describe('PicoLLM basic tests', function () {
  it('List hardware devices', async () => {
    const hardwareDevices: string[] = await PicoLLM.listAvailableDevices();
    expect(Array.isArray(hardwareDevices)).to.be.true;
    expect(hardwareDevices).length.to.be.greaterThan(0);
  });

  it(`should return correct error message stack`, () => {
    cy.loadModel().then(async chunks => {
      const model: PicoLLMModel = { modelFile: chunks };

      let messageStack = [];
      try {
        const picollm = await PicoLLMWorker.create(
          "invalidAccessKey",
          model,
        );
        expect(picollm).to.be.undefined;
      } catch (e: any) {
        messageStack = e.messageStack;
      }

      expect(messageStack.length).to.be.gt(0);
      expect(messageStack.length).to.be.lte(8);

      try {
        const picollm = await PicoLLMWorker.create(
          "invalidAccessKey",
          model,
        );
        expect(picollm).to.be.undefined;
      } catch (e: any) {
        expect(messageStack.length).to.be.eq(e.messageStack.length);
      }
    });
  });

  it(`should be able to init with public path`, () => {
    cy.loadModel().then(async chunks => {
      await runInitTest(PicoLLMWorker, chunks);
    });
  });

  it(`should be able to handle invalid access key`, () => {
    cy.loadModel().then(async chunks => {
      await runInitTest(PicoLLMWorker, chunks, {
        accessKey: 'invalid',
        expectFailure: true,
      });
    });
  });

  it(`should be able to handle UTF-8 model path`, () => {
    cy.loadModel().then(async chunks => {
      await runInitTest(PicoLLMWorker, chunks, {
        modelPath: '테스트',
      });
    });
  });

  it(`should be able to handle invalid device string`, () => {
    cy.loadModel().then(async chunks => {
      await runInitTest(PicoLLMWorker, chunks, {
        device: "nan",
        expectFailure: true,
      });
    });
  });
});

const generateTests = () => {
  it(`should be able to reset`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const logits = await picoLLM.forward(79);
      await picoLLM.reset();

      const newLogits = await picoLLM.forward(79);
      expect(logits).to.deep.eq(newLogits);
    });
  });

  it(`should be able to generate default`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm.default;
      const prompt = data.prompt;

      await runGenerateTest(picoLLM, prompt, data.expectations);
    });
  });

  it(`should be able to generate with completion token limit`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm['with-completion-token-limit'];
      const prompt = data.prompt;
      const completionTokenLimit = data.parameters['completion-token-limit'];

      await runGenerateTest(picoLLM, prompt, data.expectations, {
        completionTokenLimit: completionTokenLimit
      });
    });
  });

  it(`should be able to generate with stop phrases`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm['with-stop-phrases'];
      const prompt = data.prompt;
      const stopPhrases = data.parameters['stop-phrases'];

      await runGenerateTest(picoLLM, prompt, data.expectations, {
        stopPhrases: stopPhrases
      });
    });
  });

  it(`should be able to generate with presence penalty`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm['with-presence-penalty'];
      const prompt = data.prompt;
      const presencePenalty = data.parameters['presence-penalty'];

      await runGenerateTest(picoLLM, prompt, data.expectations, {
        presencePenalty: presencePenalty
      });
    });
  });

  it(`should be able to generate with frequency penalty`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm['with-frequency-penalty'];
      const prompt = data.prompt;
      const frequencyPenalty = data.parameters['frequency-penalty'];

      await runGenerateTest(picoLLM, prompt, data.expectations, {
        frequencyPenalty: frequencyPenalty
      });
    });
  });

  it(`should be able to generate with temperature`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm['with-temperature'];
      const prompt = data.prompt;
      const completionTokenLimit = data.parameters['completion-token-limit'];
      const seeds = data.parameters.seeds;
      const temperature = data.parameters.temperature;

      const numPromptTokens = (await picoLLM.tokenize(prompt, true, false)).length;

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

      expect(res.completion).to.not.eq(res2.completion);
    });
  });

  it(`should be able to generate with temperature and identical seeds`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm['with-temperature-and-identical-seeds'];
      const prompt = data.prompt;
      const completionTokenLimit = data.parameters['completion-token-limit'];
      const seed = data.parameters.seed;
      const temperature = data.parameters.temperature;

      const numPromptTokens = (await picoLLM.tokenize(prompt, true, false)).length;

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

      expect(res.completion).to.eq(res2.completion);
    });
  });

  it(`should be able to generate with temperature and top_p`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm['with-temperature-and-top-p'];
      const prompt = data.prompt;
      const completionTokenLimit = data.parameters['completion-token-limit'];
      const seed = data.parameters.seed;
      const temperature = data.parameters.temperature;
      const topP = data.parameters['top-p'];
      const expectations = data.expectations;

      const numPromptTokens = (await picoLLM.tokenize(prompt, true, false)).length;

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
    });
  });

  it(`should be able to generate with top choices`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm['with-top-choices'];
      const prompt = data.prompt;
      const numTopChoices = data.parameters['num-top-choices'];

      await runGenerateTest(picoLLM, prompt, data.expectations, {
        numTopChoices: numTopChoices
      });
    });
  });

  it(`should be able to generate with streamCallback`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm.default;
      const prompt = data.prompt;

      const pieces: string[] = [];

      await runGenerateTest(picoLLM, prompt, data.expectations, {
        streamCallback: token => { pieces.push(token); }
      });

      expect(pieces.join('')).to.eq(data.expectations[0].completion);
    });
  });

  it(`should be able to tokenize`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const data = testData.picollm.tokenize;
      const text = data.text;

      const tokens = await picoLLM.tokenize(text, true, false);
      expect(tokens).to.deep.eq(data.tokens);
    });
  });

  it(`should be able to forward`, () => {
    cy.loadPicoLLM().then(async picoLLM => {
      const logits = await picoLLM.forward(79);
      expect(logits.length).to.gt(0);

      const sum = logits.reduce((acc, x) => acc + Math.exp(x), 0);
      expect(Math.abs(1 - (sum / logits.reduce((acc, x) => acc + Math.exp(x), 0)))).to.be.lt(0.0001);
    });
  });
};

describe('PicoLLM generate tests (main)', () => {
  before(() => {
    cy.initPicoLLM(ACCESS_KEY, false);
  });

  after(() => {
    cy.deletePicoLLM();
  });

  generateTests();
});

describe('PicoLLM generate tests (worker)', () => {
  before(() => {
    cy.initPicoLLM(ACCESS_KEY, true);
  });

  after(() => {
    cy.deletePicoLLM();
  });

  generateTests();
});

describe('PicoLLM Dialog tests', () => {
  it('should be able to get prompt', async () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const prompts = data.prompts;

    await runDialogTest(prompts, conversation);
  });

  it('should be able to get prompt with system', async () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const system = data.system;
    const prompts = data['prompts-with-system'];

    await runDialogTest(prompts, conversation, {
      system: system
    });
  });

  it('should be able to get prompt with history', async () => {
    const data = testData.dialog;
    const conversation = data.conversation as [string, string][];
    const prompts = data['prompts-with-history'];

    await runDialogTest(prompts, conversation, {
      history: 0
    });
  });

  it('should be able to get prompt with system and history', async () => {
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
