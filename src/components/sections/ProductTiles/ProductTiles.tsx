import React from 'react'
import Tiles, { Tile } from 'src/components/ui/Tiles'
import ProductCard from 'src/components/product/ProductCard'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import ProductTileSkeleton from 'src/components/skeletons/ProductTileSkeleton'

const SKELETON_PRODUCTS: Readonly<JSX.Element[]> = [
  <ProductTileSkeleton key="0" tileIndex={1} variant="horizontal" />,
  <ProductTileSkeleton key="1" tileIndex={2} variant="horizontal" />,
  <ProductTileSkeleton key="2" tileIndex={3} variant="horizontal" />,
]

interface TilesProps {
  products: ProductSummary_ProductFragment[]
}

const NUMBER_ITEMS_TO_EXPAND_FIRST = 3
const NUMBER_ITEMS_TO_EXPAND_FIRST_TWO = 2

const getRatio = (products: number, idx: number) => {
  const expandsFirstTile =
    products === NUMBER_ITEMS_TO_EXPAND_FIRST && idx === 0

  const expandsFirstTwoTile =
    products === NUMBER_ITEMS_TO_EXPAND_FIRST_TWO && (idx === 0 || idx === 1)

  if (expandsFirstTile || expandsFirstTwoTile) {
    return 4 / 3
  }

  return 3 / 4
}

const ProductTiles = ({ products }: TilesProps) => {
  return (
    <Tiles>
      {products.map((product, idx) => (
        <Tile key={product.id}>
          <ProductCard
            data-testid="tile-card"
            product={product}
            index={idx + 1}
            variant="horizontal"
            aspectRatio={getRatio(products.length, idx)}
          />
        </Tile>
      ))}
    </Tiles>
  )
}

export default ProductTiles
