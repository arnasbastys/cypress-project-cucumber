import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`I open {string} page`, (url) => {
  cy.intercept('GET', Cypress.config().baseUrl + url).as('intialPage');
  cy.visit(url, {
    failOnStatusCode: false,
    onBeforeLoad(win) {
      cy.spy(win.console, 'error').as('console.error');
    },
  });
});

Then('I should not see errors in the console', () => {
  cy.get('@console.error').should('not.have.been.called');
});

Then('All links should be valid', () => {
  cy.get('link[href]').each((link) => {
    const href = link.attr('href');
    if (href) {
      checkLinkStatus(href);
    }
  });

  cy.get('a[href]').each((a) => {
    //implement check to exclude same page links
    const href = a.attr('href');
    const hrefIncludesMailto = href?.startsWith('mailto');
    const hrefIncludesTel = href?.startsWith('tel');
    const hrefIncludesHash = href?.startsWith('#');
    const hrefIncludesTwoDots = href?.startsWith('..');

    if (
      href &&
      !hrefIncludesMailto &&
      !hrefIncludesHash &&
      !hrefIncludesTel &&
      !hrefIncludesTwoDots
    ) {
      checkLinkStatus(href);
    }

    if (hrefIncludesTwoDots) {
      cy.url().then((url) => {
        const linkToTest = `${url}/../${href}`; // hack to move up one level
        checkLinkStatus(linkToTest);
      });
    }
  });
});

Then(`Page should return status {string}`, (statusCode) => {
  cy.wait('@intialPage')
    .its('response.statusCode')
    .should('eq', parseInt(statusCode));
});

const checkLinkStatus = (href: string) => {
  cy.request(href).then((response) => {
    expect(response.status).to.not.match(
      /[4][0-9][0-9]/,
      'Link to the page is not 4xx'
    );
  });
};
