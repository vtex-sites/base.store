import React from 'react'
import { graphql } from 'gatsby'
import {
  BreadcrumbJsonLd,
  GatsbySeo,
  ProductJsonLd,
} from 'gatsby-plugin-next-seo'
import type { ProductSeoFragment_SiteFragment } from '@generated/ProductSeoFragment_site.graphql'
import type { ProductSeoFragment_ProductFragment } from '@generated/ProductSeoFragment_product.graphql'

import { useMetadata } from './hooks/useMetadata'

export interface Props {
  site: ProductSeoFragment_SiteFragment
  product: ProductSeoFragment_ProductFragment
}

function Seo(props: Props) {
  const {
    product: {
      gtin,
      sku,
      image,
      name,
      description,
      brand,
      offers,
      breadcrumbList: { itemListElement },
    },
  } = props

  const metadata = useMetadata(props)

  return (
    <>
      <GatsbySeo {...metadata} defer />
      <BreadcrumbJsonLd itemListElements={itemListElement} defer />
      <ProductJsonLd
        name={name}
        description={description}
        brand={brand.name}
        sku={sku}
        gtin={gtin}
        images={image.map((img) => img.url)} // Somehow, Google does not understand this valid Schema.org schema, so we need to do conversions
        offersType="AggregateOffer"
        offers={{ ...offers, price: offers.offers[0].price.toString() }}
        defer
      />
    </>
  )
}

export const fragment = graphql`
  fragment ProductSeoFragment_site on Site {
    siteMetadata {
      title
      description
      titleTemplate
      siteUrl
    }
  }

  fragment ProductSeoFragment_product on StoreProduct {
    seo {
      title
      description
    }

    brand {
      name
    }

    slug
    sku
    gtin
    name
    description

    breadcrumbList {
      itemListElement {
        item
        name
        position
      }
    }

    image {
      url
      alternateName
    }

    offers {
      lowPrice
      highPrice
      priceCurrency
      offers {
        price
        priceValidUntil
        priceCurrency
        availability
        itemCondition
        seller {
          identifier
        }
      }
    }
  }
`

export default Seo
