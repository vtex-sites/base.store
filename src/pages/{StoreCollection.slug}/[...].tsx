import { parseSearchParamsState } from '@vtex/store-sdk'
import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import { priceRange } from 'src/sdk/search/priceRange'
import View from 'src/views/collection'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { PageProps } from 'gatsby'
import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from '@generated/CollectionPageQuery.graphql'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables & { slug: string }
>

const useSearchParams = (props: Props): SearchParamsState => {
  return useMemo(() => {
    const {
      location: { href, pathname },
      data: { storeCollection },
      params: { '*': wildcard },
    } = props

    if (wildcard?.length > 0) {
      return parseSearchParamsState(new URL(href))
    }

    const { selectedFacets } = storeCollection!.meta
    const [base] = pathname.split(selectedFacets[0].value)

    // TODO: Remove this bit of code once we have a graphql layer
    const facets = selectedFacets.reduce((acc: any, facet: any) => {
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
      sort: 'score_desc',
    }
  }, [props])
}

function Page(props: Props) {
  const searchParams = useSearchParams(props)

  return <View {...props} searchParams={searchParams} />
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
