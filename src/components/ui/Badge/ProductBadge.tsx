import React from 'react'

import type { BadgeVariants } from './Badge'
import Badge from './Badge'

import './badge.scss'

type Props = {
  variant: Exclude<BadgeVariants, 'discount'>
  small?: boolean
}

const BadgeLabel = {
  outOfStock: 'OUT OF STOCK',
  new: 'NEW',
  recommended: 'RECOMMENDED',
}

const ProductBadge = ({ small = false, variant }: Props) => {
  return (
    <Badge small={small} variant={variant}>
      {BadgeLabel[variant]}
    </Badge>
  )
}

export default ProductBadge
