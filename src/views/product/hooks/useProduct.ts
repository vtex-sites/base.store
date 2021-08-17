import { gql } from '@vtex/gatsby-plugin-graphql'
import { useQuery } from 'src/sdk/graphql/useQuery'

import type {
  BrowserProductQueryQuery,
  BrowserProductQueryQueryVariables,
} from './__generated__/BrowserProductQuery.graphql'
import { BrowserProductQuery } from './__generated__/BrowserProductQuery.graphql'

export const useProduct = <T extends Partial<BrowserProductQueryQuery>>(
  variables: BrowserProductQueryQueryVariables,
  initialData?: T
) =>
  useQuery<BrowserProductQueryQuery & T, BrowserProductQueryQueryVariables>({
    ...BrowserProductQuery,
    variables,
    initialData,
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
