import React, { Suspense, useMemo } from 'react'
import Layout from 'src/views/Layout'
import View from 'src/views/collection'
import { graphql } from 'gatsby'
import type { PageProps } from 'gatsby'
import type { SearchParamsState } from '@vtex/store-sdk'
import { priceRange } from 'src/sdk/search/priceRange'

import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from './__generated__/CollectionPageQuery.graphql'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables & { slug: string }
>

// Build search state from page params
export const useSearchParams = (props: Props): SearchParamsState =>
  useMemo(() => {
    const {
      location: { pathname },
      data: { storeCollection },
    } = props

    const selectedFacets = storeCollection!.meta!.selectedFacets!
    const [base] = pathname.split(selectedFacets![0]!.value!)

    // TODO: Remove this bit of code once we have a graphql layer
    const facets = selectedFacets!.reduce((acc: any, facet: any) => {
      const { key } = facet
      const value =
        key === 'priceRange'
          ? priceRange.formatUrl(priceRange.parseQuery(facet.value)!)
          : facet.value

      acc.push({ key, value })

      return acc
    }, [] as SearchParamsState['selectedFacets'])

    return {
      page: 0,
      base,
      selectedFacets: facets,
      term: null,
      personalized: false,
      sort: 'score-desc',
    }
  }, [props])

function Page(props: Props) {
  const searchParams = useSearchParams(props)

  return (
    <Layout>
      <Suspense fallback={<div>...loading</div>}>
        <View {...props} searchParams={searchParams} />
      </Suspense>
    </Layout>
  )
}

/**
 * This query is run during SSG
 * */
export const query = graphql`
  query CollectionPageQuery($id: String!) {
    site {
      ...CollectionSeoFragment_site
    }

    storeCollection(id: { eq: $id }) {
      ...CollectionSeoFragment_storeCollection
      meta {
        selectedFacets {
          key
          value
        }
      }
    }
  }
`

export default Page
