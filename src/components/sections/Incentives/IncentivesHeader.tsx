import type { ElementType, PropsWithChildren } from 'react'
import React, { lazy, Suspense } from 'react'

import Incentives from './Incentives'

const TruckIcon = lazy(() => import('phosphor-react/src/icons/Truck'))
const CalendarIcon = lazy(() => import('phosphor-react/src/icons/Calendar'))
const GiftIcon = lazy(() => import('phosphor-react/src/icons/Gift'))
const StorefrontIcon = lazy(() => import('phosphor-react/src/icons/Storefront'))
const ShieldCheckIcon = lazy(
  () => import('phosphor-react/src/icons/ShieldCheck')
)

const LazyIcon = ({
  icon: Icon,
}: PropsWithChildren<{ icon: ElementType<{ size: number }> }>) => {
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <Suspense fallback={null}>
      <Icon size={32} />
    </Suspense>
  )
}

const incentives = [
  {
    icon: <LazyIcon icon={TruckIcon} />,
    title: 'Buy online',
    firstLineText: 'Get Free Shipping',
  },
  {
    icon: <LazyIcon icon={CalendarIcon} />,
    title: 'Free return',
    firstLineText: '30 days to return',
  },
  {
    icon: <LazyIcon icon={GiftIcon} />,
    title: 'Gift cards',
    firstLineText: '$20 / $30 / $50',
  },
  {
    icon: <LazyIcon icon={StorefrontIcon} />,
    title: 'Physical Stores',
    firstLineText: '+40 Stores in Brazil',
  },
  {
    icon: <LazyIcon icon={ShieldCheckIcon} />,
    title: 'Buy online',
    firstLineText: 'Get Free Shipping',
  },
]

function IncentivesHeader() {
  return <Incentives incentives={incentives} classes="incentives--colored" />
}

export default IncentivesHeader
