import React from 'react'
import { gql } from '@vtex/gatsby-plugin-graphql'
import { Spinner, Center, Grid, Box } from '@vtex/store-ui'
import type { FC } from 'react'
import ProductSummary from 'src/components/product/ProductSummary'
import {
  useQuery,
  useSearch,
  useQueryVariablesFromSearchParams,
} from '@vtex/gatsby-theme-store'

import { SearchQuery } from './__generated__/SearchQuery.graphql'
import type {
  SearchQueryQuery,
  SearchQueryQueryVariables,
} from './__generated__/SearchQuery.graphql'

interface Props {
  columns: number[]
  /** @description true if should display the page. This is used for prefetching a page */
  display: boolean
  cursor: number
  initialData?: SearchQueryQuery
}

const Page: FC<Props> = ({ display, cursor, initialData, columns }) => {
  const { searchParams, pageInfo } = useSearch()
  const variables = useQueryVariablesFromSearchParams(
    {
      ...searchParams,
      page: cursor,
    },
    pageInfo
  )

  const { data } = useQuery<SearchQueryQuery, SearchQueryQueryVariables>({
    ...SearchQuery,
    variables,
    initialData,
    revalidateOnMount: true,
  })

  if (display === false) {
    return null
  }

  if (data === undefined) {
    return (
      <Box sx={{ height: ['200px', '500px'] }}>
        <Center>
          <Spinner />
        </Center>
      </Box>
    )
  }

  return (
    <Grid variant="search" columns={columns}>
      {data.vtex.productSearch?.products?.map((product, index) => (
        <ProductSummary
          key={product!.id!}
          product={product!}
          position={cursor * pageInfo.size + index + 1}
        />
      ))}
    </Grid>
  )
}

export const query = gql`
  query SearchQuery(
    $fullText: String
    $selectedFacets: [VTEX_SelectedFacetInput!]
    $from: Int
    $to: Int
    $sort: String
    $hideUnavailableItems: Boolean = false
  ) {
    vtex {
      productSearch(
        hideUnavailableItems: $hideUnavailableItems
        selectedFacets: $selectedFacets
        fullText: $fullText
        from: $from
        to: $to
        orderBy: $sort
      ) {
        products {
          ...ProductSummary_product
        }
      }
    }
  }
`

export default Page
