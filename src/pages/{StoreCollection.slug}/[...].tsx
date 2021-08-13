import React, { Suspense } from 'react'
import Layout from 'src/views/Layout'
import View from 'src/views/collection'
import { graphql } from 'gatsby'
import { useSearchParams } from 'src/sdk/useSearchParams'
import type { PageProps } from 'gatsby'
import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from 'src/{StoreCollection.slug}/__generated__/CollectionPageQuery.graphql'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables
>

function Page(props: Props) {
  const searchParams = useSearchParams(props)

  return (
    <Layout>
      <Suspense fallback={<div>...loading</div>}>
        <View searchParams={searchParams} {...props} />
      </Suspense>
    </Layout>
  )
}

/**
 * This query is run during SSG
 * */
export const query = graphql`
  query CollectionPageQuery($id: String!) {
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
        searchParams {
          sort
          selectedFacets {
            key
            value
          }
        }
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
