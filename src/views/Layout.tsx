import React, { lazy, Suspense, useState } from 'react'
import Footer from 'src/components/common/Footer'
import Navbar from 'src/components/common/Navbar'
import { useCartNotificationEffect } from 'src/sdk/cart/useCartNotificationEffect'
import { useUI } from 'src/sdk/ui'
import type { PropsWithChildren } from 'react'
import { Button, Checkbox, Form, Input, Label } from '@vtex/store-ui'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))
const Toast = lazy(() => import('src/components/ui/Toast'))

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart, toasts } = useUI()
  const [email, setEmail] = useState<string>()

  useCartNotificationEffect()

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
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
      </Form>
      <Footer />
      {displayMinicart && (
        <Suspense fallback={null}>
          <CartSidebar />
        </Suspense>
      )}
      {toasts.length > 0 && (
        <Suspense fallback={null}>
          <Toast />
        </Suspense>
      )}
    </>
  )
}

export default Layout
