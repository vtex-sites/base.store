import { gql } from '@vtex/graphql-utils'
import { useSession } from '@faststore/sdk'
import { useMemo } from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'
import type { SearchParamsState } from '@faststore/sdk'
import type {
  SearchQueryQuery,
  SearchQueryQueryVariables,
} from '@generated/graphql'

import { useQuery } from '../graphql/useQuery'
import type { QueryOptions } from '../graphql/useQuery'

export const useSearchVariables = (params: SearchParamsState) => {
  const { channel } = useSession()
  const { page, sort, term, selectedFacets } = params

  return useMemo(
    () => ({
      first: ITEMS_PER_PAGE,
      after: (page * ITEMS_PER_PAGE).toString(),
      sort,
      term: term ?? '',
      selectedFacets: [
        ...selectedFacets.map(({ key, value }) => ({ key, value })),
        { key: 'channel', value: channel! },
      ],
    }),
    [channel, page, selectedFacets, sort, term]
  )
}

/**
 * Use this hook for fetching a list of products, like in search results and shelfs
 */
export const useSearchQuery = (
  variables: SearchQueryQueryVariables,
  options?: QueryOptions
) => {
  const { data } = useQuery<SearchQueryQuery, SearchQueryQueryVariables>(
    SearchQuery,
    variables,
    options
  )

  return data?.search.products
}

export const SearchQuery = gql`
  query SearchQuery(
    $first: Int!
    $after: String
    $sort: StoreSort
    $term: String
    $selectedFacets: [IStoreSelectedFacet!]!
  ) {
    search(
      first: $first
      after: $after
      sort: $sort
      term: $term
      selectedFacets: $selectedFacets
    ) {
      products {
        ...ProductGallery_products
        edges {
          node {
            ...ProductSummary_product
          }
        }
      }
    }
  }
`
