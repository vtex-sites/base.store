import type { BreadcrumbProps } from '.'
import Breadcrumb from '.'

export default {
  component: Breadcrumb,
  title: 'Components/Breadcrumb',
}

const breadcrumbList = [
  { item: 'item1', name: 'item1 Contrary to popular belief', position: 1 },
  {
    item: 'item2',
    name: 'item2 There are many variations of passages of Lorem',
    position: 2,
  },
  {
    item: 'item3',
    name: 'item3 There are many variations of passages of Lorem',
    position: 3,
  },
  {
    item: 'item4',
    name: 'item4 There are many variations of passages of Lorem',
    position: 4,
  },
]

const Template = ({ children, ...args }: BreadcrumbProps) => (
  <Breadcrumb {...args}>{children}</Breadcrumb>
)

export const WithDropdown = Template.bind({})

WithDropdown.args = {
  breadcrumbList: [
    ...breadcrumbList,
    {
      item: 'item5',
      name: 'item5 There are many variations of passages of Lorem',
      position: 5,
    },
  ],
}

export const Default = Template.bind({})

Default.args = {
  breadcrumbList,
}
