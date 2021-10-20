import { graphql } from 'gatsby'
import React from 'react'
import View from 'src/views/product'
import type { PageProps } from 'gatsby'
import type {
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from '@generated/graphql'

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

  return <View {...props} site={site!} product={product} />
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
