import React, { Suspense, useMemo } from 'react'
import Layout from 'src/views/Layout'
import View from 'src/views/collection'
import { graphql } from 'gatsby'
import { parseSearchParamsState } from '@vtex/store-sdk'
import type { PageProps } from 'gatsby'

import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from './__generated__/CollectionPageQuery.graphql'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables & { slug: string }
>

const useSearchParams = ({ href }: Location) =>
  useMemo(() => parseSearchParamsState(new URL(href)), [href])

function Page(props: Props) {
  const searchParams = useSearchParams(props.location)

  return (
    <Layout>
      <Suspense fallback={<div>...loading</div>}>
        <View {...props} searchParams={searchParams} />
      </Suspense>
    </Layout>
  )
}

/**
 * This query is run during SSG
 * */
export const query = graphql`
  query BrowserCollectionPageQuery($id: String!) {
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
