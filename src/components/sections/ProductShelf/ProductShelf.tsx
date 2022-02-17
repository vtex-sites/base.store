import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import SkeletonProductShelf from 'src/components/skeletons/SkeletonProductShelf'

import ProductCard from '../../product/ProductCard'

import './product-shelf.scss'

interface ProductShelfProps {
  products: ProductSummary_ProductFragment[]
}

function ProductShelf({ products }: ProductShelfProps) {
  return (
    <SkeletonProductShelf loading={products?.length === 0}>
      <ul data-product-shelf className="grid-content">
        {products.map((product, idx) => (
          <li key={`${product.id}`}>
            <ProductCard product={product} index={idx + 1} />
          </li>
        ))}
      </ul>
    </SkeletonProductShelf>
  )
}

export default ProductShelf
