import { PicoLLM, PicoLLMWorker, PicoLLMModel } from '../';

// @ts-ignore
import { modelName, modelFiles } from './test_data.json';
// @ts-ignore
import testData from './test_data.json';

const ACCESS_KEY = Cypress.env('ACCESS_KEY');

describe('PicoLLM basic tests', function () {
  it('List hardware devices', async () => {
    const hardwareDevices: string[] = await PicoLLM.listHardwareDevices();
    expect(Array.isArray(hardwareDevices)).to.be.true;
    expect(hardwareDevices).length.to.be.greaterThan(0);
  });

  it(`Generate with ${modelName}`, () => {
    try {
      cy.readFiles(modelFiles).then(async chunks => {
        const model: PicoLLMModel = { modelFile: chunks };
        const picoLLM = await PicoLLMWorker.create(ACCESS_KEY, model);
        expect(picoLLM.contextLength).to.be.greaterThan(0);
        expect(picoLLM.maxTopChoices).to.be.greaterThan(0);
        expect(typeof picoLLM.version).to.eq('string');
        expect(picoLLM.version).length.to.be.greaterThan(0);
        expect(typeof picoLLM.model).to.eq('string');
        expect(picoLLM.model).length.to.be.greaterThan(0);

        const genResult = await picoLLM.generate('what is your name?', {
          completionTokenLimit: 10,
          numTopChoices: 2,
        });
        expect(typeof genResult.completion).to.eq('string');
        expect(genResult.completion).length.to.be.greaterThan(0);
        expect(genResult.usage.completionTokens).to.be.greaterThan(0);
        expect(genResult.usage.promptTokens).to.be.greaterThan(0);
        expect(genResult.completionTokens).length.to.be.greaterThan(0);
        expect(genResult.endpoint).to.be.greaterThan(-1);

        const tokenResult = await picoLLM.tokenize(
          'what is your name?',
          false,
          false
        );
        expect(tokenResult).length.to.be.greaterThan(0);

        const forwardResult = await picoLLM.forward(tokenResult[0]);
        expect(forwardResult).length.to.be.greaterThan(0);

        await picoLLM.reset();
        await picoLLM.release();
      });
    } catch (e) {
      expect(e).to.be.undefined;
    }
  });
});

describe("Dialog test case", () => {

});
