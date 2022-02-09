import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import ProductCardSkeleton from 'src/components/skeletons/ProductCardSkeleton'

import ProductCard from '../ProductCard'
import './product-grid.scss'

const SKELETON_PRODUCTS: Readonly<JSX.Element[]> = [
  <ProductCardSkeleton bordered key="0" />,
  <ProductCardSkeleton bordered key="1" />,
  <ProductCardSkeleton bordered key="2" />,
  <ProductCardSkeleton bordered key="3" />,
  <ProductCardSkeleton bordered key="4" />,
  <ProductCardSkeleton bordered key="5" />,
  <ProductCardSkeleton bordered key="6" />,
  <ProductCardSkeleton bordered key="7" />,
  <ProductCardSkeleton bordered key="8" />,
  <ProductCardSkeleton bordered key="9" />,
  <ProductCardSkeleton bordered key="10" />,
  <ProductCardSkeleton bordered key="11" />,
]

interface Props {
  products: ProductSummary_ProductFragment[]
  page: number
  pageSize: number
}

function ProductGrid({ products, page, pageSize }: Props) {
  const haveProducts = products && products?.length > 0

  return (
    <ul className="product-grid">
      {haveProducts
        ? products.map((product, idx) => (
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
          ))
        : SKELETON_PRODUCTS.map((skeleton, index) => (
            <li key={String(index)}>{skeleton}</li>
          ))}
    </ul>
  )
}

export default ProductGrid
