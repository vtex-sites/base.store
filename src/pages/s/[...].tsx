import { parseSearchState, SearchProvider } from '@faststore/sdk'
import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'
import { applySearchState } from 'src/sdk/search/state'
import View from 'src/views/search'
import type { PageProps } from 'gatsby'
import type {
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables,
} from '@generated/graphql'

export type Props = PageProps<
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables
>

const useSearchParams = ({ href }: Location) =>
  useMemo(() => href && parseSearchState(new URL(href)), [href])

function Page(props: Props) {
  const searchParams = useSearchParams(props.location)

  if (!searchParams) {
    return null
  }

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

export const query = graphql`
  query SearchPageQuery {
    site {
      ...SearchSeoFragment_site
    }
  }
`

export default Page
