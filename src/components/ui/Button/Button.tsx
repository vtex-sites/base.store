import type { ReactNode } from 'react'
import React from 'react'
import { Button as UIButton, Icon as UIIcon } from '@faststore/ui'
import type { ButtonProps } from '@faststore/ui'

import './buttons.scss'

export type Variant = 'primary' | 'secondary' | 'tertiary'
export type IconPosition = 'left' | 'right'
export type Size = 'small' | 'default'

export type UIButtonProps = {
  variant?: Variant
  size?: Size
  inverse?: boolean
  icon?: ReactNode
  iconPosition?: IconPosition
  classes?: string
}

type Props = ButtonProps & UIButtonProps

function Button({
  variant,
  size = 'default',
  inverse,
  icon,
  iconPosition,
  children,
  classes = '',
  ...props
}: Props) {
  return (
    <UIButton
      className={`button ${classes}`}
      data-button-size={size}
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
