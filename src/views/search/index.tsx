import React from 'react'
import {
  usePlpPixelEffect,
  SearchProvider,
  useSearchParamsFromUrl,
  useQueryVariablesFromSearchParams,
  useQuery,
  SearchSEO,
} from '@vtex/gatsby-theme-store'
import { gql } from '@vtex/gatsby-plugin-graphql'
import type { FC } from 'react'
import type { BrowserSearchPageQueryQuery } from 'src/s/__generated__/BrowserSearchPageQuery.graphql'
import type { Props } from 'src/pages/s/[...]'

const pageInfo = { size: Number(process.env.GATSBY_STORE_PLP_ITEMS_PER_PAGE!) }

const View: FC<Props> = (props) => {
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
  const totalCount = data.vtex.productSearch!.recordsFiltered! ?? 0

  usePlpPixelEffect({
    searchParams,
    totalCount,
    location,
  })

  const siteMetadata = data.cmsSeo!.seo!.siteMetadata!
  const breadcrumb = (data.vtex.facets!.breadcrumb! as Breadcrumb[]) ?? []

  return (
    <>
      {/* SEO Components */}
      <SearchSEO
        titleTemplate={siteMetadata.titleTemplate!}
        title={siteMetadata.title!}
        description={siteMetadata.description!}
        breadcrumb={breadcrumb}
      />

      {/* UI Components */}
      <SearchProvider
        searchParams={searchParams}
        data={data}
        pageInfo={{
          size: pageInfo.size,
          total: Math.ceil(totalCount / pageInfo.size),
        }}
      >
        <View />
      </SearchProvider>
    </>
  )
}

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

export default View
