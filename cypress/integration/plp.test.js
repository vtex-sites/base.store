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

  it('Applies filters after click', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('facet-filter-header')
      .first()
      .click()
      .getById('facet-filter-checkbox')
      .should('exist')
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

  it('Sort products by price-asc', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('search-sort')
      .should('exist')
      .select('price-asc')
      .then(() => {
        cy.getById('price').should(($prices) => {
          const prices = Cypress._.map($prices, (price) =>
            Number(price.attributes['data-value'].value)
          )

          const sorted = Cypress._.sortBy(prices, Cypress._.identity)

          expect(prices).to.have.length.gt(0)
          expect(prices).to.deep.equal(sorted)
        })
      })
  })

  it('Sort products by price-desc', () => {
    cy.getById('search-sort')
      .should('exist')
      .select('price-desc')
      .then(() => {
        cy.getById('price').should(($prices) => {
          const prices = Cypress._.map($prices, (price) =>
            Number(price.attributes['data-value'].value)
          )

          const sorted = Cypress._.sortBy(prices, (x) => -x)

          expect(prices).to.have.length.gt(0)
          expect(prices).to.deep.equal(sorted)
        })
      })
  })
})
