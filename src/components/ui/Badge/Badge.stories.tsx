import type { BadgeProps } from '@faststore/ui'

import { Badge } from '.'

export default {
  component: Badge,
  title: 'Components/Badge',
}

const Template = ({ children, ...args }: BadgeProps) => (
  <Badge {...args}>{children}</Badge>
)

export const Default = Template.bind({})

Default.args = {
  children: '50% off',
  small: true,
  interactive: false,
  variant: 'neutral	',
}
