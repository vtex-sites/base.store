import React from 'react'
import { graphql, Link } from 'gatsby'

import type { ProductSummary_ProductFragment } from './__generated__/ProductSummary_product.graphql'

interface Props {
  product: ProductSummary_ProductFragment
}

function ProductSummary({ product }: Props) {
  return (
    <Link to={`/${product.slug}/p`}>
      <div>{product.productName}</div>
    </Link>
  )
}

export const fragment = graphql`
  fragment ProductSummary_product on VTEX_Product {
    slug: linkText
    productId
    productName
  }
`

export default ProductSummary
