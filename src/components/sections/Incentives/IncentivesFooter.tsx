import React from 'react'
import IconSVG from 'src/components/common/IconSVG'

import Incentives from './Incentives'

function IncentivesFooter() {
  const incentives = [
    {
      icon: (
        <IconSVG name="ShieldCheck" width="32px" height="32px" loading="lazy" />
      ),
      firstLineText: 'Trusted',
      secondLineText: 'by SafeCon',
    },
    {
      icon: <IconSVG name="Medal" width="32px" height="32px" loading="lazy" />,
      firstLineText: 'Quality',
      secondLineText: 'Products',
    },
    {
      icon: (
        <IconSVG
          name="CircleWavyCheck"
          width="32px"
          height="32px"
          loading="lazy"
        />
      ),
      firstLineText: '3-years',
      secondLineText: 'Guarantee',
    },
    {
      icon: (
        <IconSVG name="Storefront" width="32px" height="32px" loading="lazy" />
      ),
      firstLineText: 'Pickup',
      secondLineText: 'Options',
    },
    {
      icon: <IconSVG name="Truck" width="32px" height="32px" loading="lazy" />,
      firstLineText: 'Free',
      secondLineText: 'Shipping',
    },
  ]

  return <Incentives incentives={incentives} />
}

export default IncentivesFooter
