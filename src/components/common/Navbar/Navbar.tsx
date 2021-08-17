import React from 'react'

import Navlinks from '../Navlinks'

if (typeof window !== 'undefined') {
  performance.mark('Navbar beeing evaluated')
}

function Navbar() {
  return (
    <header>
      <Navlinks />
    </header>
  )
}

export default Navbar
