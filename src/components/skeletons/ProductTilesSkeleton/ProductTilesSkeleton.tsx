import React from 'react'
import type { PropsWithChildren } from 'react'
import Tiles, { Tile } from 'src/components/ui/Tiles'

import ProductTileSkeleton from './ProductTileSkeleton'

// TODO: // Replace it when items number be dinamically defined
const DEFAULT_ITEMS_NUMBER = 3

interface Props {
  loading?: boolean
  variant?: 'vertical' | 'horizontal'
}

function ProductTilesSkeleton({
  children,
  loading = true,
  variant = 'vertical',
}: PropsWithChildren<Props>) {
  return loading ? (
    <Tiles>
      {Array.from({ length: DEFAULT_ITEMS_NUMBER }, (_, index) => (
        <Tile key={String(index)}>
          <ProductTileSkeleton tileIndex={index + 1} variant={variant} />
        </Tile>
      ))}
    </Tiles>
  ) : (
    <>{children}</>
  )
}

export default ProductTilesSkeleton
