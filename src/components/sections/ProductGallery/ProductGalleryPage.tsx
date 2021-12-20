import { useSearch } from '@faststore/sdk'
import React, { useMemo } from 'react'
import ProductGrid from 'src/components/product/ProductGrid'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'
import Sentinel from 'src/sdk/search/Sentinel'
import type { ProductsQueryQuery } from '@generated/graphql'

interface Props {
  page: number
  display?: boolean
  fallbackData?: ProductsQueryQuery
  title: string
}

function GalleryPage({ page, display, title, fallbackData }: Props) {
  const {
    itemsPerPage,
    state: { sort, term, selectedFacets },
  } = useSearch()

  const productList = useProductsQuery(
    {
      first: itemsPerPage,
      after: (itemsPerPage * page).toString(),
      sort,
      term: term ?? '',
      selectedFacets,
    },
    {
      fallbackData,
      revalidateOnMount: fallbackData == null,
    }
  )

  const products = useMemo(
    () => productList?.edges.map((edge) => edge.node),
    [productList]
  )

  if (display === false || products == null) {
    return null
  }

  return (
    <>
      <Sentinel products={products} page={page} title={title} />
      <ProductGrid products={products} page={page} pageSize={itemsPerPage} />
    </>
  )
}

export default GalleryPage
