import { gql } from '@vtex/graphql-utils'
import { graphql } from 'gatsby'
import React from 'react'
import { useQuery } from 'src/sdk/graphql/useQuery'
import View from 'src/views/product'
import type { FC } from 'react'
import type { PageProps } from 'gatsby'
import type {
  BrowserProductPageQueryQuery,
  BrowserProductPageQueryQueryVariables,
  ServerProductPageQueryQuery,
  ServerProductPageQueryQueryVariables,
} from '@generated/graphql'

export type Props = PageProps<
  ServerProductPageQueryQuery,
  ServerProductPageQueryQueryVariables
>

export const BrowserProductPageQuery = gql`
  query BrowserProductPageQuery($locator: [IStoreSelectedFacet!]!) {
    product(locator: $locator) {
      ...ProductViewFragment_product
    }
  }
`

const Page: FC<Props> = (props) => {
  const {
    params: { slug },
    data: serverData,
  } = props

  const { data: browserData } = useQuery<
    BrowserProductPageQueryQuery,
    BrowserProductPageQueryQueryVariables
  >(BrowserProductPageQuery, { locator: [{ key: 'slug', value: slug }] })

  if (browserData == null) {
    return <div>loading...</div>
  }

  if (serverData.site === null) {
    throw new Error('Site metadata is null on the server side.')
  }

  return (
    <View {...props} site={serverData.site} product={browserData.product} />
  )
}

export const serverQuery = graphql`
  query ServerProductPageQuery {
    site {
      ...ProductSeoFragment_site
    }
  }
`

export default Page
