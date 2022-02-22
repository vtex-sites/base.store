import React, { lazy } from 'react'
import LazyIcon from 'src/components/common/LazyIcon'

import Incentives from './Incentives'

const TruckIcon = lazy(() => import('phosphor-react/src/icons/Truck'))
const CalendarIcon = lazy(() => import('phosphor-react/src/icons/Calendar'))
const GiftIcon = lazy(() => import('phosphor-react/src/icons/Gift'))
const StorefrontIcon = lazy(() => import('phosphor-react/src/icons/Storefront'))
const ShieldCheckIcon = lazy(
  () => import('phosphor-react/src/icons/ShieldCheck')
)

const incentives = [
  {
    icon: <LazyIcon icon={TruckIcon} size={32} />,
    title: 'Buy online',
    firstLineText: 'Get Free Shipping',
  },
  {
    icon: <LazyIcon icon={CalendarIcon} size={32} />,
    title: 'Free return',
    firstLineText: '30 days to return',
  },
  {
    icon: <LazyIcon icon={GiftIcon} size={32} />,
    title: 'Gift cards',
    firstLineText: '$20 / $30 / $50',
  },
  {
    icon: <LazyIcon icon={StorefrontIcon} size={32} />,
    title: 'Physical Stores',
    firstLineText: '+40 Stores in Brazil',
  },
  {
    icon: <LazyIcon icon={ShieldCheckIcon} size={32} />,
    title: 'Buy online',
    firstLineText: 'Get Free Shipping',
  },
]

function IncentivesHeader() {
  return <Incentives incentives={incentives} classes="incentives--colored" />
}

export default IncentivesHeader
