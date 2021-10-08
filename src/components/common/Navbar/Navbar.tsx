import React from 'react'
import { SearchInput } from '@vtex/store-ui'
import CartToggle from 'src/components/cart/CartToggle'

import { search } from '../../../sdk/search/utils/search'
import Navlinks from '../Navlinks'

function Navbar() {
  return (
    <header className="flex justify-between items-center h-12 bg-primary-400">
      <Navlinks />
      <SearchInput onSubmit={(searchTerm) => search(searchTerm)} />
      <CartToggle />
    </header>
  )
}

export default Navbar
