describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.intercept('/graphql/?operationName=BrowserProductQuery*').as(
      'productQuery'
    )

    cy.intercept('/graphql/?operationName=GalleryQuery*').as('galleryQuery')
  })
  it('Test Home', () => {
    cy.visit('/')
    cy.waitForHydration()
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Test Collections Page', () => {
    cy.visit('/women')
    cy.wait('@galleryQuery')
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Test Product Page', () => {
    cy.visit('/small-messenger-bag-with-double-g/p')
    cy.wait('@productQuery')
    cy.injectAxe()
    cy.checkA11y()
  })
})
