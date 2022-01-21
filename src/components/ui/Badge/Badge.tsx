import { Badge as UIBadge } from '@faststore/ui'
import React from 'react'

import './badge.scss'

export type Variant = 'success' | 'highlighted' | 'info' | 'neutral'

type Props = {
  variant?: Variant
  small?: boolean
  children: string
}

const Badge = ({ variant, children, small = false }: Props) => {
  return (
    <UIBadge
      data-store-badge-variant={variant}
      data-store-badge={small ? 'small' : ''}
    >
      {children}
    </UIBadge>
  )
}

export default Badge
