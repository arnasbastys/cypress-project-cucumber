declare namespace Cypress {
  interface Chainable {
    validateAllLinks(linkSelector: string): Chainable<Element>;
  }
}
