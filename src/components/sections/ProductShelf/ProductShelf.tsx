import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import { ITEMS_PER_SECTION } from 'src/constants'
import SkeletonProductCard from 'src/components/skeletons/SkeletonProductCard'

import ProductCard from '../../product/ProductCard'

import './product-shelf.scss'

interface ProductShelfProps {
  products: ProductSummary_ProductFragment[]
}

function ProductShelf({ products }: ProductShelfProps) {
  const haveProducts = products && products?.length > 0

  return (
    <ul data-product-shelf className="grid-content">
      {haveProducts
        ? products.map((product, idx) => (
            <li key={`${product.id}`}>
              <ProductCard product={product} index={idx + 1} />
            </li>
          ))
        : Array.from({ length: ITEMS_PER_SECTION }, (_, index) => (
            <li key={String(index)}>
              <SkeletonProductCard sectioned />
            </li>
          ))}
    </ul>
  )
}

export default ProductShelf
