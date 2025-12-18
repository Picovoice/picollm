import { defineConfig } from 'cypress';

export default defineConfig({
  env: {},
  e2e: {
    defaultCommandTimeout: 1000000,
    supportFile: 'cypress/support/index.ts',
    specPattern: 'test/*.test.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--enable-features=SharedArrayBuffer');
        }

        return launchOptions;
      });
    },
  },
});
