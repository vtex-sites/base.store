import React from 'react'
import { graphql } from 'gatsby'
import View from 'src/views/product'
import Layout from 'src/views/Layout'
import type { PageProps } from 'gatsby'
import type {
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from 'src/{StoreProduct.slug}/__generated__/ProductPageQuery.graphql'

export type Props = PageProps<
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables
>

function Page(props: Props) {
  const {
    data: { product, cmsSeo },
  } = props

  if (product == null || cmsSeo == null) {
    throw new Error('Something went wrong while fetching page data')
  }

  return (
    <Layout>
      <View {...props} cmsSeo={cmsSeo} product={product} />
    </Layout>
  )
}

export const query = graphql`
  query ProductPageQuery($id: String!) {
    cmsSeo {
      ...ProductViewFragment_cmsSeo
    }

    product: storeProduct(id: { eq: $id }) {
      ...ProductViewFragment_product
    }
  }
`

export default Page
