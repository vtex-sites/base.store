import React from 'react'
import { Badge } from 'src/components/ui/Badge'

export default {
  component: Badge,
  title: 'Components/Badge',
}

const Template = ({ children, ...args }: any) => (
  <Badge {...args}>{children}</Badge>
)

export const Default = Template.bind({})
Default.args = {
  children: 'Something',
}
