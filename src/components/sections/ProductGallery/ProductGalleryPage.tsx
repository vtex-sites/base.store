import React from 'react'
import ProductGrid from 'src/components/product/ProductGrid'
import { useSearch } from 'src/sdk/search/useSearch'
import {
  useSearchQuery,
  useSearchVariables,
} from 'src/sdk/search/useSearchQuery'
import type { SearchQueryQuery } from '@generated/graphql'

interface Props {
  page: number
  display?: boolean
  fallbackData?: SearchQueryQuery
}

const useProducts = (page: number, fallbackData?: SearchQueryQuery) => {
  const { searchParams } = useSearch()
  const variables = useSearchVariables({
    ...searchParams,
    page,
  })

  return useSearchQuery(variables, {
    fallbackData,
  })
}

function GalleryPage({ page, fallbackData, display }: Props) {
  const products = useProducts(page, fallbackData)

  if (display === false || products == null) {
    return null
  }

  return <ProductGrid products={products} />
}

export default GalleryPage
