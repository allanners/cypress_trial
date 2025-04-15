// npx cypress run --record --key 22e972df-2261-4a3d-a8cc-8feb1c4531ca

const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  projectId: "7h4a3j",
  experimentalStudio: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  //retries: 3,
  // testIsolation: false,
  reporter: 'cypress -mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      
      on('before:run', async (details) => {
              console.log('override before:run');
              console.log('Running tests');
              await beforeRunHook(details);
            });
            on('after:run', async () => {
              console.log('override after:run');
              await afterRunHook();
            });
    },
  },
});
