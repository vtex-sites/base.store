import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useSearchVariables } from 'src/sdk/search/useSearchQuery'
import type { SearchParamsState } from '@vtex/store-sdk'
import type {
  FullTextSearchQueryQuery,
  FullTextSearchQueryQueryVariables,
} from '@generated/FullTextSearchQuery.graphql'
import { FullTextSearchQuery } from '@generated/FullTextSearchQuery.graphql'

export const useSearch = (searchParams: SearchParamsState) => {
  const variables = useSearchVariables(searchParams)

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
      facets {
        ...ProductGallery_facets
      }
    }
  }
`
