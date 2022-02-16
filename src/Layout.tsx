import './styles/fonts.css'

import loadable from '@loadable/component'
import React, { lazy, Suspense } from 'react'
import Alert from 'src/components/common/Alert'
import Toast from 'src/components/common/Toast'
import { useUI } from 'src/sdk/ui'
import type { PropsWithChildren } from 'react'

const Footer = loadable(() => import('src/components/common/Footer'), {
  ssr: true,
})

const Navbar = loadable(() => import('src/components/common/Navbar'), {
  ssr: true,
})

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart } = useUI()

  return (
    <div id="layout">
      <Alert>
        Get 10% off today:&nbsp;<span>NEW10</span>
      </Alert>

      <Navbar />

      <main>{children}</main>

      <Footer />

      <Toast />

      {displayMinicart && (
        <Suspense fallback={null}>
          <CartSidebar />
        </Suspense>
      )}
    </div>
  )
}

export default Layout
