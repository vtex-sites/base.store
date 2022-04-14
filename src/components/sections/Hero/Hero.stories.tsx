import { HelmetProvider } from 'react-helmet-async'
import Icon from 'src/components/ui/Icon'

import type { HeroProps } from '.'
import Hero from '.'

export default {
  component: Hero,
  title: 'Components/Hero',
}

const Template = ({ ...args }: HeroProps) => (
  <HelmetProvider>
    <Hero {...args} />
  </HelmetProvider>
)

export const Default = Template.bind({})

Default.args = {
  title: 'New Products Available',
  subtitle:
    'At BaseStore you can shop the best tech of 2022. Enjoy and get 10% off on your first purchase.',
  link: '/',
  linkText: 'See all',
  imageSrc:
    'https://storeframework.vtexassets.com/arquivos/ids/190897/Photo.jpg',
  imageAlt: 'Quest 2 Controller on a table',
  variant: 'primary',
  colorVariant: 'light',
  icon: <Icon name="Headphones" width={48} height={48} weight="thin" />,
}
