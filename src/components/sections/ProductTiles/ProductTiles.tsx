import React from 'react'
import Tiles, { Tile } from 'src/components/ui/Tiles'
import ProductCard from 'src/components/product/ProductCard'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

interface TilesProps {
  products: ProductSummary_ProductFragment[]
}

const NUMBER_ITEMS_TO_EXPAND_FIRST_TWO = 2
const NUMBER_ITEMS_TO_EXPAND_FIRST = 3

const ProductTiles = ({ products }: TilesProps) => {
  function getRatio(idx: number) {
    const expandsFirstTile =
      products.length === NUMBER_ITEMS_TO_EXPAND_FIRST && idx === 0

    const expandsFirstTwoTile =
      products.length === NUMBER_ITEMS_TO_EXPAND_FIRST_TWO &&
      (idx === 0 || idx === 1)

    if (expandsFirstTile || expandsFirstTwoTile) {
      return '4:3'
    }

    return '3:4'
  }

  return (
    <Tiles>
      {products.map((product, idx) => (
        <Tile key={`${product.id}`}>
          <ProductCard
            product={product}
            index={idx + 1}
            structure="wide"
            ratio={getRatio(idx)}
            badgeVariant="highlighted"
          />
        </Tile>
      ))}
    </Tiles>
  )
}

export default ProductTiles
