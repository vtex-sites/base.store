import type { AnchorHTMLAttributes } from 'react'
import React, { memo, useRef, useState } from 'react'
import { Link as LinkGatsby } from 'gatsby'
import { List as UIList } from '@faststore/ui'
import CartToggle from 'src/components/cart/CartToggle'
import Logo from 'src/components/ui/Logo'
import Link from 'src/components/ui/Link'
import IconButton from 'src/components/ui/IconButton'
import { List as ListIcon, X as XIcon } from 'phosphor-react'
import SignInLink from 'src/components/ui/SignInLink'
import SlideOver from 'src/components/ui/SlideOver'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { useStoreCollection } from 'src/hooks/useAllCollections'

import SearchInput from '../SearchInput'

import './navbar.scss'

type Callback = () => unknown

interface NavLinksProps {
  onClickLink?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
}

function NavLinks({ onClickLink }: NavLinksProps) {
  const links = useStoreCollection()

  return (
    <nav className="navlinks__list">
      <UIList>
        {links.map(({ node: link }) => (
          <li key={link.seo.title}>
            <Link variant="display" to={`/${link.slug}`} onClick={onClickLink}>
              {link.seo.title}
            </Link>
          </li>
        ))}
      </UIList>
    </nav>
  )
}

function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const { isMobile } = useWindowDimensions()
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
      {isMobile && (
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
      )}
    </header>
  )
}

export default memo(Navbar)
