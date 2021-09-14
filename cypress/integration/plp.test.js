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

    cy.getById('facet-filter-checkbox').should('exist')
  })

  it('Applies filters after click', () => {
    cy.visit(pages.collection, options)
    cy.waitForHydration()

    cy.getById('facet-filter-checkbox').should('exist').first().click()
  })
})
