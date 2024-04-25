import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      readFiles(files: string[]): Chainable<Blob[]>;
    }
  }
}
