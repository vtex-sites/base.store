import { parseSearchState, SearchProvider, useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { BreadcrumbJsonLd, GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import Loadable from '@loadable/component'
import { ITEMS_PER_PAGE } from 'src/constants'
import { applySearchState } from 'src/sdk/search/state'
import { Headphones as HeadphonesIcon } from 'phosphor-react'
import Breadcrumb from 'src/components/ui/Breadcrumb'
import Hero from 'src/components/sections/Hero'
import type { SearchState } from '@faststore/sdk'
import type { PageProps } from 'gatsby'
import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from '@generated/graphql'
import type { BreadcrumbProps } from 'src/components/ui/Breadcrumb'

import '../styles/pages/product-listing.scss'

const ScrollToTopButton = Loadable(
  () => import('src/components/ui/ScrollToTopButton')
)

const ProductGallery = Loadable(
  () => import('src/components/sections/ProductGallery')
)

const ProductShelf = Loadable(
  () => import('src/components/sections/ProductShelf')
)

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables
> & { slug: string }

const useSearchParams = (props: Props): SearchState => {
  const {
    location: { href, pathname },
    data,
  } = props

  const selectedFacets = data?.collection?.meta.selectedFacets

  return useMemo(() => {
    const maybeState = href ? parseSearchState(new URL(href)) : null

    return {
      page: maybeState?.page ?? 0,
      base: maybeState?.base ?? pathname,
      selectedFacets:
        maybeState && maybeState.selectedFacets.length > 0
          ? maybeState.selectedFacets
          : selectedFacets ?? [],
      term: maybeState?.term ?? null,
      sort: maybeState?.sort ?? 'score_desc',
    }
  }, [href, pathname, selectedFacets])
}

function Page(props: Props) {
  const {
    data: { site, collection, allStoreProduct },
    location: { host },
    params: { slug },
  } = props

  const { locale } = useSession()
  const searchParams = useSearchParams(props)

  const { page } = searchParams
  const title = collection?.seo.title ?? site?.siteMetadata?.title ?? ''
  const pageQuery = page !== 0 ? `?page=${page}` : ''
  const canonical =
    host !== undefined
      ? `https://${host}/${slug}/${pageQuery}`
      : `/${slug}/${pageQuery}`

  const youMightAlsoLikeProducts = useMemo(
    () => allStoreProduct?.nodes,
    [allStoreProduct]
  )

  const haveYouMightAlsoLikeProducts =
    youMightAlsoLikeProducts && youMightAlsoLikeProducts?.length > 0

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

      <div className="product-listing__breadcrumb / grid-content">
        <BreadcrumbWrapper
          breadcrumbList={collection?.breadcrumbList.itemListElement}
          name={title}
        />
      </div>

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

      <div className="product-listing / grid-content-full">
        <div className="product-listing__content-grid / grid-content">
          <ProductGallery title={title} />
        </div>
      </div>

      {haveYouMightAlsoLikeProducts && (
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

interface BreadcrumbWrapperProps
  extends Partial<Pick<BreadcrumbProps, 'breadcrumbList'>> {
  name: string
}

function BreadcrumbWrapper({ breadcrumbList, name }: BreadcrumbWrapperProps) {
  const fallback = [{ item: '/', name, position: 1 }]
  const list = breadcrumbList ?? fallback

  return <Breadcrumb breadcrumbList={list} />
}

/**
 * This query is run during SSG
 * */
export const query = graphql`
  query CollectionPageQuery($id: String!) {
    site {
      siteMetadata {
        titleTemplate
        title
        description
      }
    }

    collection: storeCollection(id: { eq: $id }) {
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

    allStoreProduct(limit: 5) {
      nodes {
        ...ProductSummary_product
      }
    }
  }
`

export default Page
