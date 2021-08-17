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
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <Suspense fallback={null}>
        <main>{children}</main>
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </SuspenseList>
  )
}

export default Layout
