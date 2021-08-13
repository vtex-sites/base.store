import React from 'react'
import Navbar from 'src/components/common/Navbar'
import Footer from 'src/components/common/Footer'
import type { PropsWithChildren } from 'react'

function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
