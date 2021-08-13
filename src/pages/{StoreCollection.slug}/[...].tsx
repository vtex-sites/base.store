import React, { Suspense } from 'react'
import { graphql } from 'gatsby'
import Layout from 'src/views/Layout'
import View from 'src/views/collection'
import type { PageProps as GatsbyPageProps } from 'gatsby'
import type {
  ServerCollectionPageQueryQuery,
  ServerCollectionPageQueryQueryVariables,
} from 'src/{StoreCollection.slug}/__generated__/ServerCollectionPageQuery.graphql'

type PageProps = GatsbyPageProps<
  ServerCollectionPageQueryQuery,
  ServerCollectionPageQueryQueryVariables
>

function Page(props: PageProps) {
  return (
    <Layout>
      <Suspense fallback={<div>...loading</div>}>
        <View {...props} />
      </Suspense>
    </Layout>
  )
}

/**
 * This query is run during SSG
 * */
export const serverSideQuery = graphql`
  query ServerCollectionPageQuery($id: String!) {
    cmsSeo {
      seo {
        siteMetadata {
          titleTemplate
          title
          description
        }
      }
    }
    storeCollection(id: { eq: $id }) {
      seo {
        title
        description
      }
      fields {
        plp {
          sections {
            name
            props
          }
        }
      }
    }
  }
`

export default Page
