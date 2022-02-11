import React from 'react'
import { useMark } from 'src/hooks/useMark'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import ProductCard from '../../product/ProductCard'

import './product-shelf.scss'

interface ProductShelfProps {
  products: ProductSummary_ProductFragment[]
}

function ProductShelf({ products }: ProductShelfProps) {
  useMark('ProductShelf')

  return (
    <ul data-product-shelf className="grid-content">
      {products.map((product, idx) => (
        <li key={`${product.id}`}>
          <ProductCard product={product} index={idx + 1} />
        </li>
      ))}
    </ul>
  )
}

export default ProductShelf
