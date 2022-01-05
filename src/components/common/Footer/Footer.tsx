import React from 'react'
import {
  List as UIList,
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

import './footer.scss'

function Footer() {
  return (
    <footer className="footer / grid-content-full">
      <IncentivesFooter />

      <div className="grid-content">
        <FooterLinks />

        <section className="footer__social">
          <p className="title-sub-subsection">Follow us</p>
          <UIList variant="unordered">
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
          </UIList>
        </section>
      </div>

      <div className="footer__note / grid-content">
        <UIIcon component={<FastStoreIcon />} />

        <UIPaymentMethods>
          <p className="title-sub-subsection">Payment Methods</p>
          <UIList>
            <li>
              <VisaCardIcon />
            </li>
            <li>
              <DinersClubIcon />
            </li>
            <li>
              <MastercardIcon />
            </li>
            <li>
              <EloCardIcon />
            </li>
            <li>
              <PayPalIcon />
            </li>
            <li>
              <StripeIcon />
            </li>
            <li>
              <GooglePayIcon />
            </li>
            <li>
              <ApplePayIcon />
            </li>
          </UIList>
        </UIPaymentMethods>

        <div className="footer__copyright / text-body-small">
          <p>This website uses VTEX technology</p>
          <p>
            In-store price may vary. Prices and offers are subject to change.
            2021 Store name. All rights reserved. Store is a trademark of Store
            and its affiliated companies.
          </p>
          <address>Mount St, 000, New York / NY - 00000.</address>
        </div>
      </div>
    </footer>
  )
}

export default Footer
