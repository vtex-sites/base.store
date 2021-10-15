import { SearchQuery } from '@generated/SearchQuery.graphql'
import { gql } from '@vtex/gatsby-plugin-graphql'
import { useSession } from '@vtex/store-sdk'
import { useMemo } from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'
import type {
  SearchQueryQuery,
  SearchQueryQueryVariables,
} from '@generated/SearchQuery.graphql'
import type { SearchParamsState } from '@vtex/store-sdk'

import { useQuery } from '../graphql/useQuery'
import type { QueryOptions } from '../graphql/useQuery'

type Options = Omit<QueryOptions, 'query' | 'operationName' | 'sha256Hash'> & {
  variables: SearchQueryQueryVariables
}

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
export const useSearchQuery = (options: Options) => {
  const { data } = useQuery<SearchQueryQuery, SearchQueryQueryVariables>({
    ...SearchQuery,
    ...options,
  })

  return data?.search.products
}

export const query = gql`
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
