# Cypress Project

Cypress project to scan pages implemented with: [cypress](https://docs.cypress.io/api/table-of-contents), [cucumber](https://www.npmjs.com/package/cypress-cucumber-preprocessor), [cypress-terminal-report](https://github.com/archfz/cypress-terminal-report), [typescript](https://docs.cypress.io/guides/tooling/typescript-support#Install-TypeScript), [docker](https://github.com/cypress-io/cypress-docker-images)

To see scan results check the last run on "GitHub Actions": [link](https://github.com/arnasbastys/cypress-project/actions)

## Launch scan

### On a local machine with node:

- Clone project
- Install dependencies(in the project directory): `npm install`
- Launch scan by running the command: `npx cypress run`
- Switch browser by adding chrome or firefox parameter `npx cypress run --browser chrome`

### On a local machine with docker:

- Clone project
- Build docker image (in project directory): `docker build .`
- Scan with chrome: `docker-compose run scan-chrome`
- Scan with firefox: `docker-compose run scan-firefox`

### On the GitHub page with "GitHub Actions"

- Navigate in your browser to: [link](https://github.com/arnasbastys/cypress-project/actions)
- Launch scan manually (by default it runs on both Chrome and Firefox)
- More info on how to trigger workflow manually: [link](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow)
