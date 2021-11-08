// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for testing the Analytics module
 */

import { pages, options } from '../global'

const dataLayerHasEvent = (eventName) => {
  return cy.window().then((window) => {
    const allEvents = window.dataLayer.map((evt) => evt.type)

    expect(allEvents).to.include(eventName)
  })
}

beforeEach(() => {
  cy.clearIDB()
})

describe('add_to_cart event', () => {
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

  it('add add_to_cart event in the data layer at product description page', () => {
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

  it('add add_to_cart event in the data layer at the product listing page', () => {
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
      cy.getById('cart-item').should('not.exist')
      cy.getById('checkout-button').should('be.enabled')
    })
  })
})

describe('view_item event', () => {
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
  beforeEach(() => {
    cy.visit(pages.collection, options)
  })

  it('add select_item event in data layer', () => {
    cy.getById('product-link')
      .first()
      .click()
      .then(() => {
        dataLayerHasEvent('select_item')
      })
  })

  it('select_item has the right properties', () => {
    cy.intercept('/api/graphql?operationName=CollectionSearchQuery*').as(
      'CollectionSearchQuery'
    )
    cy.wait('@CollectionSearchQuery').then((xhr) => {
      const productInfo = xhr.response.body.data.search.products.edges[0].node
      const eventData = {
        item_id: productInfo.id,
        item_name: productInfo.isVariantOf.name,
        item_variant_name: productInfo.name,
        index: 1,
        item_brand: productInfo.brand.name,
        item_variant: productInfo.sku,
        price: productInfo.offers.offers[0].price,
      }

      cy.getById('product-link')
        .first()
        .click()
        .then(() => {
          return cy.window().then((window) => {
            const [selectItemEvent] = window.dataLayer.filter(
              ({ type }) => type === 'select_item'
            )

            expect(eventData).to.deep.equal(selectItemEvent.data.items[0])
          })
        })
    })
  })
})
