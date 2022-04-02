import { Button as UIButton, Icon as UIIcon } from '@faststore/ui'
import React from 'react'
import type { ReactNode } from 'react'
import type { ButtonProps } from '@faststore/ui'

export type Variant = 'primary' | 'secondary' | 'tertiary'
export type IconPosition = 'left' | 'right'

export type UIButtonProps = {
  variant?: Variant
  inverse?: boolean
  icon?: ReactNode
  iconPosition?: IconPosition
}

type Props = ButtonProps & UIButtonProps

function Button({
  variant,
  inverse,
  icon,
  iconPosition,
  children,
  ...props
}: Props) {
  return (
    <UIButton
      data-fs-button
      data-fs-button-variant={variant}
      data-fs-button-inverse={inverse}
      {...props}
    >
      {iconPosition === 'left' && <UIIcon component={icon} />}
      {children}
      {iconPosition === 'right' && <UIIcon component={icon} />}
    </UIButton>
  )
}

export default Button
