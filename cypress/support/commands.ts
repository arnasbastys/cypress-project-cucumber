/// <reference path='./index.d.ts' />

Cypress.Commands.add('validateAllLinks', (linkSelector) => {
  cy.get(linkSelector).each((link) => {
    const href = link.attr('href');
    const hrefStartsWithMailto = href?.startsWith('mailto');
    const hrefStartsWithTel = href?.startsWith('tel');
    const hrefStartsWithHash = href?.startsWith('#');
    const hrefStartsWithTwoDots = href?.startsWith('..');

    if (
      href &&
      !hrefStartsWithMailto &&
      !hrefStartsWithHash &&
      !hrefStartsWithTel &&
      !hrefStartsWithTwoDots
    ) {
      checkLinkStatus(href);
    }

    if (hrefStartsWithTwoDots) {
      cy.url().then((url) => {
        // Cypress gives full path with cy.url() and we need to move one level up,
        // before we can resolve the link with "two dots" relative path
        const linkToTest = `${url}/../${href}`;
        checkLinkStatus(linkToTest);
      });
    }
  });

  const checkLinkStatus = (href: string) => {
    cy.request(href).then((response) => {
      expect(response.status).to.not.match(
        /[4][0-9][0-9]/,
        'Link to the page is not 4xx'
      );
    });
  };
});
