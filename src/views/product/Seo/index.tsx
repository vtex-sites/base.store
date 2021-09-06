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
    name
    description
    sku
    gtin

    breadcrumbList {
      itemListElement {
        item
        name
        position
      }
    }

    image {
      url
    }

    # items {
    #   ean
    #   name
    #   itemId
    #   images {
    #     imageUrl
    #     imageText
    #   }
    #   videos {
    #     videoUrl
    #   }
    #   sellers {
    #     commercialOffer: commertialOffer {
    #       price: Price
    #       listPrice: ListPrice
    #       availableQuantity: AvailableQuantity
    #       priceValidUntil: PriceValidUntil
    #       spotPrice
    #     }
    #   }
    # }
  }
`

export default Seo
