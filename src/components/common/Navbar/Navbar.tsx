import { List as UIList } from '@faststore/ui'
import { Link as LinkGatsby } from 'gatsby'
import { useRef, useState } from 'react'
import CartToggle from 'src/components/cart/CartToggle'
import PostalCodeInput from 'src/components/common/PostalCode'
import SearchInput from 'src/components/common/SearchInput'
import Icon from 'src/components/ui/Icon'
import { ButtonIcon, ButtonSignIn } from 'src/components/ui/Button'
import Link from 'src/components/ui/Link'
import Logo from 'src/components/ui/Logo'
import SlideOver from 'src/components/ui/SlideOver'
import { mark } from 'src/sdk/tests/mark'
import { useModal } from 'src/sdk/ui/modal/Provider'
import type { AnchorHTMLAttributes } from 'react'
import type { SearchInputRef } from '@faststore/ui'

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
    href: '/kitchen---home-appliances',
  },
  {
    name: 'Computer and Software',
    href: '/computer---software',
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
  const { onModalClose } = useModal()
  const searchMobileRef = useRef<SearchInputRef>(null)

  const [showMenu, setShowMenu] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)

  const handleCloseSlideOver = () => {
    onModalClose()
    setShowMenu(false)
  }

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
              <ButtonIcon
                data-fs-button-menu
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
              <ButtonIcon
                data-fs-button-collapse
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
            <ButtonSignIn />
            <CartToggle />
          </div>
        </section>
        <NavLinks />
        <PostalCodeInput />
      </div>

      <SlideOver
        isOpen={showMenu}
        onDismiss={handleCloseSlideOver}
        size="full"
        direction="leftSide"
        className="navbar__modal-content"
      >
        <div className="navbar__modal-body">
          <header className="navbar__modal-header">
            <LinkGatsby
              to="/"
              aria-label="Go to FastStore home"
              title="Go to FastStore home"
              className="navbar__logo"
              onClick={onModalClose}
            >
              <Logo />
            </LinkGatsby>

            <ButtonIcon
              aria-label="Close Menu"
              icon={<Icon name="X" width={32} height={32} />}
              onClick={onModalClose}
            />
          </header>
          <div className="navlinks">
            <NavLinks onClickLink={handleCloseSlideOver} />
            <div className="navlinks__signin">
              <ButtonSignIn />
            </div>
          </div>
        </div>
      </SlideOver>
    </header>
  )
}

Navbar.displayName = 'Navbar'

export default mark(Navbar)
