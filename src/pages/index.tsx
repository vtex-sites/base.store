import { useSession } from '@faststore/sdk'
import { gql } from '@vtex/graphql-utils'
import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React, { lazy, Suspense, useMemo } from 'react'
import { mark } from 'src/sdk/tests/mark'
import type { PageProps } from 'gatsby'
import type {
  HomePageQueryQuery,
  ServerHomePageQueryQuery,
} from '@generated/graphql'

const BannerText = lazy(
  () => import(/* webpackMode: "eager" */ 'src/components/sections/BannerText')
)

const Hero = lazy(
  () => import(/* webpackMode: "eager" */ 'src/components/sections/Hero')
)

const ProductShelf = lazy(
  () =>
    import(/* webpackMode: "eager" */ 'src/components/sections/ProductShelf')
)

const ProductTiles = lazy(
  () =>
    import(/* webpackMode: "eager" */ 'src/components/sections/ProductTiles')
)

const IncentivesHeader = lazy(
  () =>
    import(
      /* webpackMode: "eager" */ 'src/components/sections/Incentives/IncentivesHeader'
    )
)

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
        WARNING: Do not import or render components from any
        other folder than '../components/sections' in here.

        This is necessary to keep the integration with the CMS
        easy and consistent, enabling the change and reorder
        of elements on this page.

        If needed, wrap your component in a <Section /> component
        (not the HTML tag) before rendering it here.
      */}
      <Suspense fallback={null}>
        <Hero
          title="New Products Available"
          subtitle="At FastStore you can shop the best tech of 2022. Enjoy and get 10% off on your first purchase."
          linkText="See all"
          link="/"
          imageSrc="https://storeframework.vtexassets.com/arquivos/ids/190897/Photo.jpg"
          imageAlt="Quest 2 Controller on a table"
        />
      </Suspense>

      <Suspense fallback={null}>
        <IncentivesHeader />
      </Suspense>

      <Suspense fallback={null}>
        <ProductShelf products={products?.slice(0, 5)} title="Most Wanted" />
      </Suspense>

      <Suspense fallback={null}>
        <ProductTiles products={products?.slice(5, 8)} title="Just Arrived" />
      </Suspense>

      <Suspense fallback={null}>
        <BannerText
          title="Receive our news and promotions in advance."
          caption="Enjoy and get 10% off on your first purchase."
          actionPath="/"
          actionLabel="Call to action"
        />
      </Suspense>

      <Suspense fallback={null}>
        <ProductShelf
          products={products?.slice(9, 14)}
          title="Deals & Promotions"
        />
      </Suspense>
    </>
  )
}

/**
 * This query is run during SSG
 * */
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
    const { execute } = await import('src/server')
    const { data } = await execute({
      operationName: querySSR,
      variables: { slug },
    })

    return {
      status: 200,
      props: data ?? {},
      headers: {
        'cache-control': 'public, max-age=0, stale-while-revalidate=31536000',
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
