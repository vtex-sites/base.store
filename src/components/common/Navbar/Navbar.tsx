import React, { useState, useEffect } from 'react'
import { Link as LinkGatsby } from 'gatsby'
import CartToggle from 'src/components/cart/CartToggle'
import Logo from 'src/components/ui/Logo'
import Link from 'src/components/ui/Link'
import Button from 'src/components/ui/Button'
import { List as ListIcon, X as XIcon } from 'phosphor-react'
import SignInLink from 'src/components/ui/SignInLink'
import SlideOver from 'src/components/ui/SlideOver'
import useWindowDimensions from 'src/hooks/useWindowDimensions'

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
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const { width: screenWidth } = useWindowDimensions()
  let onDismissTransition: () => unknown

  useEffect(() => {
    if (screenWidth) {
      // notebook breakpoint = 1280px (See breakpoints on styles/global.scss)
      setIsMobile(screenWidth < 1280)
    }
  }, [screenWidth])

  return (
    <header className="navbar / grid-content-full">
      <div className="navbar__header / grid-content">
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
          >
            <Logo />
          </LinkGatsby>
          <SearchInput />
          <div className="navbar__buttons">
            <SignInLink />
            <CartToggle />
          </div>
        </section>
        <nav className="navlinks__list">
          {links.map((x) => (
            <Link variant="display" key={x.href} href={x.href}>
              {x.name}
            </Link>
          ))}
        </nav>
      </div>
      {isMobile && (
        <SlideOver
          isOpen={showMenu}
          onDismiss={() => setShowMenu(false)}
          onDismissTransition={(callback) => (onDismissTransition = callback)}
          size="full"
          direction="leftSide"
          className="navbar__modal-content"
        >
          <div className="navbar__modal-body">
            <header className="navbar__modal-header">
              <LinkGatsby
                to="/"
                aria-label="Go to Faststore home"
                title="Go to Faststore home"
                className="navbar__logo"
                onClick={() => {
                  onDismissTransition?.()
                }}
              >
                <Logo />
              </LinkGatsby>
              <Button
                className="navlinks__button"
                aria-label="Close Menu"
                onClick={() => {
                  onDismissTransition?.()
                }}
              >
                <XIcon size={32} />
              </Button>
            </header>
            <div className="navlinks">
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
        </SlideOver>
      )}
    </header>
  )
}

export default Navbar
