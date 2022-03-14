import { Badge as UIBadge } from '@faststore/ui'
import type { ReactNode } from 'react'
import React from 'react'

import './badge.scss'

export type BadgeVariants = 'info' | 'highlighted' | 'neutral'

type Props = {
  small?: boolean
  variant?: BadgeVariants
  children: ReactNode
}

const Badge = ({ small = false, variant, children, ...otherProps }: Props) => {
  return (
    <UIBadge
      className="badge"
      data-store-badge={small ? 'small' : ''}
      data-store-badge-variant={variant}
      {...otherProps}
    >
      {children}
    </UIBadge>
  )
}

export default Badge
