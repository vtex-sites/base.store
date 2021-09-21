import React from 'react'
import CartToggle from 'src/components/cart/CartToggle'

import Navlinks from '../Navlinks'

function Navbar() {
  return (
    <header className="flex justify-between items-center h-12 bg-primary-400">
      <Navlinks />
      <CartToggle />
    </header>
  )
}

export default Navbar
