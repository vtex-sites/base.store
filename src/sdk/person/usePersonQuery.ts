import { useEffect } from 'react'
import { gql } from '@vtex/graphql-utils'
import type {
  PersonQueryQuery,
  PersonQueryQueryVariables,
} from '@generated/graphql'
import { useSession } from '@faststore/sdk'

import { useQuery } from '../graphql/useQuery'
import type { QueryOptions } from '../graphql/useQuery'

export const query = gql`
  query PersonQuery {
    person {
      id
      email
      givenName
      familyName
      isAuthenticated
    }
  }
`

export const usePersonQuery = (options?: QueryOptions) => {
  const { data } = useQuery<PersonQueryQuery, PersonQueryQueryVariables>(
    query,
    {},
    options
  )

  const { setSession, ...session } = useSession()

  useEffect(() => {
    if (data?.person) setSession({ ...session, user: data?.person })
  }, [data?.person, session, setSession])

  return session.user
}
