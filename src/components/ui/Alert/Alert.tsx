import type { ReactNode, MouseEvent } from 'react'
import React, { useCallback } from 'react'
import { Alert as UIAlert, Icon as UIIcon } from '@faststore/ui'
import type { AlertProps } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import { Link } from 'gatsby'
import IconSVG from 'src/components/common/IconSVG'

import './alert.scss'

type Props = AlertProps & {
  icon?: ReactNode
  dismissible?: boolean
  link?: {
    to: string
    text: string
  }
  onClose?: (event: MouseEvent<HTMLElement>) => void
}

function Alert({
  children,
  icon,
  dismissible,
  link,
  onClose,
  ...otherProps
}: Props) {
  const handleClose = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (event.defaultPrevented) {
        return
      }

      onClose?.(event)
    },
    [onClose]
  )

  return (
    <UIAlert {...otherProps}>
      {icon && <UIIcon component={icon} />}

      <div data-alert-content>{children}</div>

      {link && (
        <div data-alert-link>
          <Link to={link.to}>{link.text}</Link>
        </div>
      )}

      {dismissible && (
        <Button data-alert-button aria-label="Close" onClick={handleClose}>
          <IconSVG name="X" width={18} height={18} weight="bold" />
        </Button>
      )}
    </UIAlert>
  )
}

export default Alert
