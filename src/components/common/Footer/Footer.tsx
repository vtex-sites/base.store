import React from 'react'
import { Incentive, List } from '@faststore/ui'

import {
  QualityIcon,
  SafetyIcon,
  GuaranteeIcon,
  ShippingIcon,
  StoreIcon,
} from './Icons'

function Footer() {
  return (
    <footer className="w-full h-32 bg-primary-200">
      {/* list of incentives */}
      <List variant="unordered" style={{ display: 'inline-flex' }}>
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
    </footer>
  )
}

export default Footer
