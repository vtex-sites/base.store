import React, { useState } from 'react'
import { Input, Button } from '@faststore/ui'

interface OutOfStockProps {
  buttonTxt?: string
  notificationMsg?: string
  title?: string
  onSubmit: (value: string) => void
}

function OutOfStock(props: OutOfStockProps) {
  const {
    title = 'Out of Stock',
    notificationMsg = 'Notify me when available',
    buttonTxt = 'Send',
    onSubmit,
  } = props

  const [email, setEmail] = useState('')

  return (
    <>
      {/* TODO: This component seems to fit in Aria live Regions, this is just a reminder to handle this in the future
      https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions */}
      <p>{title}</p>
      {/* TODO Add icon here */}
      <p>{notificationMsg}</p>
      <Input
        aria-label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Button onClick={() => onSubmit(email)}>{buttonTxt}</Button>
      {/* TODO: Display success alert if onSubmit succeed */}
    </>
  )
}

export default OutOfStock
