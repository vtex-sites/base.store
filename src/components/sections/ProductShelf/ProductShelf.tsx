import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import ProductShelfSkeleton from 'src/components/skeletons/ProductShelfSkeleton'

import ProductCard from '../../product/ProductCard'
import Section from '../Section'
import * as style from './product-shelf.module.scss'

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
    <Section
      className={`page__section-shelf / grid-section ${
        withDivisor ? 'page__section-divisor' : ''
      }`}
    >
      <h2 className="title-section / grid-content">{title}</h2>
      <div className="page__section-content">
        <ProductShelfSkeleton loading={products.length === 0}>
          <ul className={`grid-content / ${style.container}`}>
            {products.map((product, idx) => (
              <li key={`${product.id}`} className={style.item}>
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
