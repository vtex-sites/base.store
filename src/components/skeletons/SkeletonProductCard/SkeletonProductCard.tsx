import React from 'react'

import Shimmer from '../Shimmer'
import SkeletonElement from '../SkeletonElement'
import './skeleton-product-card.scss'

interface Props {
  bordered?: boolean
  sectioned?: boolean
  showActions?: boolean
  variant?: 'vertical' | 'horizontal'
}

const SkeletonProductCard = ({
  bordered,
  sectioned = false,
  showActions = false,
  variant = 'vertical',
}: Props) => {
  return (
    <div
      data-store-skeleton-product-card
      data-bordered={bordered}
      data-variant={variant}
    >
      <div data-skeleton-product-card-image data-sectioned={sectioned}>
        <SkeletonElement type="image" />
      </div>
      <div data-skeleton-product-card-content>
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="badge" />
        {showActions && <SkeletonElement type="button" />}
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonProductCard
