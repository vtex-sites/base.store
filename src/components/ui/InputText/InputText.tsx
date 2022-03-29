import React from 'react'
import { Input as UIInput, Label as UILabel } from '@faststore/ui'
import type { InputProps } from '@faststore/ui'

import './input-text.scss'

export type InputTextProps = {
  id: string
  label: string
  placeholder?: string
}

type Props = InputTextProps & InputProps

const InputText = ({
  id,
  label,
  type = 'text',
  variant,
  placeholder = ' ', // needed to style float label using `placeholder-shown`
  ...otherProps
}: Props) => {
  return (
    <div data-fs-input-text data-fs-input-text-variant={variant}>
      <UIInput type={type} id={id} placeholder={placeholder} {...otherProps} />
      <UILabel htmlFor={id}>{label}</UILabel>
    </div>
  )
}

export default InputText
