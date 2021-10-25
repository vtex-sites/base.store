import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Label } from '@vtex/store-ui'

function Footer() {
  const [email, setEmail] = useState<string>()

  return (
    <footer className="w-full h-32 bg-primary-400">
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          // eslint-disable-next-line no-alert
          alert(`Thank you for subscribing ${email}`)
        }}
      >
        <h1>Sign up & save 15% off your first order</h1>
        <h2>
          Be the first to hear about special offers, new product launches, gift
          ideas and more.
        </h2>
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div>
          <Label>
            <Checkbox required />I agree to receive emails from Brand. View our{' '}
            <a href="/">Privacy Policy</a>.
          </Label>
        </div>
        <Button type="submit">Subscribe</Button>
      </Form>{' '}
      ...Footer
    </footer>
  )
}

export default Footer
