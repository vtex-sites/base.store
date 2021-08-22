import React, { lazy, Suspense } from 'react'
import { useGlobalUIState } from '@vtex/store-sdk'
import Navbar from 'src/components/common/Navbar'
import Footer from 'src/components/common/Footer'
import type { PropsWithChildren } from 'react'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))

const style = {
  main: { minHeight: '80vh' },
}

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart } = useGlobalUIState()

  return (
    <>
      <Navbar />
      <main style={style.main}>{children}</main>
      <Footer />
      {displayMinicart && (
        <Suspense fallback={null}>
          <CartSidebar />
        </Suspense>
      )}
    </>
  )
}

export default Layout
