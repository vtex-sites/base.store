import React from 'react'
import {
  Icon as UIIcon,
  PaymentMethods as UIPaymentMethods,
} from '@faststore/ui'

import FooterLinks from './FooterLinks'
import Incentives from './Incentives'
import {
  QualityIcon,
  SafetyIcon,
  GuaranteeIcon,
  ShippingIcon,
  StoreIcon,
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TwitterIcon,
  FastStoreIcon,
  VisaCardIcon,
  DinersClubIcon,
  PayPalIcon,
  MastercardIcon,
  StripeIcon,
  GooglePayIcon,
  EloCardIcon,
  ApplePayIcon,
} from './Icons'

function Footer() {
  const incentives = [
    <>
      <SafetyIcon />
      <span>Trusted by SafeCon</span>
    </>,
    <>
      <QualityIcon />
      <span>Quality Products</span>
    </>,
    <>
      <GuaranteeIcon />
      <span>3-years Guarantee</span>
    </>,
    <>
      <StoreIcon />
      <span>Pickup Options</span>
    </>,
    <>
      <ShippingIcon />
      <span>Free Shipping</span>
    </>,
  ]

  return (
    <footer>
      {/* Incentives list */}
      <section>
        <Incentives incentives={incentives} />
      </section>

      {/* list of links -- must be an accordion on mobile */}
      <FooterLinks />

      {/* Follow us section */}

      <section>
        <p>Follow us</p>
        <ul>
          <li>
            <UIIcon component={<FacebookIcon />} />
          </li>
          <li>
            <UIIcon component={<InstagramIcon />} />
          </li>
          <li>
            <UIIcon component={<PinterestIcon />} />
          </li>
          <li>
            <UIIcon component={<TwitterIcon />} />
          </li>
        </ul>
      </section>

      {/* fast store logo */}
      <div>
        <UIIcon component={<FastStoreIcon />} />
      </div>

      {/* small text */}
      <section>
        <small>This website uses VTEX technology</small>
        <small>
          In-store price may vary. Prices and offers are subject to change. 2021
          Store name. All rights reserved. Store is a trademark of Store and its
          affiliated companies.
        </small>
        <small> Mount St, 000, New York / NY - 00000.</small>
      </section>

      {/* payment methods */}
      <UIPaymentMethods title="Payment Methods">
        <ul>
          <li>
            <VisaCardIcon />
          </li>
          <li>
            <DinersClubIcon />
          </li>
          <PayPalIcon />
          <li>
            <MastercardIcon />
          </li>
          <li>
            <StripeIcon />
          </li>
          <li>
            <GooglePayIcon />
          </li>
          <li>
            <EloCardIcon />
          </li>
          <li>
            <ApplePayIcon />
          </li>
        </ul>
      </UIPaymentMethods>
    </footer>
  )
}

export default Footer
