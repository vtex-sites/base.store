import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import { ITEMS_PER_PAGE } from 'src/constants'
import ProductCardSkeleton from 'src/components/skeletons/ProductCardSkeleton'

import ProductCard from '../ProductCard'
import './product-grid.scss'

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
        : Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (
            <li key={String(index)}>
              <ProductCardSkeleton bordered />
            </li>
          ))}
    </ul>
  )
}

export default ProductGrid
