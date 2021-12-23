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
    // TODO Update this once grid page are styled properly
    <ul className="temp-grid-row">
      {products.map((product, idx) => {
        return (
          <li key={`${product.id}`}>
            <ProductSummary
              key={`${product.id}`}
              product={product}
              index={pageSize * page + idx + 1}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ProductGrid
