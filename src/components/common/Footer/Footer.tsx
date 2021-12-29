import React, { useState } from 'react'
import {
  Incentive,
  List,
  Link,
  Icon,
  PaymentMethods,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@faststore/ui'

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
  PlusButtonIcon,
} from './Icons'

function Footer() {
  const [indices, setIndices] = useState<Set<number>>(new Set([]))
  const onChange = (index: number) => {
    if (indices.has(index)) {
      indices.delete(index)
      setIndices(new Set(indices))
    } else {
      setIndices(new Set(indices.add(index)))
    }
  }

  const screen = 'desktop'

  return (
    <footer>
      <div>
        {/* list of incentives */}
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
      </div>
      <div>
        {/* list of links -- must to be an accordion on mobile */}
        <section>
          {/* TODO: verify if classname is mobile or desktop */}
          {screen === 'desktop' ? (
            <>
              <div>
                <span>Our company</span>
                <Link href="/">About Us</Link>
                <Link href="/">Our Blog</Link>
                <Link href="/">Stores</Link>
                <Link href="/">Work With Us</Link>
              </div>
              <div>
                <span>Orders {'&'} Purchases</span>
                <Link href="/">Check Order Status</Link>
                <Link href="/">Returns and Exchanges</Link>
                <Link href="/">Product Recall</Link>
                <Link href="/">Gift Cards</Link>
              </div>
              <div>
                <span>Support {'&'} Services</span>
                <Link href="/">Support Center</Link>
                <Link href="/">Schedule a Service</Link>
                <Link href="/">Contact Us</Link>
              </div>
              <div>
                <span>Partnerships</span>
                <Link href="/">Affiliate Program</Link>
                <Link href="/">Advertise with US</Link>
                <Link href="/">Market Place</Link>
              </div>
            </>
          ) : (
            <Accordion indices={indices} onChange={onChange}>
              <AccordionItem>
                <AccordionButton>
                  Our company <Icon component={<PlusButtonIcon />} />
                </AccordionButton>
                <AccordionPanel>
                  <ul>
                    <li>
                      <a href="/">About Us</a>
                    </li>
                    <li>
                      <a href="/">Our Blog</a>
                    </li>
                    <li>
                      <a href="/">Stores</a>
                    </li>
                    <li>
                      <a href="/">Work With Us</a>
                    </li>
                  </ul>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  Orders {'&'} Purchases <Icon component={<PlusButtonIcon />} />
                </AccordionButton>
                <AccordionPanel>
                  <ul>
                    <li>
                      <a href="/">Check Order Status</a>
                    </li>
                    <li>
                      <a href="/">Returns and Exchanges</a>
                    </li>
                    <li>
                      <a href="/">Product Recall</a>
                    </li>
                    <li>
                      <a href="/">Gift Cards</a>
                    </li>
                  </ul>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  Support {'&'} Services <Icon component={<PlusButtonIcon />} />
                </AccordionButton>
                <AccordionPanel>
                  <ul>
                    <li>
                      <a href="/">Support Center</a>
                    </li>
                    <li>
                      <a href="/">Schedule a Service</a>
                    </li>
                    <li>
                      <a href="/">Contact Us</a>
                    </li>
                  </ul>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  Support {'&'} Services <Icon component={<PlusButtonIcon />} />
                </AccordionButton>
                <AccordionPanel>
                  <ul>
                    <li>
                      <a href="/">Affiliate Program</a>
                    </li>
                    <li>
                      <a href="/">Advertise with US</a>
                    </li>
                    <li>
                      <a href="/">Market Place</a>
                    </li>
                  </ul>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}
        </section>
        {/* Follow us section */}
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
