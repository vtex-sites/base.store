// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for testing the Cart module
 */

import { pages, options } from '../global'

describe('Search page Filters and Sorting options', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  it('Has filters', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('facet-filter-header')
      .first()
      .click()
      .getById('facet-filter-checkbox')
      .should('exist')
  })

  it('Applies filters after click', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('facet-filter-header')
      .first()
      .click()
      .getById('facet-filter-checkbox')
      .first()
      .click()
      .then(($checkbox) => {
        const quantity = $checkbox.attr('data-quantity')
        const value = $checkbox.attr('data-value')

        // Check if filter applied actually endded up on the url
        cy.location('pathname').should((loc) => {
          expect(loc).to.include(`${pages.collection}/${value}`)
        })

        // Check if filter applied actually brought the number of products it said it would
        cy.getById('product-link').should('have.length', Number(quantity))
      })
  })
})
