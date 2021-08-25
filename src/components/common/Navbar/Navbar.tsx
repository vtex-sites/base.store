import React from 'react'
import CartToggle from 'src/components/cart/CartToggle'

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
      <CartToggle />
    </header>
  )
}

export default Navbar
