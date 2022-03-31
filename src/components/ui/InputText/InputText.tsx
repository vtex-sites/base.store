import React, { useState, useRef, useEffect } from 'react'
import { Input as UIInput, Label as UILabel } from '@faststore/ui'
import type { InputProps } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import IconButton from 'src/components/ui/IconButton'
import Icon from 'src/components/ui/Icon'

import './input-text.scss'

export type InputTextProps = {
  /**
   * ID to identify input and corresponding label.
   */
  id: string
  /**
   * The text displayed to identify input text.
   */
  label: string
  /**
   * The error message is displayed when an error occurs.
   */
  errorMessage?: string
}

type ActionableInputText =
  | {
      /**
       * Adds a Button to the component.
       */
      actionable: true
      /**
       * Callback function when button is clicked.
       */
      onSubmit: (value: string) => void
      /**
       * The text displayed on the Button. Suggestion: maximum 9 characters.
       */
      buttonActionText?: string
    }
  | {
      actionable?: false
      onSubmit?: never
      buttonActionText?: string
    }

type Props = InputTextProps & InputProps & ActionableInputText

const InputText = ({
  id,
  label,
  type = 'text',
  errorMessage,
  actionable,
  buttonActionText = 'Apply',
  onSubmit,
  placeholder = ' ', // initializes with an empty space to style float label using `placeholder-shown`
  ...otherProps
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<string | undefined>(
    errorMessage ?? undefined
  )

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    errorMessage && setError(errorMessage)
  }, [errorMessage])

  const onClear = () => {
    setInputValue('')
    inputRef.current?.focus()
  }

  return (
    <div
      data-fs-input-text
      data-fs-input-text-error={error && inputValue !== ''}
      data-fs-input-text-actionable={actionable}
    >
      <UIInput
        type={type}
        id={id}
        ref={inputRef}
        placeholder={placeholder}
        value={inputValue}
        onInput={(e) => {
          error && setError(undefined)
          setInputValue(e.currentTarget.value)
        }}
        {...otherProps}
      />
      <UILabel htmlFor={id}>{label}</UILabel>

      {actionable &&
        inputValue !== '' &&
        (error ? (
          <IconButton
            data-fs-input-text-button
            aria-label="Clear Field"
            icon={<Icon name="XCircle" width={20} height={20} />}
            onClick={onClear}
          />
        ) : (
          <Button
            data-fs-input-text-button
            variant="tertiary"
            onClick={() => onSubmit(inputValue)}
          >
            {buttonActionText}
          </Button>
        ))}
      {error && inputValue !== '' && (
        <span data-fs-input-text-message>{error}</span>
      )}
    </div>
  )
}

export default InputText
