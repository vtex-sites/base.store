import React from 'react'
import { graphql } from 'gatsby'
import type { PageProps } from 'gatsby'
import type { FC } from 'react'
import Layout from 'src/components/common/Layout'
import ProductView from 'src/views/product'
import type {
  ServerProductPageQueryQuery,
  ServerProductPageQueryQueryVariables,
} from 'src/{StoreProduct.slug}/__generated__/ServerProductPageQuery.graphql'

export type ServerProductPageProps = PageProps<
  ServerProductPageQueryQuery,
  ServerProductPageQueryQueryVariables
>

const Page: FC<ServerProductPageProps> = (props) => (
  <Layout>
    <ProductView
      {...props}
      product={props.data.product!}
      slug={props.params.slug}
    />
  </Layout>
)

export const query = graphql`
  query ServerProductPageQuery($id: String!) {
    product: storeProduct(id: { eq: $id }) {
      id: productId
      ...ProductViewFragment_product
    }
  }
`

export default Page
