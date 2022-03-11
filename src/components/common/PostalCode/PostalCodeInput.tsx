import React, { useState } from 'react'
import { Input as UIInput, Label as UILabel } from '@faststore/ui'
import type { ChangeEvent, KeyboardEvent } from 'react'
import usePostalCode from 'src/hooks/usePostalCode'
import './postal-code-input.scss'

const POSTAL_CODE_INPUT_ID = 'postal-code-input'

export default function PostalCodeInput() {
  const [localPostalCode, setLocalPostalCode] = useState<string>('')
  const [, setPostalCode] = usePostalCode()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalPostalCode(event.target.value)
  }

  const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && Boolean(localPostalCode)) {
      setPostalCode(localPostalCode)
    }
  }

  return (
    <div className="postal-code-input">
      <UILabel htmlFor={POSTAL_CODE_INPUT_ID}>Postal Code: </UILabel>
      <UIInput
        id={POSTAL_CODE_INPUT_ID}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      />
    </div>
  )
}
