import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import ProductCard from '../ProductCard'

interface Props {
  products: ProductSummary_ProductFragment[]
  page: number
  pageSize: number
}

function ProductGrid({ products, page, pageSize }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-2 sm:grid-cols-4 sm:gap-7 sm:mb-7">
      {products.map((product, idx) => (
        <ProductCard
          key={`${product.id}`}
          product={product}
          index={pageSize * page + idx + 1}
        />
      ))}
    </div>
  )
}

export default ProductGrid
