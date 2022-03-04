import type { ReactNode } from 'react'
import React from 'react'
import { Button as UIButton, Icon as UIIcon } from '@faststore/ui'
import type { ButtonProps } from '@faststore/ui'

import './buttons.scss'

export type Variant = 'primary' | 'secondary' | 'tertiary'
export type IconPosition = 'left' | 'right'

export type UIButtonProps = ButtonProps & {
  variant?: Variant
  inverse?: boolean
  icon?: ReactNode
  iconPosition?: IconPosition
}

function Button({
  variant,
  inverse,
  icon,
  iconPosition,
  children,
  ...props
}: UIButtonProps) {
  return (
    <UIButton
      className="button"
      data-button-variant={variant}
      data-button-inverse={inverse}
      {...props}
    >
      {iconPosition === 'left' && <UIIcon component={icon} />}
      {children}
      {iconPosition === 'right' && <UIIcon component={icon} />}
    </UIButton>
  )
}

export default Button
