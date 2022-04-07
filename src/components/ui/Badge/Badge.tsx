import { Badge as UIBadge } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'
import type { ReactNode } from 'react'

export type BadgeVariants = 'info' | 'highlighted' | 'success'

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
      data-fs-badge={small ? 'small' : ''}
      data-fs-badge-variant={variant}
      data-fs-badge-interactive={interactive}
      {...otherProps}
    >
      {interactive && (
        <Button
          data-fs-badge-button="true"
          onClick={onClose}
          icon={<Icon name="X" width={18} height={18} weight="bold" />}
          iconPosition="left"
        />
      )}
      <div data-fs-badge-wrapper>
        <span>{children}</span>
      </div>
    </UIBadge>
  )
}

export default Badge
