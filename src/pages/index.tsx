import { useSession } from '@faststore/sdk'
import { gql } from '@vtex/graphql-utils'
import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import BannerText from 'src/components/sections/BannerText'
import Hero from 'src/components/sections/Hero'
import IncentivesHeader from 'src/components/sections/Incentives/IncentivesHeader'
import ProductShelf from 'src/components/sections/ProductShelf'
import ProductTiles from 'src/components/sections/ProductTiles'
import { mark } from 'src/sdk/tests/mark'
import { execute } from 'src/server'
import type { PageProps } from 'gatsby'
import type {
  HomePageQueryQuery,
  ServerHomePageQueryQuery,
} from '@generated/graphql'

export type Props = PageProps<
  HomePageQueryQuery,
  unknown,
  unknown,
  ServerHomePageQueryQuery
>

function Page(props: Props) {
  const {
    data: { site },
    serverData: { allProducts },
    location: { pathname, host },
  } = props

  const { locale } = useSession()

  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `https://${host}${pathname}`
  const products = useMemo(
    () => allProducts?.edges.map((edge) => edge.node),
    [allProducts]
  )

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

export const querySSG = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
      }
    }
  }
`

/**
 * This query is run during SSR
 * */
export const querySSR = gql`
  query ServerHomePageQuery {
    allProducts(first: 15, after: "0") {
      edges {
        node {
          ...ProductSummary_product
        }
      }
    }
  }
`

export const getServerData = async ({
  params: { slug },
}: {
  params: Record<string, string>
}) => {
  try {
    const { data } = await execute({
      operationName: querySSR,
      variables: { slug },
    })

    return {
      status: 200,
      props: data ?? {},
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    }
  } catch (err) {
    console.error(err)

    return {
      status: 500,
      props: {},
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    }
  }
}

Page.displayName = 'Page'

export default mark(Page)
