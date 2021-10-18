// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for testing the Analytics module
 */

import { pages, options } from '../global'

describe('add_to_cart event', () => {
  beforeEach(() => {
    cy.clearIDB()
    cy.clearDataLayer()
  })

  const testAddToCartEvent = (skuId) => {
    cy.window().then((window) => {
      const { dataLayer } = window

      expect(dataLayer).to.have.length(1)

      const event = dataLayer.find((e) => e.type === 'add_to_cart')

      expect(event).to.not.be.null
      expect(event.data).to.have.property('value')

      const item = event.data.items.find((i) => i.item_id === skuId)

      expect(item).to.not.be.null
      expect(item).to.have.property('currency')
      expect(item).to.have.property('item_name')
    })
  }

  it('raises add_to_cart at pdp', () => {
    cy.visit(pages.pdp, options)
    cy.waitForHydration()

    cy.itemsInCart(0)

    // Add to cart
    cy.getById('buy-button')
      .click()
      .then(($btn) => {
        cy.itemsInCart(1)
        const skuId = $btn.attr('data-sku')

        testAddToCartEvent(skuId)
      })
  })

  it('raises add_to_cart at collection page', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.itemsInCart(0)

    // Add to cart
    cy.getById('buy-button')
      .first()
      .click()
      .then(($btn) => {
        cy.itemsInCart(1)
        const skuId = $btn.attr('data-sku')

        testAddToCartEvent(skuId)
      })
  })
})
