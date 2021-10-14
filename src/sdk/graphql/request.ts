import { request as baseRequest } from '@vtex/gatsby-plugin-graphql'
import type { RequestOptions as GraphQLRequestOptions } from '@vtex/gatsby-plugin-graphql'

export type RequestOptions = GraphQLRequestOptions

export const request = async <Query = unknown, Variables = unknown>(
  options: RequestOptions
) => {
  const requestHeaders: HeadersInit = new Headers()

  requestHeaders.set('Content-Type', 'application/json')

  if (options.fetchOptions) {
    options.fetchOptions.headers = requestHeaders
  } else {
    options.fetchOptions = { headers: requestHeaders }
  }

  const { data, errors } = await baseRequest<Variables, Query>(
    '/api/graphql',
    options
  )

  if (errors?.length) {
    throw errors[0]
  }

  return data
}
