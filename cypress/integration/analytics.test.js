// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for testing the Analytics module
 */

import { options } from '../global'
import { cypress } from '../../store.config'

const { pages } = cypress

const dataLayerHasEvent = (eventName) => {
  return cy.window().then((window) => {
    const allEvents = window.dataLayer.map((evt) => evt.type)

    expect(allEvents).to.include(eventName)
  })
}

const eventDataHasCurrencyProperty = () => {
  return cy.window().then((window) => {
    const allEvents = window.dataLayer.map((evt) => evt.data || {})

    allEvents.forEach((event) => {
      if (event.value !== undefined) {
        expect(event).to.have.property('value')
        expect(event).to.have.property('currency')
      }
    })
  })
}

// Prevent cache test files.
// https://github.com/cypress-io/cypress/issues/702
before(function () {
  // run this once before all code
  return window.caches.keys().then(function mapCache(cacheNames) {
    return Promise.all(
      cacheNames.map(function clearCache(cacheName) {
        return window.caches.delete(cacheName)
      })
    )
  })
})

describe('add_to_cart event', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  const testAddToCartEvent = (skuId) => {
    cy.window().then((window) => {
      const { dataLayer } = window

      const event = dataLayer.find((e) => e.type === 'add_to_cart')

      expect(event).to.not.be.null
      expect(event.data).to.have.property('value')

      const item = event.data.items.find((i) => i.item_variant === skuId)

      expect(item).to.not.be.null
      expect(item).to.have.property('currency')
      expect(item).to.have.property('item_name')
    })
  }

  context('when adding a product to cart', () => {
    it('adds add_to_cart event in the data layer at product description page', () => {
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

    it('adds add_to_cart event in the data layer at the product listing page', () => {
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
})

describe('remove_from_cart event', () => {
  const testRemoveFromCartEvent = (skuId) => {
    cy.window().then((window) => {
      const { dataLayer } = window

      const event = dataLayer.find((e) => e.type === 'remove_from_cart')

      expect(event).to.not.be.null
      expect(event.data).to.have.property('value')

      const item = event.data.items.find((i) => i.item_variant === skuId)

      expect(item).to.not.be.null
      expect(item).to.have.property('currency')
      expect(item).to.have.property('item_name')
    })
  }

  context('when removing a product from cart', () => {
    it('adds remove_from_cart event in the data layer', () => {
      cy.visit(pages.pdp, options)
      cy.waitForHydration()

      cy.itemsInCart(0)

      // Add item to cart
      cy.getById('buy-button').click()
      cy.itemsInCart(1)
      cy.getById('checkout-button').should('be.enabled')
      cy.itemsInCart(1)

      // Remove the added item
      cy.getById('remove-from-cart-button')
        .click()
        .then(($btn) => {
          cy.itemsInCart(0)
          const skuId = $btn.attr('data-sku')

          testRemoveFromCartEvent(skuId)
        })
    })
  })
})

describe('view_item event', () => {
  it('add view_item event in data layer', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('product-link')
      .first()
      .click()
      .then(() => {
        dataLayerHasEvent('view_item')
        eventDataHasCurrencyProperty()
      })
  })
})

describe('select_item event', () => {
  it('select_item has the right properties', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    let skuId

    cy.getById('product-link')
      .first()
      .within(() => {
        cy.getById('buy-button').then(($btn) => {
          skuId = $btn.attr('data-sku')
        })
      })
      .click()
      .then(() => {
        cy.window().then((window) => {
          const event = window.dataLayer.find(
            ({ type }) => type === 'select_item'
          )

          expect(event).to.exist
          expect(skuId).to.equal(event.data.items[0].item_id)
        })
      })
  })
})

describe('view_item_list event', () => {
  it('view_item_list event', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('product-link').then(() => {
      cy.scrollTo('top', { duration: 500 }).then(() => {
        dataLayerHasEvent('view_item_list')
        eventDataHasCurrencyProperty()
      })
    })
  })
})
