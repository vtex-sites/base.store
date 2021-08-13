import {
  ProductSEO as Seo,
  useProductPixelEffect,
} from '@vtex/gatsby-theme-store'
import { graphql } from 'gatsby'
import React from 'react'

import type { ProductViewFragment_ProductFragment } from './__generated__/ProductViewFragment_product.graphql'

interface Props {
  product: ProductViewFragment_ProductFragment
}

function View(props: Props) {
  useProductPixelEffect(props as any)

  return (
    <>
      {/* Seo */}
      {/* <Seo product={props.product} /> */}

      {/* Visual Sections */}
      <div>TODO</div>
    </>
  )
}

export const fragment = graphql`
  fragment ProductViewFragment_cmsSeo on CmsSeo {
    seo {
      siteMetadata {
        title
        description
        titleTemplate
      }
    }
  }

  fragment ProductViewFragment_product on StoreProduct {
    id: productId

    productName

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
        }
      }
    }
  }
`

export default View
