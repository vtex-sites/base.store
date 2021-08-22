import React from 'react'

import ProductSummary from '../ProductSummary'
import type { ProductSummary_ProductFragment } from '../ProductSummary/__generated__/ProductSummary_product.graphql'

interface Props {
  products: ProductSummary_ProductFragment[]
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '30px',
    marginBottom: '30px',
  },
}

function ProductGrid({ products }: Props) {
  return (
    <div style={styles.grid}>
      {products.map((product, idx) => (
        <ProductSummary key={`${product.id}-${idx}`} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
