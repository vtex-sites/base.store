import { gql } from '@vtex/graphql-utils'
import type {
  ProductsQueryQuery,
  ProductsQueryQueryVariables,
} from '@generated/graphql'

import { prefetchQuery } from '../graphql/prefetchQuery'
import { useQuery } from '../graphql/useQuery'
import type { QueryOptions } from '../graphql/useQuery'

export const query = gql`
  query ProductsQuery(
    $first: Int!
    $after: String!
    $sort: StoreSort!
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
        pageInfo {
          totalCount
        }
        edges {
          node {
            ...ProductSummary_product
          }
        }
      }
    }
  }
`

/**
 * Use this hook for fetching a list of products, like in search results and shelves
 */
export const useProductsQuery = (
  variables: ProductsQueryQueryVariables,
  options?: QueryOptions
) => {
  const { data } = useQuery<ProductsQueryQuery, ProductsQueryQueryVariables>(
    query,
    variables,
    options
  )

  return data?.search.products
}

export const prefetchProductsQuery = (
  variables: ProductsQueryQueryVariables,
  options?: QueryOptions
) => prefetchQuery(query, variables, options)
