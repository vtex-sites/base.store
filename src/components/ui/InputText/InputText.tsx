import React, { useState } from 'react'
import { Input as UIInput, Label as UILabel } from '@faststore/ui'
import type { InputProps } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import IconButton from 'src/components/ui/IconButton'
import Icon from 'src/components/ui/Icon'

import './input-text.scss'

export type InputTextProps = {
  id: string
  label: string
  errorMessage?: string
  buttonActionLabel?: string // max 9 char
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
  placeholder = ' ', // needed to style float label using `placeholder-shown`
  ...otherProps
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const showError = errorMessage && inputValue !== ''

  return (
    <div
      data-fs-input-text
      data-fs-input-text-error={showError}
      data-fs-input-text-actionable={actionable}
    >
      <UIInput
        type={type}
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onInput={(e) => setInputValue(e.currentTarget.value)}
        {...otherProps}
      />
      <UILabel htmlFor={id}>{label}</UILabel>

      {actionable &&
        inputValue !== '' &&
        (errorMessage ? (
          <IconButton
            data-fs-input-text-button
            aria-label="?"
            icon={<Icon name="XCircle" width={20} height={20} />}
          />
        ) : (
          <Button variant="tertiary" data-fs-input-text-button>
            {buttonActionLabel}
          </Button>
        ))}
      {showError && <span data-fs-input-text-message>{errorMessage}</span>}
    </div>
  )
}

export default InputText
