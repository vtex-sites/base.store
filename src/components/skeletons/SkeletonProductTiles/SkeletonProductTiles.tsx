import React from 'react'
import type { PropsWithChildren } from 'react'
import Tiles, { Tile } from 'src/components/ui/Tiles'

import SkeletonProductTile from './SkeletonProductTile'

interface Props {
  loading?: boolean
  variant?: 'vertical' | 'horizontal'
}

function SkeletonProductTiles({
  children,
  loading = true,
  variant = 'vertical',
}: PropsWithChildren<Props>) {
  return loading ? (
    <Tiles>
      {Array.from({ length: 3 }, (_, index) => (
        <Tile key={String(index)}>
          <SkeletonProductTile tileIndex={index + 1} variant={variant} />
        </Tile>
      ))}
    </Tiles>
  ) : (
    <>{children}</>
  )
}

export default SkeletonProductTiles
