import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    // TODO: add test vars
  },
  e2e: {
    defaultCommandTimeout: 1000000,
    supportFile: 'cypress/support/index.ts',
    specPattern: 'test/*.test.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false,
  },
});
