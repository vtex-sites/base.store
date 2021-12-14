import React, { useState } from 'react'
import { Input, Label, Button } from '@faststore/ui'

interface OutOfStockProps {
  buttonTxt?: string
  notificationMsg?: string
  title?: string
  visible: boolean
  onSubmit: (value: string) => void
}

function OutOfStock(props: OutOfStockProps) {
  const {
    title = 'Out of Stock',
    notificationMsg = 'Notify me when available',
    visible,
    buttonTxt = 'Send',
    onSubmit,
  } = props

  const [email, setEmail] = useState('')

  return (
    <>
      {visible && (
        <>
          <h1>{title}</h1>
          <Label>{notificationMsg}</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Button onClick={() => onSubmit(email)}>{buttonTxt}</Button>
        </>
      )}
    </>
  )
}

export default OutOfStock
