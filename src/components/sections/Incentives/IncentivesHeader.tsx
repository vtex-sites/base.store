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
      text: 'Get Free Shipping',
    },
    {
      icon: <CalendarIcon size={32} />,
      title: 'Free return',
      text: '30 days to return',
    },
    {
      icon: <GiftIcon size={32} />,
      title: 'Gift cards',
      text: '$20 / $30 / $50',
    },
    {
      icon: <StorefrontIcon size={32} />,
      title: 'Physical Stores',
      text: '+40 Stores in Brazil',
    },
    {
      icon: <ShieldCheckIcon size={32} />,
      title: 'Buy online',
      text: 'Get Free Shipping',
    },
  ]

  return <Incentives incentives={incentives} hasBackground />
}

export default IncentivesHeader
