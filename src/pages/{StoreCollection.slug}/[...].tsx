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
    data: { storeCollection },
    params: { '*': wildcard },
  } = props

  return useMemo(() => {
    // Runs when filters are applied
    if (wildcard?.length > 0) {
      return parseSearchState(new URL(href))
    }

    // Runs on SSG
    const { selectedFacets } = storeCollection!.meta
    const [base] = pathname.split(selectedFacets[0].value)

    return {
      page: 0,
      base,
      selectedFacets,
      term: null,
      sort: 'score_desc',
    }
  }, [href, pathname, storeCollection, wildcard?.length])
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
