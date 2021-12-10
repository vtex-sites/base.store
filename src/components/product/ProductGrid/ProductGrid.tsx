import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import ProductSummary from '../ProductSummary'

interface Props {
  products: ProductSummary_ProductFragment[]
  page: number
  pageSize: number
}

function ProductGrid({ products, page, pageSize }: Props) {
  return (
    <div>
      {products.map((product, idx) => (
        <ProductSummary
          key={`${product.id}`}
          product={product}
          index={pageSize * page + idx + 1}
        />
      ))}
    </div>
  )
}

export default ProductGrid
