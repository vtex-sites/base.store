import React from 'react'
import CartToggle from 'src/components/cart/CartToggle'

import Navlinks from '../Navlinks'
import SearchInput from '../SearchInput'

function Navbar() {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-primary-400">
      <Navlinks />
      <SearchInput />
      <CartToggle />
    </header>
  )
}

export default Navbar
