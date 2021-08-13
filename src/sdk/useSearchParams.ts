import { parseSearchParamsState } from '@vtex/store-sdk'
import { useMemo } from 'react'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { Props } from 'src/pages/{StoreCollection.slug}/[...]'

import { priceRange } from './search'

// TODO: Move this to the backend once we have lambda functions
const sortMap = {
  'price:desc': 'price-desc',
  'price:asc': 'price-asc',
  'orders:desc': 'orders-desc',
  'name:desc': 'name-desc',
  'name:asc': 'name-asc',
  'release:desc': 'release-desc',
  'discount:desc': 'discount-desc',
  '': 'score-desc',
} as const

export const useSearchParams = (props: Props): SearchParamsState =>
  useMemo(() => {
    const {
      location: { pathname, href },
      data: { storeCollection },
      params: { '*': rest },
    } = props

    // We are in a filtered page. All state is in the URL
    if (rest) {
      return parseSearchParamsState(new URL(href))
    }

    // We are in a SSR page and we need to build the state from params
    const { sort, selectedFacets } = storeCollection!.fields!.searchParams!
    const [base] = pathname.split(selectedFacets![0]!.value!)

    // TODO: Remove this bit of code once we have a graphql layer
    const facets = selectedFacets!.reduce((acc: any, facet: any) => {
      const { key } = facet
      const value =
        key === 'priceRange'
          ? priceRange.formatUrl(priceRange.parseQuery(facet.value)!)
          : facet.value

      acc.push({ key, value })

      return acc
    }, [] as SearchParamsState['selectedFacets'])

    return {
      page: 0,
      base,
      selectedFacets: facets,
      term: null,
      personalized: false,
      sort:
        typeof sort === 'string' && sort in sortMap
          ? sortMap[sort as keyof typeof sortMap]
          : 'score-desc',
    }
  }, [props])
