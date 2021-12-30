import React from 'react'
import Tiles, { Tile } from 'src/components/ui/Tiles'
import ProductCard from 'src/components/product/ProductCard'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

interface TilesProps {
  products: ProductSummary_ProductFragment[]
}

const ProductTiles = ({ products }: TilesProps) => {
  return (
    <section className="grid-section grid-content">
      <h2 className="title-subsection">Just Arrived</h2>
      <div className="tiles-content">
        <Tiles>
          {products.slice(0, 3).map((product, idx) => (
            <Tile key={`${product.id}`}>
              <ProductCard
                product={product}
                index={idx + 1}
                variant="horizontal"
                showActions={false}
              />
            </Tile>
          ))}
        </Tiles>
      </div>
    </section>
  )
}

export default ProductTiles
