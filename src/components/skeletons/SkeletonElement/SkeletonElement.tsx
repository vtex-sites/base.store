import React from 'react'

import Shimmer from '../Shimmer'

import './skeleton-element.scss'

type ElementVariant = 'text' | 'button' | 'image' | 'badge'

interface Props {
  loading?: boolean
  shimmer?: boolean
  type: ElementVariant
  children?: JSX.Element
}

function SkeletonElement({
  type,
  children,
  loading = true,
  shimmer = false,
}: Props) {
  return loading ? (
    <div data-store-skeleton-element data-shimmer={shimmer}>
      <div data-skeleton-element-content data-element-variant={type} />
      {shimmer && <Shimmer />}
    </div>
  ) : (
    children ?? null
  )
}

export default SkeletonElement
