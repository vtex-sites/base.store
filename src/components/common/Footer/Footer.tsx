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
                <UIIcon
                  component={
                    <img
                      src="/icons/Facebook.svg"
                      alt="facebook icon"
                      width="24px"
                      height="24px"
                      loading="lazy"
                    />
                  }
                />
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
                <UIIcon
                  component={
                    <img
                      src="/icons/Instagram.svg"
                      alt="Instagram icon"
                      width="24px"
                      height="24px"
                      loading="lazy"
                    />
                  }
                />
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
                <UIIcon
                  component={
                    <img
                      src="/icons/Pinterest.svg"
                      alt="Pinterest icon"
                      width="24px"
                      height="24px"
                      loading="lazy"
                    />
                  }
                />
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
                <UIIcon
                  component={
                    <img
                      src="/icons/Twitter.svg"
                      alt="Twitter icon"
                      width="24px"
                      height="24px"
                      loading="lazy"
                    />
                  }
                />
              </Link>
            </li>
          </UIList>
        </section>
      </div>

      <div className="footer__note / grid-content">
        <UIIcon
          component={
            <img
              src="/logo.png"
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
              <img
                src="/icons/Visa.svg"
                alt="Visa icon"
                width="34px"
                height="24px"
                loading="lazy"
              />
              <SROnly text="Visa" />
            </li>
            <li>
              <img
                src="/icons/Diners.svg"
                alt="DinersClub icon"
                width="34px"
                height="24px"
                loading="lazy"
              />
              <SROnly text="Diners Club" />
            </li>
            <li>
              <img
                src="/icons/Mastercard.svg"
                alt="Mastercard icon"
                width="34px"
                height="24px"
                loading="lazy"
              />
              <SROnly text="Mastercard" />
            </li>
            <li>
              <img
                src="/icons/EloCard.svg"
                alt="Elo card icon"
                width="34px"
                height="24px"
                loading="lazy"
              />
              <SROnly text="Elo Card" />
            </li>
            <li>
              <img
                src="/icons/PayPal.svg"
                alt="PayPal icon"
                width="34px"
                height="24px"
                loading="lazy"
              />
              <SROnly text="PayPal" />
            </li>
            <li>
              <img
                src="/icons/Stripe.svg"
                alt="Stripe icon"
                width="34px"
                height="24px"
                loading="lazy"
              />
              <SROnly text="Stripe" />
            </li>
            <li>
              <img
                src="/icons/GooglePay.svg"
                alt="GooglePay icon"
                width="34px"
                height="24px"
                loading="lazy"
              />
              <SROnly text="Google Pay" />
            </li>
            <li>
              <img
                src="/icons/ApplePay.svg"
                alt="ApplePay icon"
                width="34px"
                height="24px"
                loading="lazy"
              />
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
