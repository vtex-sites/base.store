describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.intercept('*/graphql?operationName=BrowserProductQuery*').as(
      'productQuery'
    )

    cy.intercept('*/graphql?operationName=GalleryQuery*').as('galleryQuery')
  })
  it('Home', () => {
    cy.visit('/')
    cy.waitForHydration()
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Collections Page', () => {
    cy.visit('/women')
    cy.wait('@galleryQuery')
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Product Page', () => {
    cy.visit('/organza-sleeve-top-143/p/')
    cy.wait('@productQuery')
    cy.injectAxe()
    cy.checkA11y()
  })
})
