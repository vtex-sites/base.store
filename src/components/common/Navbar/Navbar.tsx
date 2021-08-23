import React from 'react'

import Navlinks from '../Navlinks'

const styles = {
  header: {
    width: '100vw',
    height: '50px',
    backgroundColor: '#f0f0f0',
  },
}

function Navbar() {
  return (
    <header style={styles.header}>
      <Navlinks />
    </header>
  )
}

export default Navbar
