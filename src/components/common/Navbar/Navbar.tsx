import { List as UIList } from '@faststore/ui'
import { Link as LinkGatsby } from 'gatsby'
import { List as ListIcon, X as XIcon } from 'phosphor-react'
import React, { useRef, useState } from 'react'
import CartToggle from 'src/components/cart/CartToggle'
import IconButton from 'src/components/ui/IconButton'
import Link from 'src/components/ui/Link'
import Logo from 'src/components/ui/Logo'
import SignInLink from 'src/components/ui/SignInLink'
import SlideOver from 'src/components/ui/SlideOver'
import { mark } from 'src/sdk/tests/mark'
import type { AnchorHTMLAttributes } from 'react'

import SearchInput from '../SearchInput'

import './navbar.scss'

type Callback = () => unknown

interface NavLinksProps {
  onClickLink?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
}

const collections = [
  {
    name: 'Office',
    href: '/office',
  },
  {
    name: 'Home Appliances',
    href: '/kitchen-and-home-appliances',
  },
  {
    name: 'Computer and Software',
    href: '/computer-and-software',
  },
  {
    name: 'Technology',
    href: '/technology',
  },
]

function NavLinks({ onClickLink }: NavLinksProps) {
  return (
    <nav className="navlinks__list">
      <UIList>
        {collections.map(({ href, name }) => (
          <li key={name}>
            <Link variant="display" to={href} onClick={onClickLink}>
              {name}
            </Link>
          </li>
        ))}
      </UIList>
    </nav>
  )
}

function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const dismissTransition = useRef<Callback | undefined>()
  const handleCloseSlideOver = () => setShowMenu(false)

  return (
    <header className="navbar / grid-content-full">
      <div className="navbar__header / grid-content">
        <section className="navbar__row">
          <IconButton
            classes="navbar__menu"
            aria-label="Open Menu"
            icon={<ListIcon size={32} />}
            onClick={() => setShowMenu(true)}
          />
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
        <NavLinks />
      </div>

      <SlideOver
        isOpen={showMenu}
        onDismiss={handleCloseSlideOver}
        onDismissTransition={(callback) => {
          dismissTransition.current = callback
        }}
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
              onClick={() => dismissTransition.current?.()}
            >
              <Logo />
            </LinkGatsby>

            <IconButton
              classes="navbar__button"
              aria-label="Close Menu"
              icon={<XIcon size={32} />}
              onClick={() => dismissTransition.current?.()}
            />
          </header>
          <div className="navlinks">
            <NavLinks onClickLink={handleCloseSlideOver} />
            <div className="navlinks__signin">
              <SignInLink />
            </div>
          </div>
        </div>
      </SlideOver>
    </header>
  )
}

Navbar.displayName = 'Navbar'

export default mark(Navbar)
