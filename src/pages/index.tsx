import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'
import BannerText from 'src/components/sections/BannerText'
import Hero from 'src/components/sections/Hero'
import Tiles, { Tile } from 'src/components/ui/Tiles'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'
import ProductTile from 'src/components/product/ProductTile'

import '../styles/pages/index.scss'

export type Props = PageProps<HomePageQueryQuery>

function Page(props: Props) {
  const {
    data: { site },
    location: { pathname, host },
  } = props

  const { locale } = useSession()

  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `https://${host}${pathname}`
  const perPage = 10
  const productList = useProductsQuery({
    first: perPage,
    after: (perPage * 1).toString(),
    sort: 'score_desc',
    term: '',
    selectedFacets: [{ key: 'category-1', value: 'office' }],
  })

  const products = useMemo(
    () => productList?.edges.map((edge) => edge.node),
    [productList]
  )

  if (products == null) {
    return null
  }

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
      <main>
        <Hero
          title="New Products Available"
          subtitle="Lorem ipsum dolor amet, consectetur adipiscing elit. Lorem ipsum."
          linkText="See all"
          link="/"
          imageSrc="https://storecomponents.vtexassets.com/assets/vtex.file-manager-graphql/images/edce348c-068c-4fb9-91f2-7d235d596e0f___b2822f893b14f87337d08f07f0e520ab.jpg"
          imageAlt="A person with hands on the pocket, carrying a round straw bag"
        />
        <section className="grid-section grid-content">
          <h2 className="title-subsection">Just Arrived</h2>
          <div className="tiles-content">
            <Tiles>
              {products.slice(0, 3).map((product, idx) => (
                <Tile key={`${product.id}`}>
                  <ProductTile product={product} index={idx + 1} />
                </Tile>
              ))}
            </Tiles>
          </div>
        </section>
        <BannerText
          title="Receive our news and promotions in advance."
          caption="Enjoy and get 10% off your first purchase."
          actionPath="/"
          actionLabel="Call to action"
        />
      </main>
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
  }
`

export default Page
