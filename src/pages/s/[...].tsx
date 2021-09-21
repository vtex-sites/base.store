import { parseSearchParamsState } from '@vtex/store-sdk'
import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import View from 'src/sdk/views/search'
import type { PageProps } from 'gatsby'
import type {
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables,
} from '@generated/SearchPageQuery.graphql'

export type Props = PageProps<
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables
>

const useSearchParams = ({ href }: Location) =>
  useMemo(() => href && parseSearchParamsState(new URL(href)), [href])

function Page(props: Props) {
  const searchParams = useSearchParams(props.location)

  if (!searchParams) {
    return null
  }

  return <View {...props} searchParams={searchParams} />
}

export const query = graphql`
  query SearchPageQuery {
    site {
      ...SearchSeoFragment_site
    }
  }
`

export default Page
