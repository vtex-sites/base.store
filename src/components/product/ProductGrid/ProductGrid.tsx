import React from 'react'

import ProductSummary from '../ProductSummary'
import type { ProductSummary_ProductFragment } from '../ProductSummary/__generated__/ProductSummary_product.graphql'

interface Props {
  products: ProductSummary_ProductFragment[]
}

function ProductGrid({ products }: Props) {
  return (
    <div>
      {products.map((product, idx) => (
        <ProductSummary key={`${product.productId}-${idx}`} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
