import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useQueryVariablesFromSearchParams } from 'src/sdk/search/useQueryVariablesFromSearchParams'
import type { SearchParamsState } from '@vtex/store-sdk'

import type {
  FullTextSearchQueryQuery,
  FullTextSearchQueryQueryVariables,
} from '../__generated__/FullTextSearchQuery.graphql'
import { FullTextSearchQuery } from '../__generated__/FullTextSearchQuery.graphql'

export const useSearch = (searchParams: SearchParamsState) => {
  const variables = useQueryVariablesFromSearchParams(searchParams)
  const search = useQuery<
    FullTextSearchQueryQuery,
    FullTextSearchQueryQueryVariables
  >({
    ...FullTextSearchQuery,
    variables,
    suspense: true,
  })

  if (search.data == null) {
    throw new Error('Something went wrong while fetching the data')
  }

  return search
}

/**
 * This query is run on the browser
 * */
export const query = gql`
  query FullTextSearchQuery(
    $from: Int!
    $to: Int!
    $fullText: String
    $selectedFacets: [VTEX_SelectedFacetInput!]!
    $sort: String!
  ) {
    vtex {
      productSearch(
        from: $from
        to: $to
        orderBy: $sort
        fullText: $fullText
        selectedFacets: $selectedFacets
        hideUnavailableItems: false
        simulationBehavior: skip
      ) {
        products {
          ...ProductSummary_product
        }
        ...ProductGallery_productSearch
        totalCount: recordsFiltered
      }
      facets(
        fullText: $fullText
        selectedFacets: $selectedFacets
        operator: or
        behavior: "Static"
        removeHiddenFacets: true
      ) {
        facets {
          ...ProductGallery_facets
        }
      }
    }
  }
`
