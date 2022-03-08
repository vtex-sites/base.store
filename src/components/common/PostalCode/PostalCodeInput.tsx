import { useStorage } from '@faststore/sdk'
import { Input as UIInput, Label as UILabel } from '@faststore/ui'
import React, { useRef } from 'react'
import type { KeyboardEvent } from 'react'

import './postal-code-input.scss'

const POSTAL_CODE_STORAGE_KEY = 'main::store::postalCode'
const POSTAL_CODE_INPUT_ID = 'postal-code-input'

export default function PostalCodeInput() {
  const [code, setPostalCode] = useStorage<string>(POSTAL_CODE_STORAGE_KEY, '')
  const ref = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    const val = ref.current?.value

    if (event.key === 'Enter' && typeof val === 'string') {
      setPostalCode(val)
    }
  }

  return (
    <div className="postal-code-input">
      <UILabel htmlFor={POSTAL_CODE_INPUT_ID}>Postal Code: </UILabel>
      <UIInput
        id={POSTAL_CODE_INPUT_ID}
        ref={ref}
        onKeyDown={handleSubmit}
        defaultValue={code}
      />
    </div>
  )
}
