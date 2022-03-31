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
}

type ActionableInputText =
  | {
      actionable: true
      onSubmit?: () => void
      buttonActionLabel?: string // max 9 char
    }
  | {
      actionable?: false
      onSubmit?: never
      buttonActionLabel?: string // max 9 char
    }

type Props = InputTextProps & InputProps & ActionableInputText

const InputText = ({
  id,
  label,
  type = 'text',
  errorMessage = 'Error',
  actionable = true,
  buttonActionLabel = 'Apply',
  onSubmit,
  placeholder = ' ', // needed to style float label using `placeholder-shown`
  ...otherProps
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [messageError, setMessageError] = useState<string>(errorMessage)

  const onClear = () => {
    setInputValue('')
    setMessageError('')
  }

  return (
    <div
      data-fs-input-text
      data-fs-input-text-error={messageError && inputValue !== ''}
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
        (messageError ? (
          <IconButton
            data-fs-input-text-button
            aria-label="Clear Field"
            icon={<Icon name="XCircle" width={20} height={20} />}
            onClick={onClear}
          />
        ) : (
          <Button
            variant="tertiary"
            data-fs-input-text-button
            onClick={onSubmit}
          >
            {buttonActionLabel}
          </Button>
        ))}
      {messageError && inputValue !== '' && (
        <span data-fs-input-text-message>{messageError}</span>
      )}
    </div>
  )
}

export default InputText
