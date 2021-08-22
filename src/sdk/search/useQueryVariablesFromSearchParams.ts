import { useMemo } from 'react'
import type { SearchParamsState } from '@vtex/store-sdk'
import { ITEMS_PER_PAGE } from 'src/constants'

import { priceRange } from './priceRange'

const sortMap = {
  'price-desc': 'price:desc',
  'price-asc': 'price:asc',
  'orders-desc': 'orders:desc',
  'name-desc': 'name:desc',
  'name-asc': 'name:asc',
  'release-desc': 'release:desc',
  'discount-desc': 'discount:desc',
  'score-desc': '',
} as const

export const useQueryVariablesFromSearchParams = (params: SearchParamsState) =>
  useMemo(() => {
    const selectedFacets = params.selectedFacets.reduce((acc, facet) => {
      const { key } = facet
      const value =
        key === 'priceRange'
          ? priceRange.formatQuery(priceRange.parseUrl(facet.value)!)
          : facet.value

      acc.push({ key, value })

      return acc
    }, [] as Array<{ key: string; value: string }>)

    return {
      fullText: params.term ?? undefined,
      selectedFacets,
      sort: sortMap[params.sort],
      from: params.page * ITEMS_PER_PAGE,
      // Search API is inclusive. This removes the last product
      to: (params.page + 1) * ITEMS_PER_PAGE - 1,
    }
  }, [params])
