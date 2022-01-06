import React, { useState } from 'react'
import { Link as LinkGatsby } from 'gatsby'
import CartToggle from 'src/components/cart/CartToggle'
import Logo from 'src/components/ui/Logo'
import Link from 'src/components/ui/Link'
import Button from 'src/components/ui/Button'
import { List as ListIcon, X as XIcon } from 'phosphor-react'
import SignInLink from 'src/components/ui/SignInLink'

import SearchInput from '../SearchInput'

import './navbar.scss'

const links = [
  {
    href: '/apparel-and-accessories',
    name: 'Apparel',
  },
  {
    href: '/office',
    name: 'Office',
  },
]

function Navbar() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="navbar grid-content-full">
      <div className="navbar__header grid-content">
        <section className="navbar__row">
          <Button
            className="navbar__menu"
            aria-label="Open Menu"
            onClick={() => setShowMenu(true)}
          >
            <ListIcon size={32} />
          </Button>
          <LinkGatsby
            to="/"
            aria-label="Go to Faststore home"
            title="Go to Faststore home"
            className="navbar__logo"
            onClick={() => setShowMenu(false)}
          >
            <Logo />
          </LinkGatsby>
          <SearchInput />
          <div className="navbar__buttons">
            <SignInLink />
            <CartToggle />
          </div>
        </section>

        <div className={`navlinks ${showMenu ? 'open' : ''}`}>
          <section>
            <LinkGatsby
              to="/"
              aria-label="Go to Faststore home"
              title="Go to Faststore home"
              className="navbar__logo"
              onClick={() => setShowMenu(false)}
            >
              <Logo />
            </LinkGatsby>
            <Button
              className="navlinks__button"
              aria-label="Close Menu"
              onClick={() => setShowMenu(false)}
            >
              <XIcon size={24} weight="bold" />
            </Button>
          </section>
          <nav className="navlinks__list">
            {links.map((x) => (
              <Link variant="display" key={x.href} href={x.href}>
                {x.name}
              </Link>
            ))}
          </nav>
          <div className="navlinks__signin">
            <SignInLink />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
