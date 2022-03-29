import { Badge as UIBadge } from '@faststore/ui'
import type { ReactNode } from 'react'
import React from 'react'
import IconButton from 'src/components/ui/IconButton'
import Icon from 'src/components/ui/Icon'

import './badge.scss'

export type BadgeVariants = 'info' | 'highlighted' | 'neutral'

type InteractiveBadge =
  | {
      interactive: true
      onClose?: () => void
    }
  | {
      interactive?: false
      onClose?: never
    }

type Props = {
  small?: boolean
  variant?: BadgeVariants
  children: ReactNode
  onClose?: () => void
  interactive?: boolean
} & InteractiveBadge

const Badge = ({
  variant,
  children,
  onClose,
  small = false,
  interactive = false,
  ...otherProps
}: Props) => {
  return (
    <UIBadge
      className="badge"
      data-store-badge={small ? 'small' : ''}
      data-store-badge-variant={variant}
      data-store-badge-interactive={interactive}
      {...otherProps}
    >
      <span>{children}</span>
      {interactive && (
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
