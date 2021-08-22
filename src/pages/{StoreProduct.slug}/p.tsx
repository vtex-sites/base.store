import React from 'react'
import { graphql } from 'gatsby'
import View from 'src/views/product'
import Layout from 'src/views/Layout'
import type { PageProps } from 'gatsby'

import type {
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from './__generated__/ProductPageQuery.graphql'

export type Props = PageProps<
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables
>

function Page(props: Props) {
  const {
    data: { product, site },
  } = props

  if (product == null) {
    return <div>loading...</div>
  }

  return (
    <Layout>
      <View {...props} site={site!} product={product} />
    </Layout>
  )
}

export const query = graphql`
  query ProductPageQuery($id: String!) {
    site {
      ...ProductSeoFragment_site
    }

    product: storeProduct(id: { eq: $id }) {
      ...ProductViewFragment_product
    }
  }
`

export default Page
