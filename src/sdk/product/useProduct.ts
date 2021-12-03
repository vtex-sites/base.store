import { useSession } from '@faststore/sdk'
import { useMemo } from 'react'
import type {
  BrowserProductQueryQuery,
  BrowserProductQueryQueryVariables,
} from '@generated/graphql'
import { gql } from '@vtex/graphql-utils'

import { useQuery } from '../graphql/useQuery'

const query = gql`
  query BrowserProductQuery($locator: [IStoreSelectedFacet!]!) {
    product(locator: $locator) {
      ...ProductDetailsFragment_product
    }
  }
`

export const useProduct = <T extends BrowserProductQueryQuery>(
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
  >(query, variables, {
    fallbackData,
    revalidateOnMount: true,
  })
}
