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
      firstLineText: 'Trusted',
      secondLineText: 'by SafeCon',
    },
    {
      icon: <MedalIcon size={32} />,
      firstLineText: 'Quality',
      secondLineText: 'Products',
    },
    {
      icon: <CircleWavyCheckIcon size={32} />,
      firstLineText: '3-years',
      secondLineText: 'Guarantee',
    },
    {
      icon: <StorefrontIcon size={32} />,
      firstLineText: 'Pickup',
      secondLineText: 'Options',
    },
    {
      icon: <TruckIcon size={32} />,
      firstLineText: 'Free',
      secondLineText: 'Shipping',
    },
  ]

  return <Incentives incentives={incentives} />
}

export default IncentivesFooter
