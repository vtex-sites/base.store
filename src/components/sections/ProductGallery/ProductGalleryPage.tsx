import { gql } from '@vtex/gatsby-plugin-graphql'
import {
  useQuery,
  useQueryVariablesFromSearchParams,
  useSearch,
} from '@vtex/gatsby-theme-store'
import React from 'react'
import ProductGrid from 'src/components/product/ProductGrid'

import type {
  GalleryQueryQuery,
  GalleryQueryQueryVariables,
} from './__generated__/GalleryQuery.graphql'
import { GalleryQuery } from './__generated__/GalleryQuery.graphql'

interface Props {
  page: number
  display?: boolean
  initialData?: GalleryQueryQuery
}

function GalleryPage({ page, initialData, display }: Props) {
  const { searchParams, pageInfo } = useSearch()
  const variables = useQueryVariablesFromSearchParams(
    {
      ...searchParams,
      page,
    },
    pageInfo
  )

  const { data } = useQuery<GalleryQueryQuery, GalleryQueryQueryVariables>({
    ...GalleryQuery,
    variables,
    initialData,
    revalidateOnMount: true,
  })

  const products = data?.vtex.productSearch?.products as any

  if (display === false || products == null) {
    return null
  }

  return <ProductGrid products={products} />
}

export const query = gql`
  query GalleryQuery(
    $fullText: String
    $selectedFacets: [VTEX_SelectedFacetInput!]
    $from: Int
    $to: Int
    $sort: String
    $hideUnavailableItems: Boolean = false
  ) {
    vtex {
      productSearch(
        hideUnavailableItems: $hideUnavailableItems
        selectedFacets: $selectedFacets
        fullText: $fullText
        from: $from
        to: $to
        orderBy: $sort
      ) {
        products {
          ...ProductSummary_product
        }
      }
    }
  }
`

export default GalleryPage
