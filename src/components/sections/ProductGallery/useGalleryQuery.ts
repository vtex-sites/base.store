import { useSearch, useSession } from '@faststore/sdk'
import { gql } from '@vtex/graphql-utils'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type {
  ProductGalleryQueryQuery as Query,
  ProductGalleryQueryQueryVariables as Variables,
} from '@generated/graphql'

/**
 * This query is run on the browser and contains
 * the current search state of the user
 */
export const query = gql`
  query ProductGalleryQuery(
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
      facets {
        ...Filter_facets
      }
    }
  }
`

export const useGalleryQuery = () => {
  const { channel } = useSession()
  const {
    state: { term, sort, selectedFacets, page },
    itemsPerPage,
  } = useSearch()

  const selectedFacetsWithExtraFacets = [
    ...selectedFacets,
    { key: 'channel', value: channel ?? '' },
  ]

  return useQuery<Query, Variables>(query, {
    first: itemsPerPage,
    after: (itemsPerPage * page).toString(),
    sort,
    term: term ?? '',
    selectedFacets: selectedFacetsWithExtraFacets,
  })
}
