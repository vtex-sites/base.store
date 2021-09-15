// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for PLP
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

        // Check if the filter applied actually ended up in the URL
        cy.location('pathname').should((loc) => {
          expect(loc).to.include(`${pages.collection}/${value}`)
        })

        // Check if the filter applied actually brought the number of products it said it would
        cy.getById('product-link').should('have.length', Number(quantity))
      })
  })
})
