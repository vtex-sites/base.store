import { GalleryQuery } from '@generated/GalleryQuery.graphql'
import { gql } from '@vtex/gatsby-plugin-graphql'
import React from 'react'
import ProductGrid from 'src/components/product/ProductGrid'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useSearchVariablesFromSearchState } from 'src/sdk/search/useSearchVariablesFromSearchState'
import { useSearch } from 'src/sdk/search/useSearch'
import type {
  GalleryQueryQuery,
  GalleryQueryQueryVariables,
} from '@generated/GalleryQuery.graphql'

interface Props {
  page: number
  display?: boolean
  fallbackData?: GalleryQueryQuery
}

const useProductList = (page: number, fallbackData?: GalleryQueryQuery) => {
  const { searchParams } = useSearch()
  const variables = useSearchVariablesFromSearchState({
    ...searchParams,
    page,
  })

  const { data } = useQuery<GalleryQueryQuery, GalleryQueryQueryVariables>({
    ...GalleryQuery,
    variables,
    fallbackData,
    revalidateOnMount: true,
  })

  return data?.search.products
}

function GalleryPage({ page, fallbackData, display }: Props) {
  const products = useProductList(page, fallbackData)

  if (display === false || products == null) {
    return null
  }

  return <ProductGrid products={products} />
}

export const query = gql`
  query GalleryQuery(
    $first: Int!
    $after: String
    $sort: StoreSort
    $term: String
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
    }
  }
`

export default GalleryPage
