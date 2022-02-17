import '../styles/pages/product-listing-page.scss'

import { SearchProvider, useSession } from '@faststore/sdk'
import { gql } from '@vtex/graphql-utils'
import { graphql } from 'gatsby'
import { BreadcrumbJsonLd, GatsbySeo } from 'gatsby-plugin-next-seo'
import { Headphones as HeadphonesIcon } from 'phosphor-react'
import React, { useEffect, useMemo } from 'react'
import Breadcrumb from 'src/components/sections/Breadcrumb'
import Hero from 'src/components/sections/Hero'
import ProductGallery from 'src/components/sections/ProductGallery'
import ProductShelf from 'src/components/sections/ProductShelf'
import ScrollToTopButton from 'src/components/ui/ScrollToTopButton'
import { ITEMS_PER_PAGE } from 'src/constants'
import { useSearchParams } from 'src/hooks/useSearchParams'
import { applySearchState } from 'src/sdk/search/state'
import { mark } from 'src/sdk/tests/mark'
import { execute } from 'src/server'
import type { PageProps } from 'gatsby'
import type {
  CollectionPageQueryQuery,
  ServerCollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from '@generated/graphql'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
  unknown,
  ServerCollectionPageQueryQuery
> & { slug: string }

function Page(props: Props) {
  const {
    data: { site },
    serverData: { collection, allProducts },
    location: { host },
    params: { slug },
  } = props

  const { locale } = useSession()
  const searchParams = useSearchParams(props)
  const youMightAlsoLikeProducts = useMemo(
    () => allProducts?.edges.map((edge) => edge.node),
    [allProducts]
  )

  const { page } = searchParams
  const title = collection?.seo.title ?? site?.siteMetadata?.title ?? ''
  const pageQuery = page !== 0 ? `?page=${page}` : ''
  const canonical =
    host !== undefined
      ? `https://${host}/${slug}/${pageQuery}`
      : `/${slug}/${pageQuery}`

  const notFound = !collection

  useEffect(() => {
    if (notFound) {
      window.location.href = `/404/?from=${encodeURIComponent(
        window.location.pathname
      )}`
    }
  }, [notFound])

  // Collection not found
  if (notFound) {
    return null
  }

  return (
    <SearchProvider
      onChange={applySearchState}
      itemsPerPage={ITEMS_PER_PAGE}
      {...searchParams}
    >
      {/* SEO */}
      <GatsbySeo
        title={title}
        titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
        description={site?.siteMetadata?.description ?? ''}
        canonical={canonical}
        language={locale}
        openGraph={{
          type: 'website',
          title,
          description: site?.siteMetadata?.description ?? '',
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={collection?.breadcrumbList.itemListElement ?? []}
      />

      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}

      <section className="product-listing__breadcrumb / grid-content">
        <Breadcrumb
          breadcrumbList={collection?.breadcrumbList.itemListElement}
          name={title}
        />
      </section>

      <div className="product-listing__hero">
        <section className="page__section">
          <Hero
            variant="small"
            title={title}
            subtitle={`All the amazing ${title} from the brands we partner with.`}
            imageSrc="https://storeframework.vtexassets.com/arquivos/ids/190897/Photo.jpg"
            imageAlt="Quest 2 Controller on a table"
            icon={<HeadphonesIcon size={48} weight="thin" />}
          />
        </section>
      </div>

      <ProductGallery title={title} slug={slug} />

      {youMightAlsoLikeProducts?.length > 0 && (
        <section className="page__section page__section-shelf page__section-divisor / grid-section">
          <h2 className="title-section / grid-content">You might also like</h2>
          <div className="page__section-content">
            <ProductShelf products={youMightAlsoLikeProducts.slice(0, 5)} />
          </div>
        </section>
      )}

      <div className="product-listing__scroll-top">
        <ScrollToTopButton />
      </div>
    </SearchProvider>
  )
}

/**
 * This query is run during SSG
 * */
export const querySSG = graphql`
  query CollectionPageQuery {
    site {
      siteMetadata {
        titleTemplate
        title
        description
      }
    }
  }
`

/**
 * This query is run during SSG
 * */
export const querySSR = gql`
  query ServerCollectionPageQuery($slug: String!) {
    collection(slug: $slug) {
      seo {
        title
        description
      }
      breadcrumbList {
        itemListElement {
          item
          name
          position
        }
      }
      meta {
        selectedFacets {
          key
          value
        }
      }
    }

    allProducts(first: 6, after: "0") {
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
