import React from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import ProductSummary from '../ProductSummary'
import * as styles from './ProductGrid.module.css'

interface Props {
  products: {
    edges: Array<{
      node: ComponentPropsWithoutRef<typeof ProductSummary>['product']
    }>
  }
}

function ProductGrid({ products }: Props) {
  return (
    <div className={styles.grid}>
      {products.edges.map(({ node: product }, idx) => (
        <ProductSummary key={`${product.id}-${idx}`} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
