import {
  ProductSEO as Seo,
  useProductPixelEffect,
} from '@vtex/gatsby-theme-store'
import { graphql } from 'gatsby'
import React from 'react'

import type { ProductViewFragment_CmsSeoFragment } from './__generated__/ProductViewFragment_cmsSeo.graphql'
import type { ProductViewFragment_ProductFragment } from './__generated__/ProductViewFragment_product.graphql'

interface Props {
  cmsSeo: ProductViewFragment_CmsSeoFragment
  product: ProductViewFragment_ProductFragment
}

function View(props: Props) {
  const {
    product,
    cmsSeo: { seo },
  } = props

  useProductPixelEffect({ product: { id: props.product.id! } })

  return (
    <>
      {/* Seo */}
      <Seo product={product} siteMetadata={seo!.siteMetadata!} />

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
