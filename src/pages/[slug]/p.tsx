import { graphql } from 'gatsby'
import { execute, parse } from 'graphql'
import React from 'react'
import View from 'src/views/product'
import type { FC } from 'react'
import type { PageProps } from 'gatsby'
import type {
  ServerProductPageQueryQuery,
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from '@generated/graphql'
import { getSchema, getContextFactory } from 'src/server'
import { gql } from '@vtex/graphql-utils'

import persisted from '../../../@generated/graphql/persisted.json'

const contextFactory = getContextFactory()

export type Props = PageProps<
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables
> & { serverData: ServerProductPageQueryQuery }

const Page: FC<Props> = (props) => {
  const {
    serverData,
    data: { site },
  } = props

  return <View {...props} site={site!} product={serverData.product} />
}

export const querySSG = graphql`
  query ProductPageQuery {
    site {
      ...ProductSeoFragment_site
    }
  }
`

export const querySSR = gql`
  query ServerProductPageQuery($locator: [IStoreSelectedFacet!]!) {
    product(locator: $locator) {
      ...ProductViewFragment_product
    }
  }
`

export const getServerData = async ({
  params: { slug },
}: {
  params: Record<string, string>
  url: string
}) => {
  const { data, errors } = await execute({
    schema: await getSchema(),
    document: parse(persisted[querySSR]),
    variableValues: { locator: [{ key: 'slug', value: slug }] },
    contextValue: contextFactory({}),
  })

  if (errors) {
    console.error(errors)
  }

  return {
    props: data,
    headers: {
      'cache-control': 'no-store, no-cache',
    },
  }
}

export default Page
