import { Icon as UIIcon, Link as UILink } from '@faststore/ui'
import { Link as GatsbyLink } from 'gatsby'
import { useRef } from 'react'
import type { LinkProps } from '@faststore/ui'
import type { FocusEvent } from 'react'

import type { UIButtonProps } from './Button'

type Props = {
  disabled?: boolean
} & UIButtonProps &
  LinkProps<typeof GatsbyLink>

function LinkButton({
  variant = 'primary',
  inverse,
  icon,
  iconPosition,
  children,
  disabled = false,
  className = '',
  ...otherProps
}: Props) {
  const linkRef = useRef<HTMLAnchorElement | null>(null)

  return (
    <UILink
      as={GatsbyLink}
      innerRef={linkRef}
      data-store-button
      className={`link-button ${className}`}
      data-button-variant={variant}
      data-button-inverse={inverse}
      data-button-disabled={disabled}
      onFocus={(e: FocusEvent) => {
        e.preventDefault()

        if (disabled) {
          linkRef.current?.blur()
        }
      }}
      {...otherProps}
    >
      {iconPosition === 'left' && <UIIcon component={icon} />}
      {children}
      {iconPosition === 'right' && <UIIcon component={icon} />}
    </UILink>
  )
}

export default LinkButton
