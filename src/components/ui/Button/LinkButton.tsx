import type { AnchorHTMLAttributes, ReactNode } from 'react'
import React from 'react'
import { Icon as UIIcon, Link } from '@faststore/ui'

import './buttons.scss'

type Variant = 'primary' | 'secondary'
type IconPosition = 'left' | 'right'

type Props = {
  variant?: Variant
  inverse?: boolean
  icon?: ReactNode
  iconPosition?: IconPosition
  disabled?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

function LinkButton({
  variant,
  inverse,
  icon,
  iconPosition,
  children,
  disabled = false,
  className,
  ...otherProps
}: Props) {
  return (
    <Link
      data-store-button
      className={`button ${className}`}
      data-button-variant={variant}
      data-button-inverse={inverse}
      data-button-disabled={disabled}
      {...otherProps}
    >
      {iconPosition === 'left' && <UIIcon component={icon} />}
      {children}
      {iconPosition === 'right' && <UIIcon component={icon} />}
    </Link>
  )
}

export default LinkButton
