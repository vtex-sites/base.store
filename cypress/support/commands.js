// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getById', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add('waitForHydration', () => {
  return cy.get(`[data-testid=react-hydrated]`).should('exist')
})

Cypress.Commands.add('clearIDB', () => {
  return indexedDB.deleteDatabase('keyval-store')
})

Cypress.Commands.add('clearDataLayer', () => {
  return cy.window().then((window) => {
    window.dataLayer = []
  })
})

Cypress.Commands.add('itemsInCart', (count) => {
  return cy.getById('cart-toggle').should(($toggle) => {
    expect($toggle.attr('data-items')).to.eq(count.toString())
  })
})
