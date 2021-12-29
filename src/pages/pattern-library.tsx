import React, { useState } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { Button as UIButton } from '@faststore/ui'
import {
  BellRinging as BellRingingIcon,
  ArrowRight as ArrowRightIcon,
} from 'phosphor-react'
import CartToggle from 'src/components/cart/CartToggle'
import { CartProvider, UIProvider } from '@faststore/sdk'
import BuyButton from 'src/components/ui/BuyButton'
import Button from 'src/components/ui/Button'

import SkuSelector from '../components/ui/SkuSelector'
import Link from '../components/ui/Link'
import Alert from '../components/ui/Alert'
import DiscountBadge from '../components/ui/DiscountBadge'
import SearchInput from '../components/common/SearchInput'
import QuantitySelector from '../components/ui/QuantitySelector'

import '../styles/pattern-library.scss'

function Page() {
  return (
    <>
      <GatsbySeo title="Pattern Library" language="en" noindex nofollow />
      <div className="pattern-library">
        <header>
          <h1 className="title-section grid-content">Pattern Library</h1>
        </header>
        <main>
          <TypographySection />

          <LinksSection />

          <section className="grid-section grid-content">
            <h2 className="title-subsection">Custom Button – BuyButton</h2>
            <ul className="list-horizontal">
              <li>
                <BuyButton>Buy Now</BuyButton>
              </li>
              <li>
                <BuyButton disabled>Buy Now</BuyButton>
              </li>
            </ul>
          </section>

          <CustomButtonPrimary />

          <CustomButtonSecondary />

          <InputsSection />

          <SkuSelectorSection />

          <AlertsSection />

          <BadgesSection />

          <CartToggleSection />
        </main>
      </div>
    </>
  )
}

function TypographySection() {
  return (
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
  )
}

function LinksSection() {
  return (
    <section className="grid-section grid-content">
      <h2 className="title-subsection">Links</h2>
      <ul className="list-vertical">
        <li>
          <Link href="/">Link</Link>
        </li>
        <li>
          <p className="text-body">
            Lorem ipsum dolor sit amet, consectetur adipisci{' '}
            <Link variant="inline" href="/">
              Link Inline
            </Link>{' '}
            ipsum.
          </p>
        </li>
        <li>
          <Link variant="display" href="/">
            Link Display
          </Link>
        </li>
        <li>
          <Link variant="footer" href="/">
            Link Footer
          </Link>
        </li>
      </ul>
      <ul className="list-vertical" style={{ background: '#5d666f' }}>
        <li>
          <Link href="/" inverse>
            Link Inverse
          </Link>
        </li>
      </ul>
    </section>
  )
}

function CustomButtonPrimary() {
  return (
    <section className="grid-section grid-content">
      <h2 className="title-subsection">Custom Button – Primary</h2>
      <ul className="list-horizontal">
        <li>
          <Button
            variant="primary"
            icon={<BellRingingIcon size={18} weight="bold" />}
            iconPosition="left"
          >
            Call To Action
          </Button>
        </li>
        <li>
          <Button
            variant="primary"
            icon={<BellRingingIcon size={18} weight="bold" />}
            iconPosition="left"
            disabled
          >
            Call To Action
          </Button>
        </li>
      </ul>
      <ul className="list-horizontal dark">
        <li>
          <Button
            variant="primary"
            icon={<BellRingingIcon size={18} weight="bold" />}
            iconPosition="left"
            inverse
          >
            Call To Action
          </Button>
        </li>
      </ul>
    </section>
  )
}

function CustomButtonSecondary() {
  return (
    <section className="grid-section grid-content">
      <h2 className="title-subsection">Custom Button – Secondary</h2>
      <ul className="list-horizontal">
        <li>
          <Button
            variant="secondary"
            icon={<ArrowRightIcon size={18} weight="bold" />}
            iconPosition="right"
          >
            Call To Action
          </Button>
        </li>
        <li>
          <Button
            variant="secondary"
            icon={<ArrowRightIcon size={18} weight="bold" />}
            iconPosition="right"
            disabled
          >
            Call To Action
          </Button>
        </li>
      </ul>
      <ul className="list-horizontal dark">
        <li>
          <Button
            variant="secondary"
            icon={<ArrowRightIcon size={18} weight="bold" />}
            iconPosition="right"
            inverse
          >
            Call To Action
          </Button>
        </li>
      </ul>
    </section>
  )
}

