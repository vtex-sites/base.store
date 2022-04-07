import Icon from 'src/components/ui/Icon'

import Incentives from './Incentives'
import Section from '../Section'

const incentives = [
  {
    icon: <Icon name="Truck" width={32} height={32} />,
    title: 'Buy online',
    firstLineText: 'Get Free Shipping',
  },
  {
    icon: <Icon name="Calendar" width={32} height={32} />,
    title: 'Free return',
    firstLineText: '30 days to return',
  },
  {
    icon: <Icon name="Gift" width={32} height={32} />,
    title: 'Gift cards',
    firstLineText: '$20 / $30 / $50',
  },
  {
    icon: <Icon name="Storefront" width={32} height={32} />,
    title: 'Physical Stores',
    firstLineText: '+40 Stores in Brazil',
  },
  {
    icon: <Icon name="ShieldCheck" width={32} height={32} />,
    title: 'Buy online',
    firstLineText: 'Get Free Shipping',
  },
]

function IncentivesHeader() {
  return (
    <Section>
      <Incentives incentives={incentives} classes="incentives--colored" />
    </Section>
  )
}

export default IncentivesHeader
