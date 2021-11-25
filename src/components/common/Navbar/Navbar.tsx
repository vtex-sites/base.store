import React from 'react'

import Navlinks from '../Navlinks'

function Navbar() {
  return (
    <div className="border border-muted border-t-0 border-r-0 border-l-0">
      <header className="container">
        <Navlinks />
      </header>
    </div>
  )
}

export default Navbar
