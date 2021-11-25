import React, { lazy, Suspense } from 'react'
import CartToggle from 'src/components/cart/CartToggle'
import Footer from 'src/components/common/Footer'
import Navbar from 'src/components/common/Navbar'
import SearchInput from 'src/components/common/SearchInput'
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
      <div className="bg-light h-10 leading-10 text-center">
        Get 10% off today: <span className="font-bold">NEW10</span>
      </div>

      <div className="container">
        <div className="grid grid-cols-3 gap-x-6">
          <div>Store Name or logo</div>
          <div>
            <SearchInput />
          </div>
          <div>
            <a href="/">Sign in</a>
            <CartToggle />
          </div>
        </div>
      </div>
      <Navbar />
      <main className="min-h-screen">{children}</main>
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
