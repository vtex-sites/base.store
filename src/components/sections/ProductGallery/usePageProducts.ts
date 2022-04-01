import { useSearch } from '@faststore/sdk'
import { useEffect, useMemo } from 'react'
import {
  prefetchProductsQuery,
  useProductsQuery,
} from 'src/sdk/product/useProductsQuery'
import type { ProductsQueryQuery } from '@generated/graphql'

export const usePreloadPageProducts = (page: number | null) => {
  const {
    itemsPerPage,
    state: { sort, term, selectedFacets },
  } = useSearch()

  useEffect(() => {
    if (page !== null) {
      prefetchProductsQuery({
        first: itemsPerPage,
        after: (itemsPerPage * page).toString(),
        sort,
        term: term ?? '',
        selectedFacets,
      })
    }
  }, [itemsPerPage, page, selectedFacets, sort, term])
}

export const usePageProducts = (
  page: number,
  fallbackData?: ProductsQueryQuery
) => {
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
      revalidateOnMount: false,
    }
  )

  const products = useMemo(
    () => productList?.edges.map((edge) => edge.node),
    [productList]
  )

  return products
}
