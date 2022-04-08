import Incentives from './Incentives'
import Section from '../Section'

interface Incentive {
  icon: string
  title?: string
  firstLineText: string
  secondLineText?: string
}

interface Props {
  incentives: Incentive[]
  classes?: string
}

function IncentivesHeader({ incentives }: Props) {
  return (
    <Section>
      <Incentives incentives={incentives} classes="incentives--colored" />
    </Section>
  )
}

export default IncentivesHeader
