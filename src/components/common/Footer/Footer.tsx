import React from 'react'
import {
  List as UIList,
  Icon as UIIcon,
  PaymentMethods as UIPaymentMethods,
} from '@faststore/ui'
import { mark } from 'src/sdk/tests/mark'
import IncentivesFooter from 'src/components/sections/Incentives/IncentivesFooter'
import SROnly from 'src/components/ui/SROnly'
import Link from 'src/components/ui/Link'

import FooterLinks from './FooterLinks'

import './footer.scss'

function SocialIcon({ name }: { name: string }) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={`${name} icon`}
      width="24px"
      height="24px"
      loading="lazy"
    />
  )
}

function PaymentIcon({ name }: { name: string }) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={`${name} icon`}
      width="34px"
      height="24px"
      loading="lazy"
    />
  )
}

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
                <UIIcon component={<SocialIcon name="Facebook" />} />
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
                <UIIcon component={<SocialIcon name="Instagram" />} />
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
                <UIIcon component={<SocialIcon name="Pinterest" />} />
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
                <UIIcon component={<SocialIcon name="Twitter" />} />
              </Link>
            </li>
          </UIList>
        </section>
      </div>

      <div className="footer__note / grid-content">
        <UIIcon
          component={
            <img
              src="/icons/FastStore.png"
              alt="FastStore icon"
              width="124px"
              height="34px"
              loading="lazy"
            />
          }
        />

        <UIPaymentMethods>
          <p className="title-sub-subsection">Payment Methods</p>
          <UIList>
            <li>
              <PaymentIcon name="Visa" />
              <SROnly text="Visa" />
            </li>
            <li>
              <PaymentIcon name="Diners" />
              <SROnly text="Diners Club" />
            </li>
            <li>
              <PaymentIcon name="Mastercard" />
              <SROnly text="Mastercard" />
            </li>
            <li>
              <PaymentIcon name="EloCard" />
              <SROnly text="Elo Card" />
            </li>
            <li>
              <PaymentIcon name="PayPal" />
              <SROnly text="PayPal" />
            </li>
            <li>
              <PaymentIcon name="Stripe" />
              <SROnly text="Stripe" />
            </li>
            <li>
              <PaymentIcon name="GooglePay" />
              <SROnly text="Google Pay" />
            </li>
            <li>
              <PaymentIcon name="ApplePay" />
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

Footer.displayName = 'Footer'

export default mark(Footer)
