import React from 'react'

import Shimmer from '../Shimmer'

import './skeleton-element.scss'

type ElementVariant = 'text' | 'button' | 'image' | 'badge'

interface Props {
  shimmer?: boolean
  type: ElementVariant
}

function SkeletonElement({ type, shimmer = false }: Props) {
  return (
    <div data-store-skeleton-element data-shimmer={shimmer}>
      <div data-skeleton-element-content data-element-variant={type} />
      {shimmer && <Shimmer />}
    </div>
  )
}

export default SkeletonElement
