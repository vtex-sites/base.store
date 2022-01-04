import React from 'react'
import type { LinkProps } from '@faststore/ui'
import { Icon as UIIcon, Link as UILink } from '@faststore/ui'

import type { UIButtonProps } from './Button'

import './buttons.scss'

type Props = {
  disabled?: boolean
} & UIButtonProps &
  LinkProps<'a'>

function LinkButton({
  variant,
  inverse,
  icon,
  iconPosition,
  children,
  disabled = false,
  className = '',
  ...otherProps
}: Props) {
  return (
    <UILink
      data-store-button
      className={`link-button ${className}`}
      data-button-variant={variant}
      data-button-inverse={inverse}
      data-button-disabled={disabled}
      {...otherProps}
    >
      {iconPosition === 'left' && <UIIcon component={icon} />}
      {children}
      {iconPosition === 'right' && <UIIcon component={icon} />}
    </UILink>
  )
}

export default LinkButton
