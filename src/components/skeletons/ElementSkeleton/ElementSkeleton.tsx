import React from 'react'

import Shimmer from '../Shimmer'

import './element-skeleton.scss'

type ElementVariant = 'text' | 'button' | 'image' | 'badge'

interface Props {
  shimmer?: boolean
  type: ElementVariant
}

function ElementSkeleton({ type, shimmer = false }: Props) {
  return (
    <div data-store-element-skeleton data-shimmer={shimmer}>
      <div data-element-skeleton data-element-variant={type} />
      {shimmer && <Shimmer />}
    </div>
  )
}

export default ElementSkeleton
