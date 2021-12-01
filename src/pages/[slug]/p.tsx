import { gql } from '@vtex/graphql-utils'
import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { execute } from 'src/server'
import View from 'src/views/product'
import type { FC } from 'react'
import type { PageProps } from 'gatsby'
import type {
  ServerProductPageQueryQuery,
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from '@generated/graphql'

export type Props = PageProps<
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables
> & { serverData: ServerProductPageQueryQuery }

const Page: FC<Props> = (props) => {
  const {
    serverData,
    data: { site },
  } = props

  const notFound = !serverData?.product

  useEffect(() => {
    if (notFound) {
      window.location.href = `/404/?from=${encodeURIComponent(
        window.location.pathname
      )}`
    }
  }, [notFound])

  // Product not found
  if (notFound) {
    return null
  }

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
}) => {
  try {
    const { data, errors } = await execute({
      operationName: querySSR,
      variableValues: { locator: [{ key: 'slug', value: slug }] },
    })

    if (errors) {
      console.error(errors)
    }

    return {
      status: 200,
      props: data,
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    }
  } catch (err) {
    console.error(err)

    return {
      status: 500,
      props: {},
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    }
  }
}

export default Page
