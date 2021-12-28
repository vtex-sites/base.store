import React from 'react'
import { Link } from 'gatsby'
import CartToggle from 'src/components/cart/CartToggle'
import Logo from 'src/components/ui/Logo'

import Navlinks from '../Navlinks'
import SearchInput from '../SearchInput'

import './navbar.scss'

function Navbar() {
  return (
    <header className="navbar grid-content">
      <div className="navbar__header">
        <Link
          to="/"
          aria-label="Go to Faststore home"
          title="Go to Faststore home"
          className="navbar__logo"
        >
          <Logo />
        </Link>
        <CartToggle />
        <SearchInput />
      </div>
      <div>
        <Navlinks />
      </div>
    </header>
  )
}

export default Navbar
