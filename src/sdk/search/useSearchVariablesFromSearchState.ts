import { useMemo } from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'
import type { SearchParamsState } from '@vtex/store-sdk'

export const useSearchVariablesFromSearchState = (
  params: SearchParamsState
) => {
  const { page, sort, term, selectedFacets } = params

  return useMemo(
    () => ({
      first: ITEMS_PER_PAGE,
      after: (page * ITEMS_PER_PAGE).toString(),
      sort,
      term: term ?? undefined,
      selectedFacets: selectedFacets.map(({ key, value }) => ({ key, value })),
    }),
    [page, selectedFacets, sort, term]
  )
}
