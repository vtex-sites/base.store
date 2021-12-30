// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for Search Input
 */

import { options } from '../global'
import { cypress } from '../../store.config'

const { pages } = cypress

describe('Search input', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  context('when search for generic term', () => {
    it('opens the search page', () => {
      const term = 'shirt'

      cy.visit(pages.home, options)
      cy.waitForHydration()

      cy.get('form[data-store-search-input]').within(() => {
        cy.getById('store-input').click().type(term)

        cy.getById('store-button').click()
      })

      cy.location('search').should((loc) => {
        expect(loc).to.include(`q=${term}`)
      })
    })
  })
})
