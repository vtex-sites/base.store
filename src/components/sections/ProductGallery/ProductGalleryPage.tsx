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

function GalleryPage({ page, fallbackData, display }: Props) {
  const {
    searchParams,
    pageInfo: { size },
  } = useSearch()

  const variables = useSearchVariables({
    ...searchParams,
    page,
  })

  const products = useSearchQuery(variables, {
    fallbackData,
  })

  if (display === false || products == null) {
    return null
  }

  return <ProductGrid products={products} page={page} pageSize={size} />
}

export default GalleryPage
