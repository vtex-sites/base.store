import { BrowserProductPageQuery } from '@generated/BrowserProductPageQuery.graphql'
import { gql } from '@vtex/gatsby-plugin-graphql'
import { graphql } from 'gatsby'
import React from 'react'
import { useQuery } from 'src/sdk/graphql/useQuery'
import View from 'src/sdk/views/product'
import type { FC } from 'react'
import type { PageProps } from 'gatsby'
import type {
  BrowserProductPageQueryQuery,
  BrowserProductPageQueryQueryVariables,
} from '@generated/BrowserProductPageQuery.graphql'
import type {
  ServerProductPageQueryQuery,
  ServerProductPageQueryQueryVariables,
} from '@generated/ServerProductPageQuery.graphql'

export type Props = PageProps<
  ServerProductPageQueryQuery,
  ServerProductPageQueryQueryVariables
>

const Page: FC<Props> = (props) => {
  const {
    params: { slug },
    data: serverData,
  } = props

  const { data: browserData } = useQuery<
    BrowserProductPageQueryQuery,
    BrowserProductPageQueryQueryVariables
  >({
    ...BrowserProductPageQuery,
    variables: { locator: { value: slug, field: 'slug' } },
  })

  if (browserData == null) {
    return <div>loading...</div>
  }

  return (
    <View {...props} site={serverData.site!} product={browserData.product} />
  )
}

export const browserQuery = gql`
  query BrowserProductPageQuery($locator: StoreProductID!) {
    product(locator: $locator) {
      ...ProductViewFragment_product
    }
  }
`

export const serverQuery = graphql`
  query ServerProductPageQuery {
    site {
      ...ProductSeoFragment_site
    }
  }
`

export default Page
