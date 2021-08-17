import React, { Suspense } from 'react'
import Layout from 'src/views/Layout'
import View from 'src/views/collection'
import { graphql } from 'gatsby'
import { useSearchParams } from 'src/sdk/search/useSearchParams'
import type { PageProps } from 'gatsby'

import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from './__generated__/CollectionPageQuery.graphql'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables & { slug: string }
>

function Page(props: Props) {
  const searchParams = useSearchParams(props)

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
