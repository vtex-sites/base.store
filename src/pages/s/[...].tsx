import React, { Suspense, useMemo } from 'react'
import { graphql } from 'gatsby'
import View from 'src/views/search'
import Layout from 'src/views/Layout'
import type { PageProps } from 'gatsby'
import { parseSearchParamsState } from '@vtex/store-sdk'

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
      <Suspense fallback={<div>loading...</div>}>
        {searchParams && <View {...props} searchParams={searchParams} />}
      </Suspense>
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
