import React from 'react'
import { Incentive, List, Link } from '@faststore/ui'

import {
  QualityIcon,
  SafetyIcon,
  GuaranteeIcon,
  ShippingIcon,
  StoreIcon,
} from './Icons'

function Footer() {
  return (
    <footer className="w-full bg-primary-200 flex flex-col">
      {/* list of incentives */}
      <List variant="unordered" className="justify-around flex">
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
      {/* links */}
      <div className="flex flex-row justify-around">
        <div className="flex flex-col">
          <span>Our company</span>
          <Link href="/">About Us</Link>
          <Link href="/">Our Blog</Link>
          <Link href="/">Stores</Link>
          <Link href="/">Work With Us</Link>
        </div>
        <div className="flex flex-col">
          <span>Orders {'&'} Purchases</span>
          <Link href="/">Check Order Status</Link>
          <Link href="/">Returns and Exchanges</Link>
          <Link href="/">Product Recall</Link>
          <Link href="/">Gift Cards</Link>
        </div>
        <div className="flex flex-col">
          <span>Support {'&'} Services</span>
          <Link href="/">Support Center</Link>
          <Link href="/">Schedule a Service</Link>
          <Link href="/">Contact Us</Link>
        </div>
        <div className="flex flex-col">
          <span>Partnerships</span>
          <Link href="/">Affiliate Program</Link>
          <Link href="/">Advertise with US</Link>
          <Link href="/">Market Place</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
