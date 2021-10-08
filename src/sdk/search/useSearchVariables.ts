import { useSession } from '@vtex/store-sdk'
import { useMemo } from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'
import type { SearchParamsState } from '@vtex/store-sdk'

export const useSearchVariables = (params: SearchParamsState) => {
  const { channel } = useSession()
  const { page, sort, term, selectedFacets } = params

  return useMemo(
    () => ({
      first: ITEMS_PER_PAGE,
      after: (page * ITEMS_PER_PAGE).toString(),
      sort,
      term: term ?? undefined,
      selectedFacets: [
        ...selectedFacets.map(({ key, value }) => ({ key, value })),
        { key: 'channel', value: channel },
      ],
    }),
    [channel, page, selectedFacets, sort, term]
  )
}
