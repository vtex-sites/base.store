import React from 'react'

import Shimmer from '../Shimmer'
import SkeletonElement from '../SkeletonElement'
import './skeleton-filter.scss'

interface Props {
  loading?: boolean
  children?: JSX.Element
}

function SkeletonFilter({ children, loading = true }: Props) {
  return loading ? (
    <div data-store-skeleton-filter>
      <SkeletonElement shimmer type="text" />

      <div data-skeleton-filter-content>
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

export default SkeletonFilter
