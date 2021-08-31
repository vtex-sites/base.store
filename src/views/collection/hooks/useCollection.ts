import { CollectionSearchQuery } from '@generated/CollectionSearchQuery.graphql'
import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useQueryVariablesFromSearchParams } from 'src/sdk/search/useQueryVariablesFromSearchParams'
import type { SearchParamsState } from '@vtex/store-sdk'
import type {
  CollectionSearchQueryQuery,
  CollectionSearchQueryQueryVariables,
} from '@generated/CollectionSearchQuery.graphql'

export const useCollection = (searchParams: SearchParamsState) => {
  const variables = useQueryVariablesFromSearchParams(searchParams)

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
    $to: Int!
    $from: Int!
    $selectedFacets: [VTEX_SelectedFacetInput!]!
    $sort: String!
  ) {
    vtex {
      productSearch(
        to: $to
        from: $from
        orderBy: $sort
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
        selectedFacets: $selectedFacets
        operator: or
        behavior: "Static"
        removeHiddenFacets: true
      ) {
        breadcrumb {
          ...CollectionSeoFragment_breadcrumb
        }
        facets {
          ...ProductGallery_facets
        }
      }
    }
  }
`
