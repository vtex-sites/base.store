import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import ProductCard from '../../product/ProductCard'

import './product-shelf.scss'

interface ProductShelfProps {
  products: ProductSummary_ProductFragment[]
}

function ProductShelf({ products }: ProductShelfProps) {
  return (
    <ul data-product-shelf className="grid-content">
      {products.map((product, idx) => (
        <li key={`${product.id}`}>
          <ProductCard product={product} index={idx + 1} showActions={false} />
        </li>
      ))}
    </ul>
  )
}

export default ProductShelf
