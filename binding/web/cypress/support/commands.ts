Cypress.Commands.add('readFiles', (files: string[]) => {
  const chunks: any[] = [];

  for (const file of files) {
    for (let i = 0; i < 5; i++) {
      try {
        cy.log(`Reading chunk ${file}`);
        cy.readFile(file, null, { timeout: 30000 }).then(chunk => {
          cy.log(`Reading chunk ${file}`);
          chunks.push(new Blob([chunk]));
        });
        break;
      } catch (e: any) {
        cy.log(`${e}`);

        // silently fail and try again
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);
      }
    }
  }
  cy.log(`Reading finished`);
  cy.then(() => chunks);
});
