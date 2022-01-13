import { Badge as UIBadge } from '@faststore/ui'
import type { ReactNode } from 'react'
import React from 'react'

import './badge.scss'

export type BadgeVariants = 'outOfStock' | 'new' | 'recommended'

type Props = {
  small?: boolean
  variant?: BadgeVariants
  children: ReactNode
}

const Badge = ({ small = false, variant, children }: Props) => {
  return (
    <UIBadge
      className="badge"
      data-store-badge={small ? 'small' : ''}
      data-store-badge-variant={variant}
    >
      {children}
    </UIBadge>
  )
}

export default Badge
