import React from 'react'
import { Input as UIInput, Label as UILabel } from '@faststore/ui'
import type { InputProps } from '@faststore/ui'
import Button from 'src/components/ui/Button'

import './input-text.scss'

export type InputTextProps = {
  id: string
  label: string
  errorMessage?: string
  buttonActionLabel?: string
  actionable?: boolean
}

type Props = InputTextProps & InputProps

const InputText = ({
  id,
  label,
  type = 'text',
  errorMessage,
  actionable = true,
  buttonActionLabel = 'Apply',
  // buttonIcon,
  placeholder = ' ', // needed to style float label using `placeholder-shown`
  ...otherProps
}: Props) => {
  return (
    <div
      data-fs-input-text
      data-fs-input-text-error={!!errorMessage}
      data-fs-input-text-actionable={actionable}
    >
      <UIInput type={type} id={id} placeholder={placeholder} {...otherProps} />
      <UILabel htmlFor={id}>{label}</UILabel>

      {actionable && (
        <Button variant="tertiary" data-fs-input-text-button>
          {buttonActionLabel}
        </Button>
      )}
      {errorMessage && <span data-fs-input-text-message>{errorMessage}</span>}
    </div>
  )
}

export default InputText
