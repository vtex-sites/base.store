import React from 'react'

import Shimmer from '../Shimmer'
import ElementSkeleton from '../ElementSkeleton'
import './product-tile-skeleton.scss'

interface Props {
  tileIndex: number
  bordered?: boolean
  variant?: 'vertical' | 'horizontal'
}

const ProductTileSkeleton = ({
  tileIndex,
  bordered,
  variant = 'vertical',
}: Props) => {
  return (
    <div
      data-store-product-tile-skeleton
      data-tile-index={tileIndex}
      data-bordered={bordered}
      data-variant={variant}
    >
      <div data-product-tile-skeleton-image data-tile-index={tileIndex}>
        <ElementSkeleton type="image" />
      </div>
      <div data-product-tile-skeleton-content data-tile-index={tileIndex}>
        <div data-product-tile-skeleton-text data-tile-index={tileIndex}>
          <ElementSkeleton type="text" />
          <div data-product-tile-skeleton-price>
            <ElementSkeleton type="text" data-product-tile-skeleton-price />
          </div>
        </div>

        <div data-product-tile-skeleton-badge data-tile-index={tileIndex}>
          <ElementSkeleton type="badge" />
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default ProductTileSkeleton
