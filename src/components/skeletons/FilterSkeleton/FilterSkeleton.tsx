import React from 'react'

import Shimmer from '../Shimmer'
import ElementSkeleton from '../ElementSkeleton'
import './filter-skeleton.scss'

function FilterSkeleton() {
  return (
    <div data-store-filter-skeleton>
      <ElementSkeleton shimmer type="text" />

      <div data-filter-skeleton-content>
        <ElementSkeleton type="text" />
        <ElementSkeleton type="text" />
        <ElementSkeleton type="text" />
        <Shimmer />
      </div>
    </div>
  )
}

export default FilterSkeleton
