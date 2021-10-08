import React from 'react'
import { Button as UIButton } from '@vtex/store-ui'
import type { ButtonProps } from '@vtex/store-ui'

type Props = ButtonProps

function Button(props: Props) {
  return <UIButton {...props} />
}

export default Button
