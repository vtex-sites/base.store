import React from 'react'
import {
  usePlpPixelEffect,
  SearchProvider,
  SearchSEO as Seo,
  useQuery,
} from '@vtex/gatsby-theme-store'
import { gql } from '@vtex/gatsby-plugin-graphql'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { Props as PageProps } from 'src/pages/{StoreCollection.slug}/[...]'
import ProductGallery from 'src/components/sections/ProductGallery'
import { useQueryVariablesFromSearchParams } from 'src/sdk/useQueryVariablesFromSearchParams'

import type {
  CollectionSearchQueryQuery,
  CollectionSearchQueryQueryVariables,
} from './__generated__/CollectionSearchQuery.graphql'
import { CollectionSearchQuery } from './__generated__/CollectionSearchQuery.graphql'

const ITEMS_PER_PAGE = Number(process.env.GATSBY_STORE_PLP_ITEMS_PER_PAGE!)

interface Props extends PageProps {
  searchParams: SearchParamsState
}

function View(props: Props) {
  const {
    params: { slug },
    data: staticData,
    searchParams,
    location,
  } = props

  const variables = useQueryVariablesFromSearchParams(searchParams)

  const { data: dynamicData } = useQuery<
    CollectionSearchQueryQuery,
    CollectionSearchQueryQueryVariables
  >({
    ...CollectionSearchQuery,
    variables,
    suspense: true,
  })

  if (dynamicData == null) {
    throw new Error('Something went wrong while fetching the data')
  }

  const data = { ...dynamicData, ...staticData }

  const totalCount = data.vtex.productSearch!.recordsFiltered! ?? 0
  const siteMetadata = data.cmsSeo!.seo!.siteMetadata!
  const { seo: collectionSeo } = data.storeCollection!
  const breadcrumb = data.vtex.facets!.breadcrumb! as any

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
      {/* Seo components */}
      <Seo
        titleTemplate={siteMetadata.titleTemplate!}
        title={collectionSeo.title || siteMetadata.title!}
        description={collectionSeo.description || siteMetadata.description!}
        canonical={`/${slug}`}
        breadcrumb={breadcrumb ?? []}
      />

      {/* UI components */}
      <ProductGallery
        initialData={dynamicData}
        facets={dynamicData.vtex.facets!.facets as any}
        productSearch={dynamicData.vtex.productSearch!}
      />
    </SearchProvider>
  )
}

/**
 * This query is run on the browser and contains
 * the current search state of the user
 */
export const clientSideQuery = gql`
  query CollectionSearchQuery(
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
          ...ProductSummary_product
        }
        ...ProductGallery_productSearch
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
          ...ProductGallery_facets
        }
      }
    }
  }
`

export default View
