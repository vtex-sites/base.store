import React from 'react'
import { graphql } from 'gatsby'

import type { ProductSummary_ProductFragment } from './__generated__/ProductSummary_product.graphql'

interface Props {
  product: ProductSummary_ProductFragment
}

function ProductSummary({ product }: Props) {
  return <div>{product.productName}</div>
}

export const fragment = graphql`
  fragment ProductSummary_product on VTEX_Product {
    productId
    productName
  }
`

export default ProductSummary
