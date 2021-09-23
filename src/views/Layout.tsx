import React, { lazy, Suspense } from 'react'
import Header from 'src/components/common/Header'
import Footer from 'src/components/common/Footer'
import Navbar from 'src/components/common/Navbar'
import { useCartNotificationEffect } from 'src/sdk/cart/useCartNotificationEffect'
import { useUI } from 'src/sdk/ui'
import type { PropsWithChildren } from 'react'
import { SearchInput } from '@vtex/store-ui'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))
const Toast = lazy(() => import('src/components/ui/Toast'))

const style = {
  main: { minHeight: '100vh' },
}

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart, toasts } = useUI()

  useCartNotificationEffect()

  return (
    <>
      <Header>
        <Navbar />
        <SearchInput onSubmit={() => ''} />
      </Header>

      <main style={style.main}>{children}</main>
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
