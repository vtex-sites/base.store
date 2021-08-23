import React from 'react'

import ProductSummary from '../ProductSummary'
import type { ProductSummary_ProductFragment } from '../ProductSummary/__generated__/ProductSummary_product.graphql'
import * as styles from './ProductGrid.module.css'

interface Props {
  products: ProductSummary_ProductFragment[]
}

function ProductGrid({ products }: Props) {
  return (
    <div className={styles.grid}>
      {products.map((product, idx) => (
        <ProductSummary key={`${product.id}-${idx}`} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
