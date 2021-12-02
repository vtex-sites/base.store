import { parseSearchState, SearchProvider } from '@faststore/sdk'
import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'
import { applySearchState } from 'src/sdk/search/state'
import View from 'src/views/collection'
import type { SearchState } from '@faststore/sdk'
import type { PageProps } from 'gatsby'
import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from '@generated/graphql'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables & { slug: string }
>

const useSearchParams = (props: Props): SearchState => {
  const {
    location: { href, pathname },
    data,
  } = props

  const selectedFacets = data?.storeCollection?.meta.selectedFacets

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

function Page(props: Props) {
  const searchParams = useSearchParams(props)

  return (
    <SearchProvider
      onChange={applySearchState}
      itemsPerPage={ITEMS_PER_PAGE}
      {...searchParams}
    >
      <View {...props} />
    </SearchProvider>
  )
}

/**
 * This query is run during SSG
 * */
export const query = graphql`
  query CollectionPageQuery($id: String!) {
    site {
      ...CollectionSeoFragment_site
    }

    storeCollection(id: { eq: $id }) {
      ...CollectionSeoFragment_storeCollection
      meta {
        selectedFacets {
          key
          value
        }
      }
    }
  }
`

export default Page
