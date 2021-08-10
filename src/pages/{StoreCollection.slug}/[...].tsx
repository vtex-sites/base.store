import React from 'react'
import { gql } from '@vtex/gatsby-plugin-graphql'
import { graphql } from 'gatsby'
import {
  useQueryVariablesFromSearchParams,
  useSearchParamsFromUrl,
  HybridWrapper,
  useQuery,
} from '@vtex/gatsby-theme-store'
import CollectionView from 'src/views/collection'
import Layout from 'src/@vtex/gatsby-theme-store/components/Layout'
import type { FC } from 'react'
import type { PageProps as GatsbyPageProps } from 'gatsby'
import type {
  ServerCollectionPageQueryQuery,
  ServerCollectionPageQueryQueryVariables,
} from 'src/{StoreCollection.slug}/__generated__/ServerCollectionPageQuery.graphql'
import type {
  BrowserCollectionPageQueryQuery,
  BrowserCollectionPageQueryQueryVariables,
} from 'src/{StoreCollection.slug}/__generated__/BrowserCollectionPageQuery.graphql'
import { BrowserCollectionPageQuery } from 'src/{StoreCollection.slug}/__generated__/BrowserCollectionPageQuery.graphql'
import AboveTheFoldPreview from 'src/views/collection/components/AboveTheFoldPreview'

const pageInfo = { size: Number(process.env.GATSBY_STORE_PLP_ITEMS_PER_PAGE!) }

const SearchPage: FC<PageProps> = (props) => {
  const { location, data: staticData, params } = props

  const searchParams = useSearchParamsFromUrl(location)
  const variables = useQueryVariablesFromSearchParams(searchParams, pageInfo)

  const { data: dynamicData } = useQuery<
    BrowserCollectionPageQueryQuery,
    BrowserCollectionPageQueryQueryVariables
  >({
    ...BrowserCollectionPageQuery,
    variables,
    suspense: true,
  })

  if (dynamicData == null) {
    throw new Error('Something went wrong while fetching the data')
  }

  const data = { ...dynamicData, ...staticData }

  return (
    <CollectionView
      data={data}
      searchParams={searchParams}
      pageInfo={pageInfo}
      params={params}
    />
  )
}

/**
 * This query is run on the browser and contains
 * the current search state of the user
 */
export const clientSideQuery = gql`
  query BrowserCollectionPageQuery(
    $to: Int!
    $from: Int!
    $selectedFacets: [VTEX_SelectedFacetInput!]!
    $sort: String!
  ) {
    vtex {
      productSearch(
        to: $to
        from: $from
        orderBy: $sort
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

type PageProps = GatsbyPageProps<
  ServerCollectionPageQueryQuery,
  ServerCollectionPageQueryQueryVariables
>

const Page: FC<PageProps> = (props) => (
  <Layout>
    <HybridWrapper fallback={<AboveTheFoldPreview />}>
      <SearchPage {...props} />
    </HybridWrapper>
  </Layout>
)

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
