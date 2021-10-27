import React from 'react'
import CartToggle from 'src/components/cart/CartToggle'

import Navlinks from '../Navlinks'
import SearchInput from '../SearchInput'
import { search } from '../../../sdk/search/utils/search'

function Navbar() {
  return (
    <header className="flex flex-col sm:flex-row p-2 sm:p-4 justify-between items-center bg-primary-400">
      <Navlinks />
      <SearchInput onSubmit={(searchTerm) => search(searchTerm)} />
      <CartToggle />
    </header>
  )
}

export default Navbar
