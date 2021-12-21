import React, { useState } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { Button as UIButton, Badge as UIBadge } from '@faststore/ui'
import { BellRinging } from 'phosphor-react'
import CartToggle from 'src/components/cart/CartToggle'
import { CartProvider, UIProvider } from '@faststore/sdk'

import Alert from '../components/ui/Alert'
import SearchInput from '../components/common/SearchInput'

import '../styles/pattern-library.scss'

function Page() {
  const [showAlert1, setShowAlert1] = useState(true)
  const [showAlert2, setShowAlert2] = useState(true)

  return (
    <>
      <GatsbySeo title="Pattern Library" language="en" noindex nofollow />
      <div className="pattern-library">
        <header>
          <h1 className="title-section grid-content">Pattern Library</h1>
        </header>
        <main>
          <section className="grid-section grid-content">
            <h2 className="title-subsection">Typography scale</h2>
            <ul className="list-vertical">
              <li>
                <h2 className="title-hero">Title Hero</h2>
              </li>
              <li>
                <h2 className="title-display-big">Title Display Big</h2>
              </li>
              <li>
                <h3 className="title-section">Title Section</h3>
              </li>
              <li>
                <h3 className="title-display">Title Display</h3>
              </li>
              <li>
                <h3 className="title-product">Title Product</h3>
              </li>
              <li>
                <h4 className="title-subsection">Title Subsection</h4>
              </li>
              <li>
                <h4 className="title-sub-subsection">Title Sub Subsection</h4>
              </li>
              <li>
                <p className="text-body-big">Text Body Big</p>
              </li>
              <li>
                <p className="text-body">Text Body</p>
              </li>
              <li>
                <p className="text-body-small">Text Body Small</p>
              </li>
              <li>
                <p className="text-body-tiny">Text Body Tiny</p>
              </li>
            </ul>
          </section>

          <section className="grid-section grid-content">
            <h2 className="title-subsection">Buttons</h2>
            <ul className="list-horizontal">
              <li>
                <UIButton>Call to Action</UIButton>
              </li>
              <li>
                <UIButton>Call to Action</UIButton>
              </li>
              <li>
                <UIButton>Call to Action</UIButton>
              </li>
            </ul>
          </section>

          <section className="grid-section grid-content">
            <h2 className="title-subsection">Inputs</h2>
            <ul className="list-horizontal">
              <li style={{ width: '100%' }}>
                <SearchInput />
              </li>
            </ul>
          </section>

          <section id="alerts" className="grid-section grid-content">
            <h2 className="title-subsection">Alerts</h2>
            <ul className="list-vertical">
              <li>
                <Alert icon={<BellRinging size={24} />}>
                  Get 10% off today:&nbsp;<span>NEW10</span>
                </Alert>
              </li>
              <li>
                <Alert>
                  Get 10% off today:&nbsp;<span>NEW10</span>
                </Alert>
              </li>
              <li>
                {showAlert1 ? (
                  <Alert
                    icon={<BellRinging size={24} />}
                    dismissible
                    onClose={() => setShowAlert1(false)}
                  >
                    Get 10% off today:&nbsp;<span>NEW10</span>
                  </Alert>
                ) : (
                  <UIButton
                    onClick={() => setShowAlert1((prevState) => !prevState)}
                  >
                    Show Alert
                  </UIButton>
                )}
              </li>
              <li>
                {showAlert2 ? (
                  <Alert
                    icon={<BellRinging size={24} />}
                    dismissible
                    onClose={() => setShowAlert2(false)}
                  >
                    Get 10% off today:&nbsp;<span>NEW10</span>&nbsp;
                    <a href="#alerts">Action</a>
                  </Alert>
                ) : (
                  <UIButton
                    onClick={() => setShowAlert2((prevState) => !prevState)}
                  >
                    Show Alert
                  </UIButton>
                )}
              </li>
            </ul>
          </section>

          <section className="grid-section grid-content">
            <h2 className="title-subsection">Badge</h2>
            <ul className="list-horizontal">
              <li>
                <UIBadge>15% off</UIBadge>
              </li>
              <li>
                <UIBadge data-store-badge="small">15% off</UIBadge>
              </li>
            </ul>
          </section>

          <section className="grid-section grid-content">
            <h2 className="title-subsection">CartToggle</h2>
            <UIProvider>
              <CartProvider>
                <ul className="list-vertical">
                  <li>
                    <CartToggle />
                  </li>
                </ul>
              </CartProvider>
            </UIProvider>
          </section>
        </main>
      </div>
    </>
  )
}

export default Page
