import type { SearchState } from '@faststore/sdk'
import { parseSearchState } from '@faststore/sdk'
import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from '@generated/graphql'
import type { PageProps } from 'gatsby'
import { useMemo } from 'react'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables
> & { slug: string }

export const useSearchParams = (props: Props): SearchState => {
  const {
    location: { href, pathname },
    data,
  } = props

  const selectedFacets = data?.collection?.meta.selectedFacets

  return useMemo(() => {
    const maybeState = href ? parseSearchState(new URL(href)) : null

    return {
      page: maybeState?.page ?? 0,
      base: maybeState?.base ?? pathname,
      selectedFacets:
        maybeState && maybeState.selectedFacets.length > 0
          ? maybeState.selectedFacets
          : selectedFacets ?? [],
      term: maybeState?.term ?? null,
      sort: maybeState?.sort ?? 'score_desc',
    }
  }, [href, pathname, selectedFacets])
}
