import React from 'react'
import {
  usePlpPixelEffect,
  SearchProvider,
  useSearchParamsFromUrl,
  useQuery,
  SearchSEO as Seo,
} from '@vtex/gatsby-theme-store'
import { gql } from '@vtex/gatsby-plugin-graphql'
import type { FC } from 'react'
import type { Props } from 'src/pages/s/[...]'
import ProductGallery from 'src/components/sections/ProductGallery'
import { useQueryVariablesFromSearchParams } from 'src/sdk/useQueryVariablesFromSearchParams'

import type {
  FullTextSearchQueryQuery,
  FullTextSearchQueryQueryVariables,
} from './__generated__/FullTextSearchQuery.graphql'
import { FullTextSearchQuery } from './__generated__/FullTextSearchQuery.graphql'

const ITEMS_PER_PAGE = Number(process.env.GATSBY_STORE_PLP_ITEMS_PER_PAGE!)

const View: FC<Props> = (props) => {
  const { location, data: serverData } = props

  const searchParams = useSearchParamsFromUrl(location)
  const variables = useQueryVariablesFromSearchParams(searchParams)

  const { data: dynamicData } = useQuery<
    FullTextSearchQueryQuery,
    FullTextSearchQueryQueryVariables
  >({
    ...FullTextSearchQuery,
    variables,
    suspense: true,
  })

  if (dynamicData == null) {
    throw new Error('Something went wrong while fetching the data')
  }

  const data = { ...dynamicData, ...serverData }
  const totalCount = data.vtex.productSearch!.totalCount ?? 0
  const siteMetadata = data.cmsSeo!.seo!.siteMetadata!
  const breadcrumb = (data.vtex.facets!.breadcrumb! as any) ?? []

  usePlpPixelEffect({
    searchParams,
    totalCount,
    location,
  })

  return (
    <SearchProvider
      searchParams={searchParams}
      data={data}
      pageInfo={{
        size: ITEMS_PER_PAGE,
        total: Math.ceil(totalCount / ITEMS_PER_PAGE),
      }}
    >
      {/* Seo Components */}
      <Seo
        titleTemplate={siteMetadata.titleTemplate!}
        title={siteMetadata.title!}
        description={siteMetadata.description!}
        breadcrumb={breadcrumb}
      />

      {/* UI Components */}
      <ProductGallery
        initialData={dynamicData}
        facets={dynamicData.vtex.facets!.facets as any}
        productSearch={dynamicData.vtex.productSearch!}
      />
    </SearchProvider>
  )
}

/**
 * This query is run on the browser
 * */
export const query = gql`
  query FullTextSearchQuery(
    $from: Int!
    $to: Int!
    $fullText: String
    $selectedFacets: [VTEX_SelectedFacetInput!]!
    $sort: String!
  ) {
    vtex {
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
          ...ProductSummary_product
        }
        ...ProductGallery_productSearch
        totalCount: recordsFiltered
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
          ...ProductGallery_facets
        }
      }
    }
  }
`

export default View
