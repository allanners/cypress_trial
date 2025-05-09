const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://datatables.net", // QA URL
    viewportWidth: 850,  // Set viewport width
    viewportHeight: 550  // Set viewport height
  },
  env: {
    projectName: "QA API Testing",
    environment: "qa",
    authToken: "Bearer STATIC_TOKEN_123"
  }
});