import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import ProductShelfSkeleton from 'src/components/skeletons/ProductShelfSkeleton'

import ProductCard from '../../product/ProductCard'
import Section from '../Section'

import './product-shelf.scss'

interface ProductShelfProps {
  products: ProductSummary_ProductFragment[]
  title: string | JSX.Element
  withDivisor?: boolean
}

function ProductShelf({
  products,
  title,
  withDivisor = false,
}: ProductShelfProps) {
  return (
    <Section className={`grid-section ${withDivisor ? 'shelf__divisor' : ''}`}>
      <h2 className="title-section / grid-content">{title}</h2>
      <div data-product-shelf-content>
        <ProductShelfSkeleton loading={products.length === 0}>
          <ul data-product-shelf-items className="grid-content">
            {products.map((product, idx) => (
              <li key={`${product.id}`}>
                <ProductCard product={product} index={idx + 1} />
              </li>
            ))}
          </ul>
        </ProductShelfSkeleton>
      </div>
    </Section>
  )
}

export default ProductShelf
