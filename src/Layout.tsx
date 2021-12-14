import React, { useEffect, useState, lazy, Suspense } from 'react'
import Footer from 'src/components/common/Footer'
import Navbar from 'src/components/common/Navbar'
import { useCartNotificationEffect } from 'src/sdk/cart/useCartNotificationEffect'
import { useUI } from 'src/sdk/ui'
import type { PropsWithChildren } from 'react'
import { useLocation } from '@reach/router'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))
const Toast = lazy(() => import('src/components/ui/Toast'))

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart, toasts } = useUI()

  useCartNotificationEffect()

  // Temporary added condition for pattern library page
  /* FIXME Remove this after removing pattern library page (line 19 - 33) */
  const [hasMounted, setHasMounted] = useState(false)

  const windowGlobal = typeof window !== 'undefined' && window
  const location = useLocation()
  const path = hasMounted ? location : ''

  useEffect(() => {
    if (windowGlobal) {
      setHasMounted(true)
    }
  }, [windowGlobal])

  if (path !== '' && path.pathname.includes('/pattern-library')) {
    return <>{children}</>
  }

  return (
    <>
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
    </>
  )
}

export default Layout
