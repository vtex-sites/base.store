import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import ProductCardSkeleton from 'src/components/skeletons/ProductCardSkeleton'

import ProductCard from '../../product/ProductCard'

import './product-shelf.scss'

const SKELETON_PRODUCTS: Readonly<JSX.Element[]> = [
  <ProductCardSkeleton key="0" />,
  <ProductCardSkeleton key="1" />,
  <ProductCardSkeleton key="2" />,
  <ProductCardSkeleton key="3" />,
  <ProductCardSkeleton key="4" />,
]

interface ProductShelfProps {
  products: ProductSummary_ProductFragment[]
}

function ProductShelf({ products }: ProductShelfProps) {
  const haveProducts = products && products?.length > 0

  return (
    <ul data-product-shelf className="grid-content">
      {!haveProducts
        ? SKELETON_PRODUCTS.map((skeleton, index) => (
            <li key={String(index)}>{skeleton}</li>
          ))
        : products.map((product, idx) => (
            <li key={`${product.id}`}>
              <ProductCard product={product} index={idx + 1} />
            </li>
          ))}
    </ul>
  )
}

export default ProductShelf
