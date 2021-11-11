import React from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import ProductSummary from '../ProductSummary'

interface Props {
  products: {
    edges: Array<{
      node: ComponentPropsWithoutRef<typeof ProductSummary>['product']
    }>
  }
  page: number
  pageSize: number
}

function ProductGrid({ products, page, pageSize }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-2 sm:grid-cols-4 sm:gap-7 sm:mb-7">
      {products.edges.map(({ node: product }, idx) => (
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
