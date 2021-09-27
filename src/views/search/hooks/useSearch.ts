import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useSearchVariablesFromSearchState } from 'src/sdk/search/useSearchVariablesFromSearchState'
import type { SearchParamsState } from '@vtex/store-sdk'
import type {
  FullTextSearchQueryQuery,
  FullTextSearchQueryQueryVariables,
} from '@generated/FullTextSearchQuery.graphql'
import { FullTextSearchQuery } from '@generated/FullTextSearchQuery.graphql'

export const useSearch = (searchParams: SearchParamsState) => {
  const variables = useSearchVariablesFromSearchState(searchParams)

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
    $first: Int!
    $after: String
    $sort: StoreSort
    $term: String!
    $selectedFacets: [StoreSelectedFacet!]!
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
      facets {
        ...ProductGallery_facets
      }
    }
  }
`
