import { CollectionSearchQuery } from '@generated/CollectionSearchQuery.graphql'
import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useSearchVariables } from 'src/sdk/search/useSearchVariables'
import type { SearchParamsState } from '@vtex/store-sdk'
import type {
  CollectionSearchQueryQuery,
  CollectionSearchQueryQueryVariables,
} from '@generated/CollectionSearchQuery.graphql'

export const useCollection = (searchParams: SearchParamsState) => {
  const variables = useSearchVariables(searchParams)

  return useQuery<
    CollectionSearchQueryQuery,
    CollectionSearchQueryQueryVariables
  >({
    ...CollectionSearchQuery,
    variables,
  })
}

/**
 * This query is run on the browser and contains
 * the current search state of the user
 */
export const clientSideQuery = gql`
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
