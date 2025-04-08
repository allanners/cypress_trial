// npx cypress run --record --key 22e972df-2261-4a3d-a8cc-8feb1c4531ca

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7h4a3j",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
