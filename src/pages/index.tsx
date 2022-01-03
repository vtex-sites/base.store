import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'
import BannerText from 'src/components/sections/BannerText'
import ProductTiles from 'src/components/sections/ProductTiles'
import Hero from 'src/components/sections/Hero'
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
      <Hero
        title="New Products Available"
        subtitle="Lorem ipsum dolor amet, consectetur adipiscing elit. Lorem ipsum."
        linkText="See all"
        link="/"
        imageSrc="https://storecomponents.vtexassets.com/assets/vtex.file-manager-graphql/images/edce348c-068c-4fb9-91f2-7d235d596e0f___b2822f893b14f87337d08f07f0e520ab.jpg"
        imageAlt="A person with hands on the pocket, carrying a round straw bag"
      />

      <IncentivesHeader />

      {products && products?.length > 0 && (
        <section className="grid-section grid-content">
          <h2 className="title-section / grid-content">Just Arrived</h2>
          <div className="page__section-content">
            <ProductTiles products={products} />
          </div>
        </section>
      )}

      <BannerText
        title="Receive our news and promotions in advance."
        caption="Enjoy and get 10% off your first purchase."
        actionPath="/"
        actionLabel="Call to action"
      />
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

    allStoreProduct(limit: 10) {
      nodes {
        ...ProductSummary_product
      }
    }
  }
`

export default Page
