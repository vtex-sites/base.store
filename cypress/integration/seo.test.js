// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

// TODO: Improve structured data validaton by actually using schema.org's schemas

Cypress.on('window:before:load', (win) => {
  // @ts-ignore
  // eslint-disable-next-line no-proto
  delete win.navigator.__proto__.ServiceWorker
})

describe('Home Page Seo tags', () => {
  const pathname = '/'

  it('Has basic tags', () => {
    cy.visit(pathname)

    cy.title().should('exist')
    cy.get('meta[name="description"]').should('exist')
    cy.get('meta[name="robots"][content="index,follow"]').should('exist')
    cy.get('meta[name="googlebot"][content="index,follow"]').should('exist')
    cy.get('link[rel="canonical"]')
      .should('exist')
      .should(($link) => {
        expect($link.attr('href')).to.eq(`https://${window.host}/`)
      })
  })

  it('Has structured data', () => {
    cy.visit(pathname)

    cy.get('script[type="application/ld+json"]')
      .should('exist')
      .should(($el) => {
        const jsonld = JSON.parse($el.text())

        expect(jsonld['@context']).to.eq('https://schema.org')
        expect(jsonld['@type']).to.eq('WebSite')
      })
  })

  it('Has Open Graph tags', () => {
    cy.visit(pathname)

    cy.get('meta[property="og:type"][content="website"]').should('exist')
    cy.get('meta[property="og:title"]')
      .should('exist')
      .should(($el) => {
        expect($el.attr('content')).to.be.a('string')
      })

    cy.get('meta[property="og:description"]')
      .should('exist')
      .should(($el) => {
        expect($el.attr('content')).to.be.a('string')
      })
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

describe('Collection Page Seo tags', () => {
  const pathname = '/women/'

  it('Has basic tags', () => {
    cy.visit(pathname)

    cy.title().should('exist')
    // cy.get('name="description"').should('exist')
  })

  it('Has structured data', () => {
    cy.visit(pathname)
  })

  it('Has Open Graph tags', () => {
    cy.visit(pathname)
  })
})

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
