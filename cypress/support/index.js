import './commands'
import '@testing-library/cypress/add-commands'
import 'cypress-axe'

beforeEach(() => {
  cy.intercept(
    { middleware: true },
    (req) => (req.headers.authorization = Cypress.env('AUTHORIZATION'))
  )
})
