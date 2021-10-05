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

Cypress.Commands.add('itemsInCart', (count) => {
  return cy.getById('cart-toggle').should(($toggle) => {
    expect($toggle.attr('data-items')).to.eq(count.toString())
  })
})

Cypress.Commands.add('dataLayerSize', (count) => {
  return cy.window().then((window) => {
    expect(window.dataLayer.length).to.eq(count)
  })
})

Cypress.Commands.add('dataLayerHasEvent', (eventName) => {
  return cy.window().then((window) => {
    const allEvents = window.dataLayer.map((evt) => evt.type)

    expect(allEvents).to.include(eventName)
  })
})

Cypress.Commands.add('eventDataHasCurrencyProperty', () => {
  return cy.window().then((window) => {
    const allEvents = window.dataLayer.map((evt) => evt.data || {})

    allEvents.forEach((event) => {
      if (event.value !== undefined) {
        expect(event).to.have.property('value')
        expect(event).to.have.property('currency')
      }
    })
  })
})

Cypress.Commands.add('itemsHaveRequiredProperties', () => {
  return cy.window().then((window) => {
    const allItems = window.dataLayer.flatMap((evt) => evt.data.items || [])

    allItems.forEach((item) => {
      expect(item).to.have.any.keys('item_id', 'item_name')
    })
  })
})
