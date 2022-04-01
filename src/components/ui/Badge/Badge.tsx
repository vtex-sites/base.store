import { Badge as UIBadge } from '@faststore/ui'
import React from 'react'
import { ButtonIcon } from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'
import type { ReactNode } from 'react'

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
        <ButtonIcon
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
