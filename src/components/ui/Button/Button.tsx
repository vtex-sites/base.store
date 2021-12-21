import React from 'react'
import { Button as UIButton } from '@faststore/ui'
import type { ButtonProps } from '@faststore/ui'

import './buttons.scss'

type Props = ButtonProps & {
  variant?: string
}

function Button({ variant = '', ...props }: Props) {
  return (
    <UIButton className="button" data-button-variant={variant} {...props} />
  )
}

export default Button
