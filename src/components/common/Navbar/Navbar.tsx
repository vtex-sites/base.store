import './navbar.scss'

import React from 'react'
import { Link } from 'gatsby'
import CartToggle from 'src/components/cart/CartToggle'
import Logo from 'src/components/ui/Logo'

import Navlinks from '../Navlinks'
import SearchInput from '../SearchInput'

function Navbar() {
  return (
    <header className="navbar grid-content">
      <div className="navbar__header">
        <Navlinks />
        <Link to="/">
          <Logo />
        </Link>
        <CartToggle />
        <SearchInput />
      </div>
    </header>
  )
}

export default Navbar
