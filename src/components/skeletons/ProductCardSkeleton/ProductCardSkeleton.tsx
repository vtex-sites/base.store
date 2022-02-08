import React from 'react'

import Shimmer from '../Shimmer'
import ElementSkeleton from '../ElementSkeleton'
import './product-card-skeleton.scss'

interface Props {
  bordered?: boolean
  showActions?: boolean
  variant?: 'vertical' | 'horizontal'
}

const ProductCardSkeleton = ({
  bordered,
  showActions = false,
  variant = 'vertical',
}: Props) => {
  return (
    <div
      data-store-product-card-skeleton
      data-bordered={bordered}
      data-variant={variant}
    >
      <div>
        <ElementSkeleton type="image" />
      </div>
      <div data-product-card-skeleton-content>
        <ElementSkeleton type="text" />
        <ElementSkeleton type="text" />
        <ElementSkeleton type="badge" />
        {showActions && <ElementSkeleton type="button" />}
      </div>
      <Shimmer />
    </div>
  )
}

export default ProductCardSkeleton
