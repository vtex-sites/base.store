import './styles/fonts.css'

import { BellRinging as BellRingingIcon } from 'phosphor-react'
import React, { lazy, Suspense, useState } from 'react'
import Footer from 'src/components/common/Footer'
import Navbar from 'src/components/common/Navbar'
import { useCartNotificationEffect } from 'src/sdk/cart/useCartNotificationEffect'
import { useUI } from 'src/sdk/ui'
import type { PropsWithChildren } from 'react'

import Alert from './components/ui/Alert'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))
const Toast = lazy(() => import('src/components/ui/Toast'))

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart, toasts } = useUI()

  const isBrowser = typeof window !== 'undefined'
  const [showAlert, setShowAlert] = useState<boolean>(() => {
    return (
      (isBrowser && !window?.localStorage.getItem('dismissed-alert-ALERTID')) ||
      true
    )
  })

  const onAlertClose = () => {
    setShowAlert(false)

    if (isBrowser) {
      window?.localStorage.setItem('dismissed-alert-ALERTID', 'true')
    }
  }

  useCartNotificationEffect()

  return (
    <div id="layout">
      {showAlert && (
        <Alert
          icon={<BellRingingIcon size={24} />}
          dismissible
          onClose={onAlertClose}
        >
          Get 10% off today:&nbsp;<span>NEW10</span>
        </Alert>
      )}

      <Navbar />

      <main>{children}</main>

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
    </div>
  )
}

export default Layout
