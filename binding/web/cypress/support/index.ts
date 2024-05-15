import './commands';
import { PicoLLM, PicoLLMWorker } from '../../';

declare global {
  namespace Cypress {
    interface Chainable {
      readFiles(files: string[]): Chainable<Blob[]>;
      loadModel(): Chainable<Blob[]>;
      initPicoLLM(accessKey: string, worker: boolean): Chainable<void>;
      loadPicoLLM(): Chainable<PicoLLM | PicoLLMWorker>;
      deletePicoLLM(): Chainable<void>;
    }
  }
}
