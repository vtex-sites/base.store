describe('Accessibility tests', () => {
  it('Test Home', () => {
    cy.visit('/')
    cy.waitForHydration()
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Test Collections Page', () => {
    cy.visit('/women')
    cy.intercept('/graphql/?operationName=GalleryQuery*').as('galleryQuery')
    cy.wait('@galleryQuery')
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Test Product Page', () => {
    cy.visit('/small-messenger-bag-with-double-g/p')
    cy.intercept('/graphql/?operationName=BrowserProductQuery*').as(
      'productQuery'
    )
    cy.wait('@productQuery')
    cy.injectAxe()
    cy.checkA11y()
  })
})
