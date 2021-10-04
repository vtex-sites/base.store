import { BrowserProductQuery } from '@generated/BrowserProductQuery.graphql'
import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { useProductVariables } from 'src/sdk/product/useProductVariables'
import type { Options } from 'src/sdk/product/useProductVariables'
import type {
  BrowserProductQueryQuery,
  BrowserProductQueryQueryVariables,
} from '@generated/BrowserProductQuery.graphql'
/**
 * serverProduct data is stale and incomplete (because we SSRed it).
 * Let's use it's value as placeholder while we fetch the rest of the data
 * on the browser
 */
export const useProduct = <T extends Partial<BrowserProductQueryQuery>>(
  options: Options,
  fallbackData?: T
) => {
  const locator = useProductVariables(options)

  return useQuery<
    BrowserProductQueryQuery & T,
    BrowserProductQueryQueryVariables
  >({
    ...BrowserProductQuery,
    variables: { locator },
    fallbackData,
    revalidateOnMount: true,
    suspense: false,
  })
}

export const query = gql`
  query BrowserProductQuery($locator: [IStoreSelectedFacet!]!) {
    product(locator: $locator) {
      ...ProductViewFragment_product
    }
  }
`
