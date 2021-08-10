import { graphql } from 'gatsby'
import React from 'react'
import type { FC } from 'react'
import type { PageProps } from 'gatsby'
import AboveTheFoldPreview from 'src/views/collection/components/AboveTheFoldPreview'
import {
  useSearchParamsFromQueryVariables,
  usePersonalizedSearchRedirect,
} from '@vtex/gatsby-theme-store'
import Layout from 'src/@vtex/gatsby-theme-store/components/Layout'
import CollectionView from 'src/views/collection'
import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from 'src/{StoreCollection.slug}/__generated__/CollectionPageQuery.graphql'

export type SearchPageProps = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables
>

const Page: FC<SearchPageProps> = (props) => {
  const { pageContext, data, params } = props

  /**
   * In the future, we won't need this hook since in the ideal word our API
   * uses the same parameters as the output of this hook, so our searchParams can
   * be serialized directly into the searchParams
   */
  const searchParams = useSearchParamsFromQueryVariables(pageContext)

  /**
   * This is a SSG Page. This means we have products rendered in the HTML.
   * If the user is in a personalized context, we need to perform a client-side
   * rendering of the page. For this, we redirect the user to the client-side
   * template and don't render the view.
   */
  const redirecting = usePersonalizedSearchRedirect(searchParams)
  const pageInfo = {
    size: pageContext.itemsPerPage,
  }

  return (
    <Layout>
      {
        /** We still do not support search personalization with SSR */
        redirecting === true ? (
          <AboveTheFoldPreview />
        ) : (
          <CollectionView
            data={data}
            searchParams={searchParams}
            pageInfo={pageInfo}
            params={params}
          />
        )
      }
    </Layout>
  )
}

export const query = graphql`
  query CollectionPageQuery(
    $sort: String!
    $itemsPerPage: Int!
    $selectedFacets: [VTEX_SelectedFacetInput!]!
    $id: String!
  ) {
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
    vtex {
      productSearch(
        from: 0
        orderBy: $sort
        to: $itemsPerPage
        selectedFacets: $selectedFacets
        hideUnavailableItems: false
        simulationBehavior: skip
      ) {
        products {
          id: productId
          productName
          linkText
          items {
            itemId
            images {
              imageUrl
              imageText
            }
          }
        }
        recordsFiltered
      }
      facets(
        selectedFacets: $selectedFacets
        operator: or
        behavior: "Static"
        removeHiddenFacets: true
      ) {
        breadcrumb {
          href
          name
        }
        facets {
          name
          type
          values {
            key
            name
            value
            selected
            quantity
            range {
              from
              to
            }
          }
        }
      }
    }
  }
`

export default Page
