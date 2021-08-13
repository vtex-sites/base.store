import { priceRange, useRegion } from '@vtex/gatsby-theme-store'
import { useMemo } from 'react'
import type { SearchParamsState } from '@vtex/store-sdk'

const ITEMS_PER_PAGE = Number(process.env.GATSBY_STORE_PLP_ITEMS_PER_PAGE!)

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

export const useQueryVariablesFromSearchParams = (
  params: SearchParamsState
) => {
  const { regionId } = useRegion()

  return useMemo(() => {
    const selectedFacets = params.selectedFacets.reduce((acc, facet) => {
      const { key } = facet
      const value =
        key === 'priceRange'
          ? priceRange.formatQuery(priceRange.parseUrl(facet.value)!)
          : facet.value

      acc.push({ key, value })

      return acc
    }, [] as Array<{ key: string; value: string }>)

    const queryParams = {
      fullText: params.term ?? undefined,
      selectedFacets,
      sort: sortMap[params.sort],
      from: params.page * ITEMS_PER_PAGE,
      // Search API is inclusive. This removes the last product
      to: (params.page + 1) * ITEMS_PER_PAGE - 1,
    }

    if (regionId != null) {
      queryParams.selectedFacets.push({
        key: 'region-id',
        value: regionId,
      })
    }

    return queryParams
  }, [params, regionId])
}
