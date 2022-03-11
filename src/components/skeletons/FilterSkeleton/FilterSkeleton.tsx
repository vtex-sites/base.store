import React from 'react'
import type { PropsWithChildren } from 'react'

import Shimmer from '../Shimmer'
import SkeletonElement from '../SkeletonElement'
import './filter-skeleton.scss'

interface Props {
  loading?: boolean
}

function FilterSkeleton({
  children,
  loading = true,
}: PropsWithChildren<Props>) {
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
    <>{children}</>
  )
}

export default FilterSkeleton