function InputsSection() {
  return (
    <>
      <section className="grid-section grid-content">
        <h2 className="title-subsection">Search Input</h2>
        <ul className="list-horizontal">
          <li style={{ width: '100%' }}>
            <SearchInput />
          </li>
        </ul>
      </section>

      <section className="grid-section grid-content">
        <h2 className="title-subsection">Quantity Selector Input</h2>
        <ul className="list-horizontal">
          <li>
            <QuantitySelector min={1} max={10} disabled={false} />
          </li>
          <li>
            <QuantitySelector min={4} max={40} disabled />
          </li>
        </ul>
      </section>
    </>
  )
}

function SkuSelectorSection() {
  return (
    <section className="grid-section grid-content">
      <h2 className="title-subsection">SKU Selectors</h2>
      <ul className="list-vertical">
        <li>
          <SkuSelector
            label="Size"
            variant="label"
            options={[
              { label: 'S', value: 's' },
              { label: 'M', value: 'm' },
              { label: 'L', value: 'l' },
              { label: 'XL', value: 'xl', disabled: true },
            ]}
          />
        </li>
        <li>
          <SkuSelector
            label="Color"
            variant="color"
            options={[
              { label: 'Yellow', value: '#f1d096' },
              { label: 'Pink', value: '#eed0d0' },
              { label: 'Green', value: '#b2dbcb' },
              { label: 'Blue', value: '#bacbec' },
              { label: 'Lilac', value: '#ebdcff', disabled: true },
            ]}
          />
        </li>
      </ul>
    </section>
  )
}

function AlertsSection() {
  const [showAlert1, setShowAlert1] = useState(true)
  const [showAlert2, setShowAlert2] = useState(true)
  const [showAlert3, setShowAlert3] = useState(true)

  return (
    <section id="alerts" className="grid-section grid-content">
      <h2 className="title-subsection">Alerts</h2>
      <ul className="list-vertical">
        <li>
          <Alert icon={<BellRingingIcon size={24} />}>
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
              icon={<BellRingingIcon size={24} />}
              dismissible
              onClose={() => setShowAlert1(false)}
            >
              Get 10% off today:&nbsp;<span>NEW10</span>
            </Alert>
          ) : (
            <UIButton onClick={() => setShowAlert1((prevState) => !prevState)}>
              Show Alert
            </UIButton>
          )}
        </li>
        <li>
          {showAlert2 ? (
            <Alert
              icon={<BellRingingIcon size={24} />}
              dismissible
              link={{ to: '#alerts', text: 'Action' }}
              onClose={() => setShowAlert2(false)}
            >
              Get 10% off today:&nbsp;<span>NEW10</span>
            </Alert>
          ) : (
            <UIButton onClick={() => setShowAlert2((prevState) => !prevState)}>
              Show Alert
            </UIButton>
          )}
        </li>

        <li>
          {showAlert3 ? (
            <Alert
              icon={<BellRingingIcon size={24} />}
              dismissible
              link={{ to: '#alerts', text: 'Action' }}
              onClose={() => setShowAlert3(false)}
            >
              Long text example:&nbsp;<span>NEW10.</span>&nbsp; Get 10% off
              today Get 10% off today Get 10% off today Get 10% off today Get
              10% off today Get 10% off today Get 10% off today Get 10% off
              today Get 10% off today{' '}
            </Alert>
          ) : (
            <UIButton onClick={() => setShowAlert3((prevState) => !prevState)}>
              Show Alert
            </UIButton>
          )}
        </li>
      </ul>
    </section>
  )
}

function BadgesSection() {
  return (
    <section className="grid-section grid-content">
      <h2 className="title-subsection">Badge</h2>
      <ul className="list-horizontal">
        <li>
          <DiscountBadge listPrice={100} spotPrice={50} />
        </li>
        <li>
          <DiscountBadge listPrice={100} spotPrice={50} small />
        </li>
      </ul>
    </section>
  )
}

function CartToggleSection() {
  return (
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
  )
}

export default Page
