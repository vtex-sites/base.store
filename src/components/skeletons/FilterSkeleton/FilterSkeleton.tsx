import React from 'react'

import Shimmer from '../Shimmer'
import SkeletonElement from '../SkeletonElement'
import './filter-skeleton.scss'

interface Props {
  loading?: boolean
  children?: JSX.Element
}

function FilterSkeleton({ children, loading = true }: Props) {
  return loading ? (
    <div data-store-filter-skeleton>
      <SkeletonElement shimmer type="text" />

      <div data-filter-skeleton-content>
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <Shimmer />
      </div>
    </div>
  ) : (
    children ?? null
  )
}

export default FilterSkeleton
