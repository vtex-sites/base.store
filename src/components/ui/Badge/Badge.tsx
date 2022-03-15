import { Badge as UIBadge } from '@faststore/ui'
import type { ReactNode } from 'react'
import React from 'react'
import cn from 'classnames'

import * as style from './badge.module.scss'

export type BadgeVariants = 'info' | 'highlighted' | 'neutral'

type Props = {
  small?: boolean
  variant?: BadgeVariants
  children: ReactNode
  className?: string
}

const Badge = ({
  small = false,
  variant,
  children,
  className,
  ...otherProps
}: Props) => {
  return (
    <UIBadge
      className={cn(style.container, className, {
        [style.info]: variant === 'info',
        [style.highlighted]: variant === 'highlighted',
        [style.neutral]: variant === 'neutral',
        [style.small]: small,
      })}
      {...otherProps}
    >
      {children}
    </UIBadge>
  )
}

export default Badge
