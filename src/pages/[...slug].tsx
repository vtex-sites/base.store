import { parseSearchState, SearchProvider } from '@faststore/sdk'
import { gql } from '@vtex/graphql-utils'
import { BreadcrumbJsonLd, NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { useApplySearchState } from 'src/sdk/search/state'
import { useSiteUrl } from 'src/sdk/useSiteUrl'
import { execute } from 'src/server'
import type { SearchState } from '@faststore/sdk'
import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from '@generated/graphql'
import type { GetStaticPaths, GetStaticProps } from 'next'

const useSearchParams = (props: CollectionPageQueryQuery): SearchState => {
  const { collection } = props
  const { asPath, pathname } = useRouter()
  const siteUrl = useSiteUrl()

  const selectedFacets = collection?.meta.selectedFacets

  return useMemo(() => {
    const maybeState = siteUrl
      ? parseSearchState(new URL(asPath, siteUrl))
      : null

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
  }, [asPath, pathname, selectedFacets, siteUrl])
}

function Page(props: CollectionPageQueryQuery) {
  const { collection } = props
  const router = useRouter()
  const siteUrl = useSiteUrl()
  const searchParams = useSearchParams(props)
  const applySearchState = useApplySearchState()

  if (router.isFallback) {
    return <div>...loading</div>
  }

  if (!collection) {
    throw new Error('Not Found')
  }

  const { slug } = router.query
  const { page } = searchParams
  const title = collection?.seo.title
  const pageQuery = page !== 0 ? `?page=${page}` : ''
  const canonical = `${siteUrl}/${slug}/${pageQuery}`

  return (
    <SearchProvider
      onChange={applySearchState}
      itemsPerPage={ITEMS_PER_PAGE}
      {...searchParams}
    >
      {/* SEO */}
      <NextSeo title={title} canonical={canonical} />
      <BreadcrumbJsonLd
        itemListElements={collection?.breadcrumbList.itemListElement ?? []}
      />

      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <h1 data-testid="collection-page" className="absolute top-[-100px]">
        {title}
      </h1>

      <ProductGallery title={title} />
    </SearchProvider>
  )
}

/**
 * This query is run during SSG
 * */
export const querySSG = gql`
  query CollectionPageQuery($slug: String!) {
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
  }
`

export const getStaticProps: GetStaticProps<CollectionPageQueryQuery> = async (
  context
) => {
  const segments = context.params?.slug
  const slug = Array.isArray(segments) ? segments.join('/') : null

  if (typeof slug !== 'string') {
    throw new Error(`Slug needs to be string, received ${typeof slug}`)
  }

  const response = await execute<
    CollectionPageQueryQuery,
    CollectionPageQueryQueryVariables
  >({
    operationName: querySSG,
    variables: {
      slug,
    },
  })

  if (response.errors != null || response.data == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: response.data,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  }
}

export default Page
