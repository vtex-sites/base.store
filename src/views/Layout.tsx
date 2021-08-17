import React, { lazy, Suspense, SuspenseList } from 'react'
import type { PropsWithChildren } from 'react'

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

function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <SuspenseList revealOrder="together">
      <Suspense fallback={<div>Suspense!</div>}>
        <Navbar />
      </Suspense>
      <Suspense fallback={<div>Suspense!</div>}>{children}</Suspense>
      <Suspense fallback={<div>Suspense!</div>}>
        <Footer />
      </Suspense>
    </SuspenseList>
  )
}

export default Layout
