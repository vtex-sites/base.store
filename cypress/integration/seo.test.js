describe('Search Page Seo tags', () => {
  it('Has basic tags', () => {
    cy.visit('/')
  })

  it('Has structured data', () => {
    cy.visit('/')
  })

  it('Has Open Graph tags', () => {
    cy.visit('/')
  })
})

describe('Product Page Seo tags', () => {
  it('Has basic tags', () => {
    cy.visit('/')
  })

  it('Has structured data', () => {
    cy.visit('/')
  })

  it('Has Open Graph tags', () => {
    cy.visit('/')
  })
})

describe('Home Page Seo tags', () => {
  const pathname = '/'

  it('Has basic tags', () => {
    cy.visit(pathname)

    cy.title().should('exist')
    cy.get('name="description"').should('exist')
  })

  it('Has structured data', () => {
    cy.visit(pathname)
  })

  it('Has Open Graph tags', () => {
    cy.visit(pathname)
  })
})

describe('Collection Page Seo tags', () => {
  const pathname = '/women/'

  it('Has basic tags', () => {
    cy.visit(pathname)

    cy.title().should('exist')
    cy.get('name="description"').should('exist')
  })

  it('Has structured data', () => {
    cy.visit(pathname)
  })

  it('Has Open Graph tags', () => {
    cy.visit(pathname)
  })
})
