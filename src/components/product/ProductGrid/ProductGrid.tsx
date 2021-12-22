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
    /* FIXME Remove this once grid page are styled properly */
    <ul className="temp-grid-row">
      {products.map((product, idx) => (
        <li key={`${product.id}`}>
          <ProductSummary product={product} index={pageSize * page + idx + 1} />
        </li>
      ))}
    </ul>
  )
}

export default ProductGrid
