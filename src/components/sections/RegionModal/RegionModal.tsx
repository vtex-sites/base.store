import React, { useState } from 'react'
import { Modal } from '@faststore/ui'
import { useSession } from '@faststore/sdk'

interface Props {
  isOpen: boolean
  onSuccess: () => void
}

function RegionModal({ isOpen = false, onSuccess = () => {} }: Props) {
  const [postalCode, setPostalCode] = useState<string>('')

  const { setSession, ...session } = useSession()

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()

    const response = await fetch(
      `/api/region?country=BRA&postalCode=${postalCode.replace('-', '')}`
    )

    const [data] = JSON.parse(await response.json())

    if (data.sellers.length) {
      setSession({ ...session, region: data.sellers[0].id, postalCode })
      onSuccess()
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} aria-label="Postal Code modal">
        <form
          onSubmit={(event) => {
            handleFormSubmit(event)
          }}
        >
          <label htmlFor="postal-code">Please enter your postal code</label>
          <input
            id="postal-code"
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input type="submit" value="Set Postal Code" />
        </form>
      </Modal>
    </>
  )
}

export default RegionModal
