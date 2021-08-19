import React, { lazy, Suspense, SuspenseList } from 'react'
import type { PropsWithChildren } from 'react'
import { useGlobalUIState } from '@vtex/store-sdk'

const Navbar = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      'src/components/common/Navbar'
    )
)

const Footer = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      'src/components/common/Footer'
    )
)

const CartSidebar = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      'src/components/cart/CartSidebar'
    )
)

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart } = useGlobalUIState()

  return (
    <SuspenseList revealOrder="together">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <Suspense fallback={null}>
        <main>{children}</main>
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>{displayMinicart && <CartSidebar />}</Suspense>
    </SuspenseList>
  )
}

export default Layout
