// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for Search Input
 */

import { pages, options } from '../global'

describe('Search page Filters and Sorting options', () => {
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

  context('when search for collection name', () => {
    it('opens the collection page', () => {
      cy.visit(pages.home, options)
      cy.waitForHydration()

      cy.getById('store-input').click().type(pages.brand_name)
      cy.getById('store-button').click()

      cy.location('pathname')
      cy.get('#collection-page').should('exist')
    })
  })
})
