describe('Accessibility tests', () => {
  it('Test Home', () => {
    cy.visit('/women')
    cy.intercept('/graphql/?operationName=GalleryQuery*').as('galleryQuery')
    cy.wait('@galleryQuery')
    cy.injectAxe()
    cy.checkA11y()
  })
})
