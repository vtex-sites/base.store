import React from 'react'
import Shimmer from 'src/components/skeletons/Shimmer'
import SkeletonElement from 'src/components/skeletons/SkeletonElement'
import './skeleton-product-tile.scss'

interface Props {
  tileIndex: number
  bordered?: boolean
  variant?: 'vertical' | 'horizontal'
}

const SkeletonProductTile = ({
  tileIndex,
  bordered,
  variant = 'vertical',
}: Props) => {
  return (
    <div
      data-store-skeleton-product-tile
      data-tile-index={tileIndex}
      data-bordered={bordered}
      data-variant={variant}
    >
      <div data-skeleton-product-tile-image data-tile-index={tileIndex}>
        <SkeletonElement type="image" />
      </div>
      <div data-skeleton-product-tile-content data-tile-index={tileIndex}>
        <div data-skeleton-product-tile-text data-tile-index={tileIndex}>
          <SkeletonElement type="text" />
          <div data-skeleton-product-tile-price>
            <SkeletonElement type="text" data-skeleton-product-tile-price />
          </div>
        </div>

        <div data-skeleton-product-tile-badge data-tile-index={tileIndex}>
          <SkeletonElement type="badge" />
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonProductTile
