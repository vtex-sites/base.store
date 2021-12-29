import React, { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from 'src/components/common/Footer'
import Navbar from 'src/components/common/Navbar'
import { useCartNotificationEffect } from 'src/sdk/cart/useCartNotificationEffect'
import { useUI } from 'src/sdk/ui'
import type { PropsWithChildren } from 'react'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))
const Toast = lazy(() => import('src/components/ui/Toast'))

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart, toasts } = useUI()

  useCartNotificationEffect()

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://storecomponents.vtexassets.com" />
      </Helmet>
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
