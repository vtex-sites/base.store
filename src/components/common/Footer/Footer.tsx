import React from 'react'
import {
  List,
  Icon as UIIcon,
  PaymentMethods as UIPaymentMethods,
} from '@faststore/ui'

import FooterLinks from './FooterLinks'
import IncentivesFooter from '../../sections/Incentives/IncentivesFooter'
import {
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
  return (
    <footer className="w-full bg-primary-200 flex flex-col">
      {/* Incentives list */}
      <IncentivesFooter />

      {/* list of links -- must be an accordion on mobile */}
      <FooterLinks />

      {/* Follow us section */}
      <section>
        <p>Follow us</p>
        <List variant="unordered" className="justify-around flex">
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
        </List>
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
        <List className="flex flex-row justify-around">
          <li>
            <VisaCardIcon />
          </li>
          <li>
            <DinersClubIcon />
          </li>
          <li>
            <PayPalIcon />
          </li>
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
        </List>
      </UIPaymentMethods>
    </footer>
  )
}

export default Footer
