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
    <ul>
      {products.map((product, idx) => (
        <li key={`${product.id}`}>
          <ProductCard product={product} index={pageSize * page + idx + 1} />
        </li>
      ))}
    </ul>
  )
}

export default ProductGrid
