import type { ReactNode, MouseEvent } from 'react'
import React from 'react'
import { Alert as UIAlert, Icon as UIIcon } from '@faststore/ui'
import type { AlertProps } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import { X } from 'phosphor-react'

import './alert.scss'

type Props = AlertProps & {
  icon?: ReactNode
  dismissible?: boolean
  onClose?: (event: MouseEvent<HTMLElement>) => void
}

function Alert({ children, icon, dismissible, onClose, ...otherProps }: Props) {
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented) {
      return
    }

    event.stopPropagation()
    onClose?.(event)
  }

  return (
    <UIAlert {...otherProps}>
      {icon && <UIIcon component={icon} />}

      {children}

      {dismissible && (
        <Button data-alert-button aria-label="Close" onClick={handleClose}>
          <X size={18} />
        </Button>
      )}
    </UIAlert>
  )
}

export default Alert
