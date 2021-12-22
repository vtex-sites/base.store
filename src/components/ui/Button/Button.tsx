import React from 'react'
import { Button as UIButton } from '@faststore/ui'
import type { ButtonProps } from '@faststore/ui'

import './buttons.scss'

type Variant = 'primary' | 'secondary'

type Props = ButtonProps & {
  variant?: Variant
}

function Button({ variant, ...props }: Props) {
  return (
    <UIButton className="button" data-button-variant={variant} {...props} />
  )
}

export default Button
