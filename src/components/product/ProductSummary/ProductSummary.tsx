import { useThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import imagesConf from 'src/images/config'

import type { ProductSummary_ProductFragment } from './__generated__/ProductSummary_product.graphql'

interface Props {
  product: ProductSummary_ProductFragment
}

function ProductSummary({ product }: Props) {
  const { imageUrl: src, imageText: alt } =
    product.items?.[0]?.images?.[0] ?? {}

  const image = useThumborImageData({
    baseUrl: src ?? '',
    ...imagesConf['product.summary'],
  })

  return (
    <Link to={`/${product.slug}/p`}>
      <GatsbyImage image={image} alt={alt ?? ''} />
      <div>{product.productName}</div>
    </Link>
  )
}

export const fragment = graphql`
  fragment ProductSummary_product on VTEX_Product {
    slug: linkText
    productId
    productName

    items {
      images {
        imageUrl
        imageText
      }
    }
  }
`

export default ProductSummary
