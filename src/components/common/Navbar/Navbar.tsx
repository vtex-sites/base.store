import React from 'react'
import CartToggle from 'src/components/cart/CartToggle'

import Navlinks from '../Navlinks'
import SearchInput from '../SearchInput'

function Navbar() {
  return (
    <header>
      <Navlinks />
      <SearchInput />
      <CartToggle />
    </header>
  )
}

export default Navbar
