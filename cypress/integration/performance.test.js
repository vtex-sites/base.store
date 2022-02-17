// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
/**
 * Cypress tests for testing the Cart module
 */

import { options } from '../global'
import { cypress } from '../../store.config'

const { pages } = cypress

const paths = [
  pages.pdp,
  pages.home,
  pages.search,
  pages.collection,
  pages.collection_filtered,
]

const testMark = (path, mark) => {
  cy.visit(path, options)
  cy.waitForHydration()

  cy.window().should((win) => {
    expect(win.performance.getEntriesByName(mark)).to.have.length(1)
  })
}

describe('React rendering performance', () => {
  beforeEach(() => {
    cy.clearIDB()
  })

  it('Renders Navbar component once', () => {
    const mark = 'Navbar'

    for (const path of paths) {
      testMark(path, mark)
    }
  })

  it('Renders Footer component once', () => {
    const mark = 'Footer'

    for (const path of paths) {
      testMark(path, mark)
    }
  })

  it('Renders Alert component once', () => {
    const mark = 'Alert'

    for (const path of paths) {
      testMark(path, mark)
    }
  })

  it('Renders Page component once', () => {
    const mark = 'Page'

    for (const path of paths) {
      testMark(path, mark)
    }
  })

  it('Renders toplevel component once', () => {
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
