import React from 'react'
import { Button as UIButton } from '@faststore/ui'
import type { ButtonProps } from '@faststore/ui'

import './buttons.scss'

type Props = ButtonProps

function Button(props: Props) {
  return <UIButton className="button" {...props} />
}

export default Button
