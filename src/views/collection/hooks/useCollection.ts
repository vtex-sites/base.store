import { gql } from '@vtex/graphql-utils'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useSearchVariables } from 'src/sdk/search/useSearchQuery'
import type {
  CurrencyCode,
  Item,
  SearchParamsState,
  ViewItemListEvent,
} from '@faststore/sdk'
import { useSession } from '@faststore/sdk'
import type {
  CollectionSearchQueryQueryVariables,
  CollectionSearchQueryQuery,
} from '@generated/graphql'
import { useMemo } from 'react'

export const useCollection = (searchParams: SearchParamsState) => {
  const variables = useSearchVariables(searchParams)

  const {
    currency: { code },
  } = useSession()

  const currency = code as CurrencyCode

  const query = useQuery<
    CollectionSearchQueryQuery,
    CollectionSearchQueryQueryVariables
  >(CollectionSearchQuery, variables)

  const { data } = query

  const products: Item[] = useMemo(() => {
    return (
      data?.search.products.edges.map(({ node: product }) => {
        return {
          item_id: product.id,
          item_name: product.name,
          currency,
          discount:
            product.offers.offers[0].listPrice - product.offers.offers[0].price,
          item_brand: product.brand.name,
          item_variant: product.isVariantOf.name,
          location_id: product.id,
          price: product.offers.offers[0].price,
        }
      }) ?? []
    )
  }, [currency, data?.search.products.edges])

  const event: ViewItemListEvent = {
    type: 'view_item_list',
    data: {
      items: products,
    },
  }

  return { query, event }
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
