import { useSession } from '@faststore/sdk'
import { Input as UIInput, Label as UILabel } from '@faststore/ui'
import React, { useRef } from 'react'
import type { KeyboardEvent } from 'react'

import './postal-code-input.scss'

const POSTAL_CODE_INPUT_ID = 'postal-code-input'

export default function PostalCodeInput() {
  const ref = useRef<HTMLInputElement>(null)
  const { postalCode } = useSession()

  const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    const value = ref.current?.value

    if (event.key === 'Enter' && typeof value === 'string') {
      // setSession({ postalCode: value })
    }
  }

  return (
    <div className="postal-code-input">
      <UILabel htmlFor={POSTAL_CODE_INPUT_ID}>Postal Code: </UILabel>
      <UIInput
        id={POSTAL_CODE_INPUT_ID}
        ref={ref}
        onKeyDown={handleSubmit}
        defaultValue={postalCode ?? ''}
      />
    </div>
  )
}
