import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import ProductCard from '../ProductCard'
import './product-grid.scss'

interface Props {
  products: ProductSummary_ProductFragment[]
  page: number
  pageSize: number
}

function ProductGrid({ products, page, pageSize }: Props) {
  return (
    <ul className="product-grid">
      {products.map((product, idx) => (
        <li key={`${product.id}`}>
          <ProductCard
            product={product}
            index={pageSize * page + idx + 1}
            bordered
            outOfStock={
              product.offers.offers?.[0].availability !==
              'https://schema.org/InStock'
            }
          />
        </li>
      ))}
    </ul>
  )
}

export default ProductGrid
