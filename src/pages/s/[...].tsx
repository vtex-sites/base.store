import React, { Suspense } from 'react'
import { graphql } from 'gatsby'
import View from 'src/views/search'
import Layout from 'src/views/Layout'
import type { PageProps } from 'gatsby'
import type {
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables,
} from 'src/s/__generated__/SearchPageQuery.graphql'

export type Props = PageProps<
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables
>

function Page(props: Props) {
  return (
    <Layout>
      <Suspense fallback={<div>loading...</div>}>
        <View {...props} />
      </Suspense>
    </Layout>
  )
}

export const query = graphql`
  query SearchPageQuery {
    cmsSeo {
      seo {
        siteMetadata {
          titleTemplate
          title
          description
        }
      }
    }
  }
`

export default Page
