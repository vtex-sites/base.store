import React from 'react'
import {
  Truck as TruckIcon,
  Calendar as CalendarIcon,
  Gift as GiftIcon,
  Storefront as StorefrontIcon,
  ShieldCheck as ShieldCheckIcon,
} from 'phosphor-react'

import Incentives from './Incentives'

function IncentivesHeader() {
  const incentives = [
    {
      icon: <TruckIcon size={32} />,
      title: 'Buy online',
      firstLineText: 'Get Free Shipping',
    },
    {
      icon: <CalendarIcon size={32} />,
      title: 'Free return',
      firstLineText: '30 days to return',
    },
    {
      icon: <GiftIcon size={32} />,
      title: 'Gift cards',
      firstLineText: '$20 / $30 / $50',
    },
    {
      icon: <StorefrontIcon size={32} />,
      title: 'Physical Stores',
      firstLineText: '+40 Stores in Brazil',
    },
    {
      icon: <ShieldCheckIcon size={32} />,
      title: 'Buy online',
      firstLineText: 'Get Free Shipping',
    },
  ]

  return <Incentives incentives={incentives} classes="incentives--colored" />
}

export default IncentivesHeader
