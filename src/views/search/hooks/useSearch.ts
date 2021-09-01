import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useQueryVariablesFromSearchParams } from 'src/sdk/search/useQueryVariablesFromSearchParams'
import type { SearchParamsState } from '@vtex/store-sdk'
import type {
  FullTextSearchQueryQuery,
  FullTextSearchQueryQueryVariables,
} from '@generated/FullTextSearchQuery.graphql'
import { FullTextSearchQuery } from '@generated/FullTextSearchQuery.graphql'

export const useSearch = (searchParams: SearchParamsState) => {
  const variables = useQueryVariablesFromSearchParams(searchParams)

  return useQuery<FullTextSearchQueryQuery, FullTextSearchQueryQueryVariables>({
    ...FullTextSearchQuery,
    variables,
  })
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
