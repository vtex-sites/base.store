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

      cy.getById('store-input').click().type('stripe')
      cy.getById('store-button').click()

      cy.location('pathname').should((loc) => {
        expect(loc).to.include(`/s/`)
      })
    })
  })

  context('when search for brand name', () => {
    it('opens the brand page', () => {
      cy.visit(pages.home, options)
      cy.waitForHydration()

      cy.getById('store-input').click().type('lacoste')
      cy.getById('store-button').click()

      cy.location('pathname').should(() => {
        // TODO make assertion here
      })
    })
  })

  context('when search for category name', () => {
    it('opens the category page', () => {
      cy.visit(pages.home, options)
      cy.waitForHydration()

      cy.getById('store-input').click().type('women')
      cy.getById('store-button').click()

      cy.location('pathname').should(() => {
        // TODO make assertion here
      })
    })
  })
})
