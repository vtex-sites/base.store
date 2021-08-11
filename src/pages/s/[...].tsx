import React from 'react'
import { gql } from '@vtex/gatsby-plugin-graphql'
import { graphql } from 'gatsby'
import {
  HybridWrapper,
  useQuery,
  useQueryVariablesFromSearchParams,
  useSearchParamsFromUrl,
} from '@vtex/gatsby-theme-store'
import Layout from 'src/components/common/Layout'
import AboveTheFoldPreview from 'src/views/search/components/AboveTheFoldPreview'
import SearchView from 'src/views/search'
import { BrowserSearchPageQuery } from 'src/s/__generated__/BrowserSearchPageQuery.graphql'
import type {
  BrowserSearchPageQueryQuery,
  BrowserSearchPageQueryQueryVariables,
} from 'src/s/__generated__/BrowserSearchPageQuery.graphql'
import type { ServerSearchPageQueryQuery } from 'src/s/__generated__/ServerSearchPageQuery.graphql'
import type { FC } from 'react'
import type { PageProps as GatsbyPageProps } from 'gatsby'

const pageInfo = { size: Number(process.env.GATSBY_STORE_PLP_ITEMS_PER_PAGE!) }

const SearchPage: FC<PageProps> = (props) => {
  const { location, data: serverData } = props
  const searchParams = useSearchParamsFromUrl(location)
  const variables = useQueryVariablesFromSearchParams(searchParams, pageInfo)

  const { data: browserData } = useQuery<
    BrowserSearchPageQueryQuery,
    BrowserSearchPageQueryQueryVariables
  >({
    ...BrowserSearchPageQuery,
    variables,
    suspense: true,
  })

  if (browserData == null) {
    throw new Error('Something went wrong while fetching the data')
  }

  const data = { ...browserData, ...serverData }

  return (
    <SearchView data={data} searchParams={searchParams} pageInfo={pageInfo} />
  )
}

type PageProps = GatsbyPageProps<ServerSearchPageQueryQuery>

const Page: FC<PageProps> = (props) => (
  <Layout>
    <HybridWrapper fallback={<AboveTheFoldPreview />}>
      <SearchPage {...props} />
    </HybridWrapper>
  </Layout>
)

/**
 * This query is run on the browser
 * */
export const query = gql`
  query BrowserSearchPageQuery(
    $from: Int!
    $to: Int!
    $fullText: String
    $selectedFacets: [VTEX_SelectedFacetInput!]!
    $sort: String!
  ) {
    vtex {
      banners(fullText: $fullText, selectedFacets: $selectedFacets) {
        banners {
          html
        }
      }
      productSearch(
        from: $from
        to: $to
        orderBy: $sort
        fullText: $fullText
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
        fullText: $fullText
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

/**
 * This query is run during SSG
 * */
export const serverSideQuery = graphql`
  query ServerSearchPageQuery {
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
