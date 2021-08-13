import React, { Suspense } from 'react'
import { graphql } from 'gatsby'
import View from 'src/views/search'
import Layout from 'src/views/Layout'
import type { ServerSearchPageQueryQuery } from 'src/s/__generated__/ServerSearchPageQuery.graphql'
import type { PageProps as GatsbyPageProps } from 'gatsby'

export type Props = GatsbyPageProps<ServerSearchPageQueryQuery>

function Page(props: Props) {
  return (
    <Layout>
      <Suspense fallback={<div>TODO: loading...</div>}>
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
