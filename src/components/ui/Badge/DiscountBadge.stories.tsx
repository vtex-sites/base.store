import { DiscountBadge } from '.'
import type { DiscountBadgeProps } from './DiscountBadge'

export default {
  component: DiscountBadge,
  title: 'Components/Badge',
}

const TemplateDiscount = ({ ...args }: DiscountBadgeProps) => (
  <DiscountBadge {...args} />
)

export const Discount = TemplateDiscount.bind({})

Discount.args = {
  small: true,
  listPrice: 45,
  spotPrice: 40,
}
