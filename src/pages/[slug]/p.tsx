import React, { Suspense } from 'react'
import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from '@vtex/gatsby-theme-store'
import View from 'src/views/product'
import { BrowserProductPageQuery } from 'src/[slug]/__generated__/BrowserProductPageQuery.graphql'
import { graphql } from 'gatsby'
import type { FC } from 'react'
import type { PageProps } from 'gatsby'
import type {
  BrowserProductPageQueryQuery,
  BrowserProductPageQueryQueryVariables,
} from 'src/[slug]/__generated__/BrowserProductPageQuery.graphql'
import Layout from 'src/views/Layout'
import type {
  ServerProductPageQueryQuery,
  ServerProductPageQueryQueryVariables,
} from 'src/{StoreProduct.slug}/__generated__/ServerProductPageQuery.graphql'

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

  if (browerData == null || serverData.cmsSeo == null) {
    throw new Error('Something went wrong while fetching data')
  }

  return (
    <View
      {...props}
      cmsSeo={serverData.cmsSeo}
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
    <Suspense fallback={<div>loading...</div>}>
      <ProductPage {...props} />
    </Suspense>
  </Layout>
)

export const serverQuery = graphql`
  query ServerProductPageQuery {
    cmsSeo {
      ...ProductViewFragment_cmsSeo
    }
  }
`

export default Page
