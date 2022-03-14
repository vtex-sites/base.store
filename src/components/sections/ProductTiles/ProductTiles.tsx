import React from 'react'
import Tiles, { Tile } from 'src/components/ui/Tiles'
import ProductCard from 'src/components/product/ProductCard'
import ProductTilesSkeleton from 'src/components/skeletons/ProductTilesSkeleton'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import Section from '../Section'

interface TilesProps {
  products: ProductSummary_ProductFragment[]
  title: string | JSX.Element
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

const ProductTiles = ({ products, title }: TilesProps) => {
  return (
    <Section className="grid-section grid-content">
      <h2 className="title-section">{title}</h2>
      <div className="page__section-content">
        <ProductTilesSkeleton
          variant="horizontal"
          loading={products.length === 0}
        >
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
        </ProductTilesSkeleton>
      </div>
    </Section>
  )
}

export default ProductTiles
