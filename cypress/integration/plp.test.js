// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for PLP
 */

import { options } from '../global'
import { cypress } from '../../store.config'

const { pages } = cypress

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
          expect(loc).to.include(value)
        })

        // Check if the filter applied actually brought the number of products it said it would
        cy.getById('product-link').should('have.length', Number(quantity))
      })
  })

  it('Sort products by price_asc', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('search-sort')
      .should('exist')
      .select('price_asc')
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

  it('Sort products by price_desc', () => {
    cy.getById('search-sort')
      .should('exist')
      .select('price_desc')
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

describe('Infinite Scroll pagination', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  it('Shows more products when requested', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('product-link')
      .should('exist')
      .should('have.length.gt', 0)
      .then(($links) => {
        const before = $links.length

        cy.getById('show-more')
          .should('exist')
          .click()
          .then(() => {
            cy.getById('product-link')
              .should('have.length.gte', before)
              .then(($products) => {
                const after = $products.length

                expect(before).to.be.lte(after)
              })
          })
      })
  })

  it('Sticks to last seen page on plp pagination', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('product-link')
      .should('exist')
      .should('have.length.gt', 0)
      .then(($links) => {
        // Number of products before showMore is clicked
        const before = $links.length

        cy.getById('show-more')
          .should('exist')
          .click()
          .then(() => {
            // The skuId of the last product on the page
            let skuIdBeforeNavigate

            cy.getById('product-link')
              // Number of products after showMore is clicked should be higher
              .should('have.length.gte', before)
              .last()
              .within(() => {
                cy.getById('buy-button').then(($btn) => {
                  skuIdBeforeNavigate = $btn.attr('data-sku')
                })
              })
              .click()
              .then(() => {
                // make sure we are on the pdp
                cy.location('pathname').should('match', /\/p$/)
              })
              .then(() => {
                cy.go('back')
                  .getById('buy-button')
                  .last()
                  .then(($btn) => {
                    const skuIdAfterNavigate = $btn.attr('data-sku')

                    expect(skuIdBeforeNavigate).to.eq(skuIdAfterNavigate)
                  })
              })
          })
      })
  })

  // Tests: https://developers.google.com/search/blog/2014/02/infinite-scroll-search-friendly
  it('Changes the page being viewed on scroll', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('show-more')
      .should('exist')
      .click()
      .then(() => {
        cy.getById('product-link')
          .last()
          .scrollIntoView()
          .location()
          .should(($loc) => {
            expect($loc.search).includes('page=1')
          })
          .getById('product-link')
          .first()
          .scrollIntoView()
          .location()
          .should(($loc) => {
            expect($loc.search).includes('page=0')
          })
      })
  })
})
