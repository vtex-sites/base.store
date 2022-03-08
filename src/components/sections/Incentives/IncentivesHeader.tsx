import React from 'react'
import IconSVG from 'src/components/common/IconSVG'

import Incentives from './Incentives'

const incentives = [
  {
    icon: <IconSVG name="Truck" width={32} height={32} />,
    title: 'Buy online',
    firstLineText: 'Get Free Shipping',
  },
  {
    icon: <IconSVG name="Calendar" width={32} height={32} />,
    title: 'Free return',
    firstLineText: '30 days to return',
  },
  {
    icon: <IconSVG name="Gift" width={32} height={32} />,
    title: 'Gift cards',
    firstLineText: '$20 / $30 / $50',
  },
  {
    icon: <IconSVG name="Storefront" width={32} height={32} />,
    title: 'Physical Stores',
    firstLineText: '+40 Stores in Brazil',
  },
  {
    icon: <IconSVG name="ShieldCheck" width={32} height={32} />,
    title: 'Buy online',
    firstLineText: 'Get Free Shipping',
  },
]

function IncentivesHeader() {
  return <Incentives incentives={incentives} classes="incentives--colored" />
}

export default IncentivesHeader
