import { List as UIList } from '@faststore/ui'
import { Link as LinkGatsby } from 'gatsby'
import { useRef, useState } from 'react'
import CartToggle from 'src/components/cart/CartToggle'
import PostalCodeInput from 'src/components/common/PostalCode'
import SearchInput from 'src/components/common/SearchInput'
import Icon from 'src/components/ui/Icon'
import IconButton from 'src/components/ui/IconButton'
import Link from 'src/components/ui/Link'
import Logo from 'src/components/ui/Logo'
import SignInLink from 'src/components/ui/SignInLink'
import SlideOver from 'src/components/ui/SlideOver'
import { mark } from 'src/sdk/tests/mark'
import type { AnchorHTMLAttributes } from 'react'
import type { SearchInputRef } from '@faststore/ui'

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
  const [searchExpanded, setSearchExpanded] = useState(false)
  const searchMobileRef = useRef<SearchInputRef>(null)
  const dismissTransition = useRef<Callback | undefined>()
  const handleCloseSlideOver = () => setShowMenu(false)

  const handlerExpandSearch = () => {
    setSearchExpanded(true)
    searchMobileRef.current?.inputRef?.focus()
  }

  return (
    <header className="navbar layout__content-full">
      <div className="navbar__header layout__content">
        <section className="navbar__row">
          {!searchExpanded && (
            <>
              <IconButton
                classes="navbar__menu"
                aria-label="Open Menu"
                icon={<Icon name="List" width={32} height={32} />}
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
                icon={<Icon name="CaretLeft" width={32} height={32} />}
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
        <NavLinks />
        <PostalCodeInput />
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
              icon={<Icon name="X" width={32} height={32} />}
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
