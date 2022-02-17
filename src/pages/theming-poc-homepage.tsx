import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'
import Helmet from 'react-helmet'
import BannerText from 'src/components/sections/BannerText'
import ProductTiles from 'src/components/sections/ProductTiles'
import Hero from 'src/components/sections/Hero'
import ProductShelf from 'src/components/sections/ProductShelf'
import IncentivesHeader from 'src/components/sections/Incentives/IncentivesHeader'

import '../styles/pages/homepage.scss'
import '../styles/theming-poc.scss'
import '../styles/themes/new-theme.scss'

export type Props = PageProps<HomePageQueryQuery>

function Page(props: Props) {
  const {
    data: { allStoreProduct },
  } = props

  const products = useMemo(() => allStoreProduct?.nodes, [allStoreProduct])
  const haveProducts = products && products?.length > 0

  return (
    <div>
      <Helmet
        bodyAttributes={{
          class: 'new-theme',
        }}
      />
      <GatsbySeo
        title="UI Theming: Proof of Concept"
        language="en"
        noindex
        nofollow
      />
      <section data-base-section>
        <Hero
          title="New Products Available"
          subtitle="At FastStore you can shop the best tech of 2022. Enjoy and get 10% off on your first purchase."
          linkText="See all"
          link="/"
          imageSrc="https://storeframework.vtexassets.com/arquivos/ids/190897/Photo.jpg"
          imageAlt="Quest 2 Controller on a table"
        />
      </section>

      <section data-base-section>
        <IncentivesHeader />
      </section>

      {haveProducts && (
        <section
          data-base-section
          data-base-section-shelf
          className="grid-section"
        >
          <h2 className="grid-content">Most Wanted</h2>
          <div className="page__section-content">
            <ProductShelf products={products.slice(0, 5)} />
          </div>
        </section>
      )}

      {haveProducts && (
        <section
          data-base-section
          data-base-section-shelf
          className="grid-section"
        >
          <h2 className="grid-content">Just Arrived</h2>
          <div data-base-section-content className="grid-content">
            <ProductTiles products={products.slice(5, 8)} />
          </div>
        </section>
      )}

      <section data-base-section className="grid-section">
        <BannerText
          title="Receive our news and promotions in advance."
          caption="Enjoy and get 10% off on your first purchase."
          actionPath="/"
          actionLabel="Call to action"
        />
      </section>

      {haveProducts && (
        <section
          data-base-section
          data-base-section-shelf
          className="grid-section"
        >
          <h2 className="grid-content">Deals & Promotions</h2>
          <div data-base-section-content>
            <ProductShelf products={products.slice(9, 14)} />
          </div>
        </section>
      )}
    </div>
  )
}

export const query = graphql`
  query YetAnotherHomePageQuery {
    allStoreProduct(limit: 14) {
      nodes {
        ...ProductSummary_product
      }
    }
  }
`

export default Page
