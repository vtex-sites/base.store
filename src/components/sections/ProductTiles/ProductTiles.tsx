import React from 'react'
import Tiles, { Tile } from 'src/components/ui/Tiles'
import ProductCard from 'src/components/product/ProductCard'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

interface TilesProps {
  products: ProductSummary_ProductFragment[]
}

const ProductTiles = ({ products }: TilesProps) => {
  return (
    <Tiles>
      {products.map((product, idx) => (
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
  )
}

export default ProductTiles
