import React, { lazy } from 'react'
import LazyIcon from 'src/components/common/LazyIcon'

import Incentives from './Incentives'

const ShieldCheckIcon = lazy(
  () => import('phosphor-react/src/icons/ShieldCheck')
)

const MedalIcon = lazy(() => import('phosphor-react/src/icons/Medal'))
const CircleWavyCheckIcon = lazy(
  () => import('phosphor-react/src/icons/CircleWavyCheck')
)

const StorefrontIcon = lazy(() => import('phosphor-react/src/icons/Storefront'))
const TruckIcon = lazy(() => import('phosphor-react/src/icons/Truck'))

function IncentivesFooter() {
  const incentives = [
    {
      icon: <LazyIcon icon={ShieldCheckIcon} size={32} />,
      firstLineText: 'Trusted',
      secondLineText: 'by SafeCon',
    },
    {
      icon: <LazyIcon icon={MedalIcon} size={32} />,
      firstLineText: 'Quality',
      secondLineText: 'Products',
    },
    {
      icon: <LazyIcon icon={CircleWavyCheckIcon} size={32} />,
      firstLineText: '3-years',
      secondLineText: 'Guarantee',
    },
    {
      icon: <LazyIcon icon={StorefrontIcon} size={32} />,
      firstLineText: 'Pickup',
      secondLineText: 'Options',
    },
    {
      icon: <LazyIcon icon={TruckIcon} size={32} />,
      firstLineText: 'Free',
      secondLineText: 'Shipping',
    },
  ]

  return <Incentives incentives={incentives} />
}

export default IncentivesFooter
