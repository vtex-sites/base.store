import React from 'react'
import { Incentive, List } from '@faststore/ui'

import {
  QualityIcon,
  SafetyIcon,
  GuaranteeIcon,
  ShippingIcon,
  StoreIcon,
} from './Icons'

function Incentives() {
  return (
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
  )
}

export default Incentives
