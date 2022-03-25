import React from 'react'
import { Input as UIInput, Label as UILabel } from '@faststore/ui'
import type { InputProps } from '@faststore/ui'

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
  placeholder,
  ...otherProps
}: Props) => {
  return (
    <div>
      <UIInput type={type} id={id} placeholder={placeholder} {...otherProps} />
      <UILabel htmlFor={id}>{label}</UILabel>
    </div>
  )
}

export default InputText
