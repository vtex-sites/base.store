import { parseSearchParamsState } from '@vtex/store-sdk'
import { useMemo } from 'react'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { Props } from 'src/pages/{StoreCollection.slug}/[...]'

import { priceRange } from './search'

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
    const selectedFacets = storeCollection!.meta!.selectedFacets!
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
      sort: 'score-desc',
    }
  }, [props])
