const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    baseUrl: "https://qa.navega.com.vc",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",
    env: {
      loginPath: "/login",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
