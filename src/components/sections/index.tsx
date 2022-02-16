import loadable from '@loadable/component'

const Section = {
  BannerText: loadable(() => import('./BannerText'), { ssr: true }),
  Breadcrumb: loadable(() => import('./Breadcrumb'), { ssr: true }),
  Hero: loadable(() => import('./Hero'), { ssr: true }),
  Newsletter: loadable(() => import('./Newsletter'), { ssr: true }),
  ProductDetails: loadable(() => import('./ProductDetails'), { ssr: true }),
  ProductGallery: loadable(() => import('./ProductGallery'), { ssr: true }),
  ProductShelf: loadable(() => import('./ProductShelf'), { ssr: true }),
  ProductTiles: loadable(() => import('./ProductTiles'), { ssr: true }),
  Incentives: loadable(() => import('./Incentives'), { ssr: true }),
  IncentivesHeader: loadable(() => import('./Incentives/IncentivesHeader'), {
    ssr: true,
  }),
}

export default Section
