import { Badge as UIBadge } from '@faststore/ui'
import type { ReactNode } from 'react'
import React from 'react'
import IconButton from 'src/components/ui/IconButton'
import Icon from 'src/components/ui/Icon'

import './badge.scss'

export type BadgeVariants = 'info' | 'highlighted' | 'neutral' | 'interactive'

type Props = {
  small?: boolean
  variant?: BadgeVariants
  children: ReactNode
  onClose?: () => void
}

const Badge = ({
  small = false,
  variant,
  children,
  onClose,
  ...otherProps
}: Props) => {
  return (
    <UIBadge
      className="badge"
      data-store-badge={small ? 'small' : ''}
      data-store-badge-variant={variant}
      {...otherProps}
    >
      <span>{children}</span>
      {variant === 'interactive' && (
        <IconButton
          onClick={onClose}
          aria-label="Remove badge"
          icon={
            <Icon
              name="X"
              weight="bold"
              width={small ? 12 : 16}
              height={small ? 12 : 16}
            />
          }
        />
      )}
    </UIBadge>
  )
}

export default Badge
