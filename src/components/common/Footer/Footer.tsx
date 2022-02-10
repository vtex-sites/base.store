import React, { memo } from 'react'
import {
  List as UIList,
  Icon as UIIcon,
  PaymentMethods as UIPaymentMethods,
} from '@faststore/ui'

import FooterLinks from './FooterLinks'
import IncentivesFooter from '../../sections/Incentives/IncentivesFooter'
import SROnly from '../../ui/SROnly'
import Link from '../../ui/Link'
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

      <div className="footer__section / grid-content">
        <FooterLinks />

        <section className="footer__social">
          <p className="title-sub-subsection">Follow us</p>
          <UIList variant="unordered">
            <li>
              <Link
                as="a"
                href="https://www.facebook.com/"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <UIIcon component={<FacebookIcon />} />
              </Link>
            </li>
            <li>
              <Link
                as="a"
                href="https://www.instagram.com/"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <UIIcon component={<InstagramIcon />} />
              </Link>
            </li>
            <li>
              <Link
                as="a"
                href="https://www.pinterest.com/"
                title="Pinterest"
                target="_blank"
                rel="noopener noreferrer"
              >
                <UIIcon component={<PinterestIcon />} />
              </Link>
            </li>
            <li>
              <Link
                as="a"
                href="https://twitter.com/"
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <UIIcon component={<TwitterIcon />} />
              </Link>
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
              <SROnly text="Visa" />
            </li>
            <li>
              <DinersClubIcon />
              <SROnly text="Diners Club" />
            </li>
            <li>
              <MastercardIcon />
              <SROnly text="Mastercard" />
            </li>
            <li>
              <EloCardIcon />
              <SROnly text="Elo Card" />
            </li>
            <li>
              <PayPalIcon />
              <SROnly text="PayPal" />
            </li>
            <li>
              <StripeIcon />
              <SROnly text="Stripe" />
            </li>
            <li>
              <GooglePayIcon />
              <SROnly text="Google Pay" />
            </li>
            <li>
              <ApplePayIcon />
              <SROnly text="Apple Pay" />
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

export default memo(Footer)
