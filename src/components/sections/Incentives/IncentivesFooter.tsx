import React from 'react'
import {
  ShieldCheck as ShieldCheckIcon,
  Medal as MedalIcon,
  CircleWavyCheck as CircleWavyCheckIcon,
  Storefront as StorefrontIcon,
  Truck as TruckIcon,
} from 'phosphor-react'

import Incentives from './Incentives'

function IncentivesFooter() {
  const incentives = [
    {
      icon: <ShieldCheckIcon size={32} />,
      text: 'Trusted by SafeCon',
    },
    {
      icon: <MedalIcon size={32} />,
      text: 'Quality Products',
    },
    {
      icon: <CircleWavyCheckIcon size={32} />,
      text: '3-years Guarantee',
    },
    {
      icon: <StorefrontIcon size={32} />,
      text: 'Pickup Options',
    },
    {
      icon: <TruckIcon size={32} />,
      text: 'Free Shipping',
    },
  ]

  return <Incentives incentives={incentives} />
}

export default IncentivesFooter
