// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for Search Input
 */

import { pages, options } from '../global'

describe('Search input', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  context('when search for generic term', () => {
    it('opens the search page', () => {
      cy.visit(pages.home, options)
      cy.waitForHydration()

      cy.getById('store-input').click().type('shirt')
      cy.getById('store-button').click()

      cy.location('pathname').should((loc) => {
        expect(loc).to.include(`/s/`)
      })
    })
  })
})
