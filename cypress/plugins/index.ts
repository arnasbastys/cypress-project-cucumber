/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');

const plugin: Cypress.PluginConfig = (on, config) => {
  const cucumberOptions = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  };

  const terminalReportOptions = {
    printLogsToConsole: 'always',
    routeTrimLength: 50,
  };

  on('file:preprocessor', cucumber(cucumberOptions));

  require('cypress-terminal-report/src/installLogsPrinter')(
    on,
    terminalReportOptions
  );

  return config;
};

module.exports = plugin;
