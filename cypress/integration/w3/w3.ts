import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(`I open {string} page`, (url: string) => {
  cy.intercept("GET", url).as("intialPage");
  cy.visit(url, {
    failOnStatusCode: false,
    onBeforeLoad(win) {
      cy.spy(win.console, "error").as("console.error");
    },
  });
});

Then("I should not see errors in the console", () => {
  cy.get("@console.error").should("not.have.been.called");
});

Then("All links should be valid", () => {
  cy.validateAllLinks("link[href]");
  cy.validateAllLinks("a[href]");
});

Then(`Page should return status {string}`, (statusCode: string) => {
  cy.wait("@intialPage")
    .its("response.statusCode")
    .should("eq", parseInt(statusCode));
});
