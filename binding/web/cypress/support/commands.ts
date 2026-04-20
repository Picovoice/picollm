// @ts-ignore
import modelData from '../fixtures/model_data.json';
import { PicoLLM, PicoLLMWorker } from '../../';

let chunks: Blob[];
let picoLLM: PicoLLM | PicoLLMWorker;

Cypress.Commands.add('readFiles', (files: string[]) => {
  const chunks: any[] = [];

  for (const file of files) {
    for (let i = 0; i < 5; i++) {
      try {
        cy.readFile(file, null, { timeout: 30000 }).then(chunk => {
          chunks.push(new Blob([chunk]));
        });
        break;
      } catch (e) {
        // silently fail and try again
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);
      }
    }
  }

  cy.then(() => chunks);
});

Cypress.Commands.add('loadModel', (modelName: string) => {
  if (!chunks) {
    return cy.readFiles(modelData[modelName].modelFiles).then(c => {
      chunks = c;
      return c;
    });
  }
  return cy.wrap(chunks);
});

Cypress.Commands.add('initPicoLLM', (modelName: string, accessKey: string, worker: boolean) => {
  if (!picoLLM) {
    cy.loadModel(modelName).then(async c => {
      const model = { cacheFilePath: modelName, modelFile: c };
      if (worker) {
        picoLLM = await PicoLLMWorker.create(accessKey, model);
      } else {
        picoLLM = await PicoLLM.create(accessKey, model);
      }
    });
  }
});

Cypress.Commands.add('loadPicoLLM', () => cy.wrap(picoLLM));

Cypress.Commands.add('deletePicoLLM', () => {
  if (picoLLM) {
    cy.wrap(null).then(async () => {
      await picoLLM.release();
      // @ts-ignore
      picoLLM = undefined;

      // @ts-ignore
      chunks = undefined
    });
  }
});
