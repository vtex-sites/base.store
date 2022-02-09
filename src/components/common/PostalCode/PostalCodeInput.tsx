import React, { useState } from 'react'
import { Input as UIInput, Label as UILabel } from '@faststore/ui'
import type { ChangeEvent, KeyboardEvent } from 'react'
import useRegion from 'src/hooks/useRegion'

const REGION_INPUT_ID = 'postal-code-input'

export default function PostalCodeInput() {
  const [postalCode, setPostalCodeState] = useState<string>('')
  const [, setPostalCode] = useRegion()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostalCodeState(event.target.value)
  }

  const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && Boolean(postalCode)) {
      setPostalCode(postalCode)
    }
  }

  return (
    <>
      <UILabel htmlFor={REGION_INPUT_ID}>Postal Code: </UILabel>
      <UIInput
        id={REGION_INPUT_ID}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      />
    </>
  )
}
