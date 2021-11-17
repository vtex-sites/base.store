import React, { useMemo } from 'react'
import ProductGrid from 'src/components/product/ProductGrid'
import { useSearch } from 'src/sdk/search/useSearch'
import {
  useSearchQuery,
  useSearchVariables,
} from 'src/sdk/search/useSearchQuery'
import type { SearchQueryQuery } from '@generated/graphql'
import Sentinel from 'src/sdk/search/Sentinel'

interface Props {
  page: number
  display?: boolean
  fallbackData?: SearchQueryQuery
  title: string
}

function GalleryPage({ page, fallbackData, display, title }: Props) {
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

  const productsList = useMemo(() => {
    return products?.edges.map(({ node: product }) => product) ?? []
  }, [products])

  if (display === false || products == null) {
    return null
  }

  return (
    <>
      <ProductGrid products={products} page={page} pageSize={size} />
      <Sentinel page={page} products={productsList} title={title} />
    </>
  )
}

export default GalleryPage
