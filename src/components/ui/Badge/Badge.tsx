import { Badge as UIBadge } from '@faststore/ui'
import React from 'react'

import './badge.scss'

export type Variant = 'success' | 'highlighted' | 'info' | 'neutral' | 'promo'

type Props = {
  variant?: Variant
  small?: boolean
  children: string
  classes?: string
}

const Badge = ({ variant, children, small = false, classes = '' }: Props) => {
  return (
    <UIBadge
      className={classes}
      data-store-badge-variant={variant}
      data-store-badge={small ? 'small' : ''}
    >
      {children}
    </UIBadge>
  )
}

export default Badge
