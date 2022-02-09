import { gql } from '@vtex/graphql-utils'
import type {
  SessionQueryQuery,
  SessionQueryQueryVariables,
} from '@generated/graphql'

import { useQuery } from '../graphql/useQuery'
import type { QueryOptions } from '../graphql/useQuery'

export const query = gql`
  query SessionQuery {
    session {
      id
    }
  }
`

export const useSessionQuery = (options?: QueryOptions) => {
  const { data } = useQuery<SessionQueryQuery, SessionQueryQueryVariables>(
    query,
    {},
    options
  )

  return data?.session.id
}
