import { parseSearchParamsState } from '@vtex/store-sdk'
import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import Layout from 'src/views/Layout'
import View from 'src/views/search'
import type { PageProps } from 'gatsby'

import type {
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables,
} from './__generated__/SearchPageQuery.graphql'

export type Props = PageProps<
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables
>

const useSearchParams = ({ href }: Location) =>
  useMemo(() => href && parseSearchParamsState(new URL(href)), [href])

function Page(props: Props) {
  const searchParams = useSearchParams(props.location)

  return (
    <Layout>
      {searchParams && <View {...props} searchParams={searchParams} />}
    </Layout>
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
