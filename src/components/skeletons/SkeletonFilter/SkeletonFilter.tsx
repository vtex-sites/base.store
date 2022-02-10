import React from 'react'

import Shimmer from '../Shimmer'
import SkeletonElement from '../SkeletonElement'
import './skeleton-filter.scss'

function SkeletonFilter() {
  return (
    <div data-store-skeleton-filter>
      <SkeletonElement shimmer type="text" />

      <div data-skeleton-filter-content>
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <Shimmer />
      </div>
    </div>
  )
}

export default SkeletonFilter
