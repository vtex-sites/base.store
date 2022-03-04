import React from 'react'
import ProductShelfSkeleton from 'src/components/skeletons/ProductShelfSkeleton'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import ProductCard from '../../product/ProductCard'

import './product-shelf.scss'

interface ProductShelfProps {
  products: ProductSummary_ProductFragment[]
  title: string | JSX.Element
}

function ProductShelf({ products, title }: ProductShelfProps) {
  return (
    <div className="product-shelf">
      <h2 className="product-shelf__title grid-content">{title}</h2>
      <div className="product-shelf__products">
        <ProductShelfSkeleton loading={products.length === 0}>
          <ul data-product-shelf className="grid-content">
            {products.map((product, idx) => (
              <li key={`${product.id}`}>
                <ProductCard product={product} index={idx + 1} />
              </li>
            ))}
          </ul>
        </ProductShelfSkeleton>
      </div>
    </div>
  )
}

export default ProductShelf
