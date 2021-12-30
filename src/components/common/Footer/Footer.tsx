import React from 'react'
import { Icon } from '@faststore/ui'
// import { Icon, PaymentMethods } from '@faststore/ui'

import LinksList from './LinksList'
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
  // VisaCardIcon,
  // DinersClubIcon,
  // PayPalIcon,
  // MastercardIcon,
  // StripeIcon,
  // GooglePayIcon,
  // EloCardIcon,
  // ApplePayIcon,
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
      <LinksList />

      {/* Follow us section */}

      <section>
        <span>Follow us</span>
        <Icon component={<FacebookIcon />} />
        <Icon component={<InstagramIcon />} />
        <Icon component={<PinterestIcon />} />
        <Icon component={<TwitterIcon />} />
      </section>

      {/* fast store logo */}
      <div>
        <Icon component={<FastStoreIcon />} />
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
      {/* <div>
        <PaymentMethods title="Payment Methods">
          <VisaCardIcon />
          <DinersClubIcon />
          <PayPalIcon />
          <MastercardIcon />
          <StripeIcon />
          <GooglePayIcon />
          <EloCardIcon />
          <ApplePayIcon />
        </PaymentMethods>
      </div> */}
    </footer>
  )
}

export default Footer
