import { gql } from '@vtex/gatsby-plugin-graphql'
import { graphql } from 'gatsby'
import React from 'react'
import { useQuery } from 'src/sdk/graphql/useQuery'
import Layout from 'src/views/Layout'
import View from 'src/views/product'
import type { FC } from 'react'
import type { PageProps } from 'gatsby'

import { BrowserProductPageQuery } from './__generated__/BrowserProductPageQuery.graphql'
import type {
  BrowserProductPageQueryQuery,
  BrowserProductPageQueryQueryVariables,
} from './__generated__/BrowserProductPageQuery.graphql'
import type {
  ServerProductPageQueryQuery,
  ServerProductPageQueryQueryVariables,
} from './__generated__/ServerProductPageQuery.graphql'

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
  })

  if (browerData == null) {
    return <div>loading...</div>
  }

  return (
    <View
      {...props}
      site={serverData.site!}
      product={browerData.vtex.product}
    />
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
    <ProductPage {...props} />
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
