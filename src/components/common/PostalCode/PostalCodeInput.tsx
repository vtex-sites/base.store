import React, { useState } from 'react'
import { Input as UIInput, Label as UILabel } from '@faststore/ui'
import type { ChangeEvent, KeyboardEvent } from 'react'
import useRegion from 'src/hooks/useRegion'
import './postal-code-input.scss'

const REGION_INPUT_ID = 'postal-code-input'

export default function PostalCodeInput() {
  const [postalCodeState, setPostalCodeState] = useState<string>('')
  const [, setPostalCode] = useRegion()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostalCodeState(event.target.value)
  }

  const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && Boolean(postalCodeState)) {
      setPostalCode(postalCodeState)
    }
  }

  return (
    <div className="postal-code-input">
      <UILabel htmlFor={REGION_INPUT_ID}>Postal Code: </UILabel>
      <UIInput
        id={REGION_INPUT_ID}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      />
    </div>
  )
}
