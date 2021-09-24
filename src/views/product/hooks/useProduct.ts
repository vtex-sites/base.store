import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type {
  BrowserProductQueryQuery,
  BrowserProductQueryQueryVariables,
} from '@generated/BrowserProductQuery.graphql'
import { BrowserProductQuery } from '@generated/BrowserProductQuery.graphql'

/**
 * serverProduct data is stale and incomplete (because we SSRed it).
 * Let's use it's value as placeholder while we fetch the rest of the data
 * on the browser
 */
export const useProduct = <T extends Partial<BrowserProductQueryQuery>>(
  variables: BrowserProductQueryQueryVariables,
  fallbackData?: T
) =>
  useQuery<BrowserProductQueryQuery & T, BrowserProductQueryQueryVariables>({
    ...BrowserProductQuery,
    variables,
    fallbackData,
    revalidateOnMount: true,
    suspense: false,
  })

export const query = gql`
  query BrowserProductQuery($locator: StoreProductID!) {
    product(locator: $locator) {
      ...ProductViewFragment_product
    }
  }
`
