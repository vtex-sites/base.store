// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for testing the Cart module
 */

import { options } from '../global'
import { cypress } from '../../src/store.config'

const { pages } = cypress

describe('React rendering performance', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  it('Renders pages once', () => {
    const testPage = (path) => {
      cy.visit(path, options)
      cy.waitForHydration()

      cy.getById('react-hydrated').should(($div) => {
        expect(Number($div.attr('data-render-count'))).to.not.gt(2)
      })
    }

    testPage(pages.pdp)
    testPage(pages.home)
    testPage(pages.search)
    testPage(pages.collection)
    testPage(pages.collection_filtered)
  })
})
