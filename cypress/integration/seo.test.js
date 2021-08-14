// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

// TODO: Improve structured data validaton by actually using schema.org's schemas

Cypress.on('window:before:load', (win) => {
  // @ts-ignore
  // eslint-disable-next-line no-proto
  delete win.navigator.__proto__.ServiceWorker
})

describe('Home Page Seo', () => {
  const pathname = '/'

  it('has meta/canonical/link tags', () => {
    cy.visit(pathname)

    cy.title().should('exist')
    cy.get('meta[name="description"]').should('exist')
    cy.get('meta[name="robots"][content="index,follow"]').should('exist')
    cy.get('meta[name="googlebot"][content="index,follow"]').should('exist')
    cy.get('link[rel="canonical"]')
      .should('exist')
      .should(($link) => {
        expect($link.attr('href')).to.eq(`https://${window.location.host}/`)
      })
  })

  it('has structured data', () => {
    cy.visit(pathname)

    cy.get('script[type="application/ld+json"]')
      .should('exist')
      .should(($el) => {
        const jsonld = JSON.parse($el.text())

        expect(jsonld['@context']).to.eq('https://schema.org')
        expect(jsonld['@type']).to.eq('WebSite')
      })
  })

  it('has OpenGraph tags', () => {
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

describe('Product Page Seo', () => {
  const pathname = '/organza-sleeve-top/p'

  it('has meta/canonical/link tags', () => {
    cy.visit(pathname)

    cy.title().should('exist')
    cy.get('meta[name="description"]').should('exist')
    cy.get('meta[name="robots"][content="index,follow"]').should('exist')
    cy.get('meta[name="googlebot"][content="index,follow"]').should('exist')
    cy.get('link[rel="canonical"]')
      .should('exist')
      .should(($link) => {
        expect($link.attr('href')).to.eq(
          `https://${window.location.host}${pathname}`
        )
      })
  })

  it('has structured data', () => {
    cy.visit(pathname)

    // Assert there is at least on Product and BreadcrumbList on structured data
    cy.get('script[type="application/ld+json"]')
      .should('exist')
      .should(($el) => {
        const [...jsons] = $el.map((idx) => JSON.parse($el[idx].innerHTML))

        jsons.forEach((x) => {
          expect(x['@context']).to.eq('https://schema.org')
        })

        expect(jsons.find((json) => json['@type'] === 'Product')).to.not.null
        expect(jsons.find((json) => json['@type'] === 'BreadcrumbList')).to.not
          .null
      })
  })

  it('has OpenGraph tags', () => {
    cy.visit(pathname)
  })
})

describe('Collection Page Seo', () => {
  const pathname = '/women/'

  it('has meta/canonical/link tags', () => {
    cy.visit(pathname)

    cy.title().should('exist')
    // cy.get('name="description"').should('exist')
  })

  it('has structured data', () => {
    cy.visit(pathname)
  })

  it('has OpenGraph tags', () => {
    cy.visit(pathname)
  })
})

describe('Search Page Seo', () => {
  const pathname = ''

  it('has meta/canonical/link tags', () => {
    cy.visit(pathname)
  })

  it('has structured data', () => {
    cy.visit(pathname)
  })

  it('has OpenGraph tags', () => {
    cy.visit(pathname)
  })
})
