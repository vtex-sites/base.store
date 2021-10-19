import { request as baseRequest } from '@vtex/graphql-utils'
import type { RequestOptions as GraphQLRequestOptions } from '@vtex/graphql-utils'

export type RequestOptions = GraphQLRequestOptions

export const request = async <Query = unknown, Variables = unknown>(
  options: RequestOptions
) => {
  const { data, errors } = await baseRequest<Variables, Query>(
    '/api/graphql',
    options
  )

  if (errors?.length) {
    throw errors[0]
  }

  return data
}
