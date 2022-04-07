import Icon from 'src/components/ui/Icon'

import Incentives from './Incentives'

function IncentivesFooter() {
  const incentives = [
    {
      icon: <Icon name="ShieldCheck" width={32} height={32} />,
      firstLineText: 'Trusted',
      secondLineText: 'by SafeCon',
    },
    {
      icon: <Icon name="Medal" width={32} height={32} />,
      firstLineText: 'Quality',
      secondLineText: 'Products',
    },
    {
      icon: <Icon name="CircleWavyCheck" width={32} height={32} />,
      firstLineText: '3-years',
      secondLineText: 'Guarantee',
    },
    {
      icon: <Icon name="Storefront" width={32} height={32} />,
      firstLineText: 'Pickup',
      secondLineText: 'Options',
    },
    {
      icon: <Icon name="Truck" width={32} height={32} />,
      firstLineText: 'Free',
      secondLineText: 'Shipping',
    },
  ]

  return <Incentives incentives={incentives} />
}

export default IncentivesFooter
