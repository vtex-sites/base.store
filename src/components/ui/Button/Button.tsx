import React from 'react'
import { Button as UIButton } from '@faststore/ui'
import type { ButtonProps } from '@faststore/ui'

type Props = ButtonProps

function Button(props: Props) {
  return <UIButton {...props} />
}

export default Button
