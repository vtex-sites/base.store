import React from 'react'
import IconSVG from 'src/components/common/IconSVG'

import Incentives from './Incentives'

function IncentivesFooter() {
  const incentives = [
    {
      icon: <IconSVG name="ShieldCheck" width={32} height={32} />,
      firstLineText: 'Trusted',
      secondLineText: 'by SafeCon',
    },
    {
      icon: <IconSVG name="Medal" width={32} height={32} />,
      firstLineText: 'Quality',
      secondLineText: 'Products',
    },
    {
      icon: <IconSVG name="CircleWavyCheck" width={32} height={32} />,
      firstLineText: '3-years',
      secondLineText: 'Guarantee',
    },
    {
      icon: <IconSVG name="Storefront" width={32} height={32} />,
      firstLineText: 'Pickup',
      secondLineText: 'Options',
    },
    {
      icon: <IconSVG name="Truck" width={32} height={32} />,
      firstLineText: 'Free',
      secondLineText: 'Shipping',
    },
  ]

  return <Incentives incentives={incentives} />
}

export default IncentivesFooter
