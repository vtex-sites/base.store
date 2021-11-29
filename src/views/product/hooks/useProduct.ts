import { gql } from '@vtex/graphql-utils'
import { useSession } from '@faststore/sdk'
import { useMemo } from 'react'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type {
  BrowserProductQueryQuery,
  BrowserProductQueryQueryVariables,
} from '@generated/graphql'

export const BrowserProductQuery = gql`
  query BrowserProductQuery($locator: [IStoreSelectedFacet!]!) {
    product(locator: $locator) {
      ...ProductViewFragment_product
    }
  }
`

/**
 * serverProduct data is stale and incomplete (because we SSRed it).
 * Let's use it's value as placeholder while we fetch the rest of the data
 * on the browser
 */
export const useProduct = <T extends Partial<BrowserProductQueryQuery>>(
  productID: string,
  fallbackData?: T
) => {
  const { channel } = useSession()
  const variables = useMemo(() => {
    if (!channel) {
      throw new Error(`useProduct: 'channel' from session is 'null'.`)
    }

    return {
      locator: [
        { key: 'id', value: productID },
        { key: 'channel', value: channel },
      ],
    }
  }, [channel, productID])

  return useQuery<
    BrowserProductQueryQuery & T,
    BrowserProductQueryQueryVariables
  >(BrowserProductQuery, variables, {
    fallbackData,
    revalidateOnMount: true,
  })
}
