// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for testing the Cart module
 */

import { pages, options } from '../global'

describe('Cart Sidebar', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  it('toggles cart sidebar', () => {
    cy.visit(pages.home, options)
    cy.waitForHydration()

    cy.getById('cart-toggle').first().click()
    cy.getById('cart-sidebar').should('exist')
    cy.getById('cart-toggle').first().click()
    cy.getById('cart-sidebar').should('not.exist')
  })
})

describe('Cart on pdps', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  it('adds a product to cart', () => {
    cy.visit(pages.pdp, options)
    cy.waitForHydration()

    cy.itemsInCart(0)

    // Add to cart
    cy.getById('buy-button')
      .click()
      .then(($btn) => {
        const skuId = $btn.attr('data-sku')
        const sellerId = $btn.attr('data-seller')

        // Wait for optimisitc cart to kick in
        cy.getById('checkout-button').should('be.enabled')

        cy.getById('cart-item').should(($item) => {
          expect($item.attr('data-sku')).to.eq(skuId)
          expect($item.attr('data-seller')).to.eq(sellerId)
        })

        cy.itemsInCart(1)
      })
  })

  it('removes a product from cart', () => {
    cy.visit(pages.pdp, options)
    cy.waitForHydration()

    cy.itemsInCart(0)

    cy.getById('buy-button').click()

    cy.itemsInCart(1)

    cy.getById('checkout-button').should('be.enabled')

    cy.itemsInCart(1)

    cy.getById('remove-from-cart-button').click()
    cy.getById('cart-item').should('not.exist')
    cy.getById('checkout-button').should('be.enabled')

    cy.itemsInCart(0)
  })
})

describe('Cart on collection pages', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  it('adds a product to cart', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.itemsInCart(0)

    // Add to cart
    cy.getById('buy-button')
      .first()
      .click()
      .then(($btn) => {
        const skuId = $btn.attr('data-sku')
        const sellerId = $btn.attr('data-seller')

        // Wait for optimisitc cart to kick in
        cy.getById('checkout-button').should('be.enabled')

        cy.getById('cart-item').should(($item) => {
          expect($item.attr('data-sku')).to.eq(skuId)
          expect($item.attr('data-seller')).to.eq(sellerId)
        })
      })

    cy.itemsInCart(1)
  })

  it('removes a product from cart', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.itemsInCart(0)

    // Remove from cart
    cy.getById('buy-button').first().click()
    cy.getById('checkout-button').should('be.enabled')

    cy.itemsInCart(1)

    cy.getById('remove-from-cart-button').first().click()
    cy.getById('cart-item').should('not.exist')

    cy.itemsInCart(0)
  })
})
