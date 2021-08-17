import React, { Suspense } from 'react'
import { gql } from '@vtex/gatsby-plugin-graphql'
import View from 'src/views/product'
import { graphql } from 'gatsby'
import type { FC } from 'react'
import type { PageProps } from 'gatsby'
import Layout from 'src/views/Layout'
import { useQuery } from 'src/sdk/graphql/useQuery'

import type {
  BrowserProductPageQueryQuery,
  BrowserProductPageQueryQueryVariables,
} from './__generated__/BrowserProductPageQuery.graphql'
import type {
  ServerProductPageQueryQuery,
  ServerProductPageQueryQueryVariables,
} from './__generated__/ServerProductPageQuery.graphql'
import { BrowserProductPageQuery } from './__generated__/BrowserProductPageQuery.graphql'

export type Props = PageProps<
  ServerProductPageQueryQuery,
  ServerProductPageQueryQueryVariables
>

const ProductPage: FC<Props> = (props) => {
  const {
    params: { slug },
    data: serverData,
  } = props

  const { data: browerData } = useQuery<
    BrowserProductPageQueryQuery,
    BrowserProductPageQueryQueryVariables
  >({
    ...BrowserProductPageQuery,
    variables: { slug },
    suspense: true,
  })

  if (browerData == null || serverData.site == null) {
    throw new Error('Something went wrong while fetching data')
  }

  return (
    <View {...props} site={serverData.site} product={browerData.vtex.product} />
  )
}

export const browserQuery = gql`
  query BrowserProductPageQuery($slug: String!) {
    vtex {
      product(slug: $slug) {
        ...ProductViewFragment_product
      }
    }
  }
`

const Page: FC<Props> = (props) => (
  <Layout>
    <Suspense fallback={<div>loading...</div>}>
      <ProductPage {...props} />
    </Suspense>
  </Layout>
)

export const serverQuery = graphql`
  query ServerProductPageQuery {
    site {
      ...ProductSeoFragment_site
    }
  }
`

export default Page
