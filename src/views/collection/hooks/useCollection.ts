import { gql } from '@vtex/graphql-utils'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useSearchVariables } from 'src/sdk/search/useSearchQuery'
import type { SearchParamsState } from '@faststore/sdk'
import type {
  CollectionSearchQueryQueryVariables,
  CollectionSearchQueryQuery,
} from '@generated/graphql'

export const useCollection = (searchParams: SearchParamsState) => {
  const variables = useSearchVariables(searchParams)

  return useQuery<
    CollectionSearchQueryQuery,
    CollectionSearchQueryQueryVariables
  >(CollectionSearchQuery, variables)
}

/**
 * This query is run on the browser and contains
 * the current search state of the user
 */
export const CollectionSearchQuery = gql`
  query CollectionSearchQuery(
    $first: Int!
    $after: String
    $sort: StoreSort
    $selectedFacets: [IStoreSelectedFacet!]!
  ) {
    search(
      first: $first
      after: $after
      sort: $sort
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
