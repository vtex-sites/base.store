import React from 'react'
import { SearchInput } from '@vtex/store-ui'
import CartToggle from 'src/components/cart/CartToggle'

import { search } from '../../../sdk/search/utils/search'
import Navlinks from '../Navlinks'

const styles = {
  header: {
    width: '100vw',
    height: '50px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

function Navbar() {
  return (
    <header style={styles.header}>
      <Navlinks />
      <SearchInput onSubmit={(searchTerm) => search(searchTerm)} />
      <CartToggle />
    </header>
  )
}

export default Navbar
