import React from 'react'
import { Incentive, List, Icon, PaymentMethods } from '@faststore/ui'

import LinksList from './LinksList'
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
  return (
    <footer>
      {/* Incentives list */}
      <div>
        <section>
          <List variant="unordered">
            <li>
              <Incentive>
                <SafetyIcon />
                <span>Trusted by SafeCon</span>
              </Incentive>
            </li>
            <li>
              <Incentive>
                <QualityIcon />
                <span>Quality Products</span>
              </Incentive>
            </li>
            <li>
              <Incentive>
                <GuaranteeIcon />
                <span>3-years Guarantee</span>
              </Incentive>
            </li>
            <li>
              <Incentive>
                <StoreIcon />
                <span>Pickup Options</span>
              </Incentive>
            </li>
            <li>
              <Incentive>
                <ShippingIcon />
                <span>Free Shipping</span>
              </Incentive>
            </li>
          </List>
        </section>
      </div>
      {/* list of links -- must be an accordion on mobile */}
      <LinksList />
      {/* Follow us section */}
      <div>
        <section>
          <span>Follow us</span>
          <Icon component={<FacebookIcon />} />
          <Icon component={<InstagramIcon />} />
          <Icon component={<PinterestIcon />} />
          <Icon component={<TwitterIcon />} />
        </section>
      </div>
      <div>
        {/* fast store logo */}
        <div>
          <Icon component={<FastStoreIcon />} />
        </div>
        {/* small text */}
        <section>
          <small>This website uses VTEX technology</small>
          <small>
            In-store price may vary. Prices and offers are subject to change.
            2021 Store name. All rights reserved. Store is a trademark of Store
            and its affiliated companies.
          </small>
          <small> Mount St, 000, New York / NY - 00000.</small>
        </section>
        {/* payment methods */}
        <div>
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
        </div>
      </div>
    </footer>
  )
}

export default Footer
