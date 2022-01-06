import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'
import BannerText from 'src/components/sections/BannerText'
import ProductTiles from 'src/components/sections/ProductTiles'
import Hero from 'src/components/sections/Hero'
import ProductShelf from 'src/components/sections/ProductShelf'
import IncentivesHeader from 'src/components/sections/Incentives/IncentivesHeader'

import '../styles/pages/index.scss'

export type Props = PageProps<HomePageQueryQuery>

function Page(props: Props) {
  const {
    data: { site, allStoreProduct },
    location: { pathname, host },
  } = props

  const { locale } = useSession()

  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `https://${host}${pathname}`
  const products = useMemo(() => allStoreProduct?.nodes, [allStoreProduct])
  const haveProducts = products && products?.length > 0

  return (
    <>
      {/* SEO */}
      <GatsbySeo
        title={title}
        description={site?.siteMetadata?.description ?? ''}
        titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
        language={locale}
        canonical={siteUrl}
        openGraph={{
          type: 'website',
          url: siteUrl,
          title: title ?? '',
          description: site?.siteMetadata?.description ?? '',
        }}
      />
      <JsonLd
        json={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/s/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <section className="page__section">
        <Hero
          title="New Products Available"
          subtitle="At FastStore you can shop the best tech of 2022. Enjoy and get 10% off on your first purchase."
          linkText="See all"
          link="/"
          imageSrc="https://storeframework.vtexassets.com/arquivos/ids/190897/Photo.jpg"
          imageAlt="Quest 2 Controller on a table"
        />
      </section>

      <section className="page__section">
        <IncentivesHeader />
      </section>

      {haveProducts && (
        <section className="page__section page__section-shelf / grid-section">
          <h2 className="title-section / grid-content">Most Wanted</h2>
          <div className="page__section-content">
            <ProductShelf products={products.slice(0, 5)} />
          </div>
        </section>
      )}

      {haveProducts && (
        <section className="page__section / grid-section grid-content">
          <h2 className="title-section">Just Arrived</h2>
          <div className="page__section-content">
            <ProductTiles products={products.slice(5, 8)} />
          </div>
        </section>
      )}

      <section className="page__section / grid-section">
        <BannerText
          title="Receive our news and promotions in advance."
          caption="Enjoy and get 10% off on your first purchase."
          actionPath="/"
          actionLabel="Call to action"
        />
      </section>

      {haveProducts && (
        <section className="page__section page__section-shelf / grid-section">
          <h2 className="title-section / grid-content">Deals & Promotions</h2>
          <div className="page__section-content">
            <ProductShelf products={products.slice(9, 14)} />
          </div>
        </section>
      )}
    </>
  )
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
      }
    }

    allStoreProduct(limit: 14) {
      nodes {
        ...ProductSummary_product
      }
    }
  }
`

export default Page
