import React from 'react'
import {
  usePlpPixelEffect,
  SearchProvider,
  SearchSEO,
  useSearchParamsFromUrl,
  useQueryVariablesFromSearchParams,
  useQuery,
} from '@vtex/gatsby-theme-store'
import type { CollectionPageQueryQuery } from 'src/{StoreCollection.slug}/__generated__/CollectionPageQuery.graphql'
import type {
  BrowserCollectionPageQueryQuery,
  BrowserCollectionPageQueryQueryVariables,
} from 'src/{StoreCollection.slug}/__generated__/BrowserCollectionPageQuery.graphql'
import { BrowserCollectionPageQuery } from 'src/{StoreCollection.slug}/__generated__/BrowserCollectionPageQuery.graphql'
import type { PageProps } from 'gatsby'
import { gql } from '@vtex/gatsby-plugin-graphql'

export type CollectionViewProps = PageProps<CollectionPageQueryQuery>

const pageInfo = { size: Number(process.env.GATSBY_STORE_PLP_ITEMS_PER_PAGE!) }

function View(props: CollectionViewProps) {
  const { params, data: staticData, location } = props

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
        size: pageInfo.size,
        total: Math.ceil(totalCount / pageInfo.size),
      }}
    >
      <SearchSEO
        titleTemplate={siteMetadata.titleTemplate!}
        title={collectionSeo.title || siteMetadata.title!}
        description={collectionSeo.description || siteMetadata.description!}
        canonical={`/${params.slug}`}
        breadcrumb={breadcrumb ?? []}
      />
      {/* <View {...ViewComponents} data={props} /> */}
    </SearchProvider>
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

export default View
