import {
  ProductSEO as Seo,
  useProductPixelEffect,
} from '@vtex/gatsby-theme-store'
import { graphql } from 'gatsby'
import React from 'react'

import type { ProductViewFragment_ProductFragment } from './__generated__/ProductViewFragment_product.graphql'
import type { ProductViewFragment_SiteFragment } from './__generated__/ProductViewFragment_site.graphql'

interface Props {
  site: ProductViewFragment_SiteFragment
  product: ProductViewFragment_ProductFragment
}

function View(props: Props) {
  const { product, site } = props

  useProductPixelEffect({ product: { id: props.product.id! } })

  return (
    <>
      {/* Seo */}
      <Seo product={product} siteMetadata={site.siteMetadata} />

      {/* Visual Sections */}
      <div>TODO</div>
    </>
  )
}

export const fragment = graphql`
  fragment ProductViewFragment_site on Site {
    siteMetadata {
      title
      description
      titleTemplate
      siteUrl
    }
  }

  fragment ProductViewFragment_product on StoreProduct {
    id: productId

    titleTag
    metaTagDescription

    brand
    linkText
    productName
    description

    categoryTree {
      name
      href
    }

    items {
      name
      itemId
      images {
        imageUrl
        imageText
      }
      videos {
        videoUrl
      }
      sellers {
        commercialOffer: commertialOffer {
          price: Price
          listPrice: ListPrice
          availableQuantity: AvailableQuantity
          priceValidUntil: PriceValidUntil
          spotPrice
        }
      }
    }
  }
`

export default View
