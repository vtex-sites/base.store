import type { SearchInputRef } from '@faststore/ui'
import { List as UIList } from '@faststore/ui'
import { Link as LinkGatsby } from 'gatsby'
import React, { lazy, useRef, useState } from 'react'
import type { AnchorHTMLAttributes } from 'react'
import CartToggle from 'src/components/cart/CartToggle'
import IconButton from 'src/components/ui/IconButton'
import Link from 'src/components/ui/Link'
import Logo from 'src/components/ui/Logo'
import {
  CaretLeft as CaretLeftIcon,
  List as ListIcon,
  X as XIcon,
} from 'phosphor-react'
import SignInLink from 'src/components/ui/SignInLink'
import SlideOver from 'src/components/ui/SlideOver'
import { useStoreCollection } from 'src/hooks/useAllCollections'
import { mark } from 'src/sdk/tests/mark'
import PreventLoadComponent from 'src/components/common/PreventLoadComponent'
import { PERFORMANCE_TEST_FLAG } from 'src/constants'

import SearchInput from '../SearchInput'

import './navbar.scss'

const PostalCodeInput = lazy(() => import('src/components/common/PostalCode'))

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
  const [searchExpanded, setSearchExpanded] = useState(false)
  const searchMobileRef = useRef<SearchInputRef>(null)
  const dismissTransition = useRef<Callback | undefined>()
  const handleCloseSlideOver = () => setShowMenu(false)

  const handlerExpandSearch = () => {
    setSearchExpanded(true)
    searchMobileRef.current?.inputRef?.focus()
  }

  return (
    <header className="navbar / grid-content-full">
      <div className="navbar__header / grid-content">
        <section className="navbar__row">
          {!searchExpanded && (
            <>
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
            </>
          )}
          <SearchInput />
          <div
            className="navbar__buttons"
            data-store-search-expanded={searchExpanded}
          >
            {searchExpanded && (
              <IconButton
                classes="navbar__collapse"
                aria-label="Collapse search bar"
                icon={<CaretLeftIcon size={32} />}
                onClick={() => setSearchExpanded(false)}
              />
            )}
            <SearchInput
              placeholder=""
              ref={searchMobileRef}
              testId="store-input-mobile"
              buttonTestId="store-input-mobile-button"
              onSearchClick={handlerExpandSearch}
            />
            <SignInLink />
            <CartToggle />
          </div>
        </section>
        <section className="navbar__submenu">
          <NavLinks />
          <PreventLoadComponent
            preventLoadComponentCallback={() =>
              window.location.search.includes(PERFORMANCE_TEST_FLAG)
            }
            fallback={null}
            component={PostalCodeInput}
          />
        </section>
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
