import { GalleryQuery } from '@generated/GalleryQuery.graphql'
import { gql } from '@vtex/gatsby-plugin-graphql'
import React from 'react'
import ProductGrid from 'src/components/product/ProductGrid'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useQueryVariablesFromSearchParams } from 'src/sdk/search/useQueryVariablesFromSearchParams'
import { useSearch } from 'src/sdk/search/useSearch'
import type {
  GalleryQueryQuery,
  GalleryQueryQueryVariables,
} from '@generated/GalleryQuery.graphql'

interface Props {
  page: number
  display?: boolean
  initialData?: GalleryQueryQuery
}

const useProductList = (page: number, initialData?: GalleryQueryQuery) => {
  const { searchParams } = useSearch()
  const variables = useQueryVariablesFromSearchParams({
    ...searchParams,
    page,
  })

  const { data } = useQuery<GalleryQueryQuery, GalleryQueryQueryVariables>({
    ...GalleryQuery,
    variables,
    initialData,
    revalidateOnMount: true,
  })

  return data?.vtex.productSearch?.products as any
}

function GalleryPage({ page, initialData, display }: Props) {
  const products = useProductList(page, initialData)

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
