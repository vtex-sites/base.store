import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type {
  BrowserProductQueryQuery,
  BrowserProductQueryQueryVariables,
} from '@generated/BrowserProductQuery.graphql'
import { BrowserProductQuery } from '@generated/BrowserProductQuery.graphql'

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
  query BrowserProductQuery($slug: String!) {
    vtex {
      product(slug: $slug) {
        ...ProductViewFragment_product
      }
    }
  }
`
