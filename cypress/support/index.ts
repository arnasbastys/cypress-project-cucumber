import './commands';
const options = {
  collectTypes: [
    'cons:log',
    'cons:info',
    'cons:warn',
    'cons:error',
    'cy:log',
    'cy:xhr',
    'cy:route',
    'cy:intercept',
    'cy:command',
  ],
};
require('cypress-terminal-report/src/installLogsCollector')(options);
