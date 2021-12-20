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
