import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import browserify from "@badeball/cypress-cucumber-preprocessor/browserify";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify(config, {
      typescript: require.resolve("typescript"),
    })
  );

  const terminalReportOptions = {
    printLogsToConsole: "always",
    routeTrimLength: 50,
    printLogsToFile: "always",
    outputRoot: config.projectRoot + "/logs/",
    outputTarget: {
      "scanResults.json": "json",
    },
  };

  require("cypress-terminal-report/src/installLogsPrinter")(
    on,
    terminalReportOptions
  );

  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: "https://www.w3.org/",
    specPattern: "**/*.feature",
    watchForFileChanges: false,
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents,
  },
});
