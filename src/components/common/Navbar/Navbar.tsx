import React from 'react'
import CartToggle from 'src/components/cart/CartToggle'

import SearchInput from '../SearchInput'
import { search } from '../../../sdk/search/utils/search'
import Navlinks from '../Navlinks'

import './Navbar.module.css'

function Navbar() {
  return (
    <header data-store-navbar-header>
      <Navlinks />
      <SearchInput onSubmit={(searchTerm) => search(searchTerm)} />
      <CartToggle />
    </header>
  )
}

export default Navbar
