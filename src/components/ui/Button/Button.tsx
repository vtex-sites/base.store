import type { ReactNode } from 'react'
import React from 'react'
import { Button as UIButton, Icon as UIIcon } from '@faststore/ui'
import type { ButtonProps } from '@faststore/ui'

import './buttons.scss'

type Variant = 'primary' | 'secondary'

type Props = ButtonProps & {
  variant?: Variant
  inverse?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

function Button({
  variant,
  inverse,
  iconLeft,
  iconRight,
  children,
  ...props
}: Props) {
  return (
    <UIButton
      className="button"
      data-button-variant={variant}
      data-button-inverse={inverse}
      {...props}
    >
      {iconLeft && <UIIcon component={iconLeft} />}
      {children}
      {iconRight && <UIIcon component={iconRight} />}
    </UIButton>
  )
}

export default Button
