import { PicoLLM, PicoLLMModel } from '../';

// @ts-ignore
import { modelName, modelFiles } from './test_data.json';

const ACCESS_KEY = Cypress.env('ACCESS_KEY');

describe('PicoLLM basic tests', function () {
  it(`Generate with ${modelName}`, () => {
    try {
      cy.readFiles(modelFiles).then(async chunks => {
        const model: PicoLLMModel = { modelFile: chunks };
        const picoLLM = await PicoLLM.create(ACCESS_KEY, model);
        expect(picoLLM.contextLength).to.be.greaterThan(0);
        expect(picoLLM.maxTopChoices).to.be.greaterThan(0);
        expect(typeof picoLLM.version).to.eq('string');
        expect(picoLLM.version).length.to.be.greaterThan(0);
        expect(typeof picoLLM.model).to.eq('string');
        expect(picoLLM.model).length.to.be.greaterThan(0);

        const result = await picoLLM.generate('what is your name?', {
          completionTokenLimit: 10,
          numTopChoices: 2,
        });
        expect(typeof result.completion).to.eq('string');
        expect(result.completion).length.to.be.greaterThan(0);
        expect(result.usage.completionTokens).to.be.greaterThan(0);
        expect(result.usage.promptTokens).to.be.greaterThan(0);
        expect(result.completionTokens).length.to.be.greaterThan(0);
        expect(result.endpoint).to.be.greaterThan(-1);
      });
    } catch (e) {
      expect(e).to.be.undefined;
    }
  });
});
