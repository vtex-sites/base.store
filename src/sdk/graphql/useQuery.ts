import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'

import { request } from './request'
import type { RequestOptions } from './request'

export type QueryOptions = SWRConfiguration & RequestOptions

export const getKey = <V>(operationName: string, variables: V) =>
  `${operationName}::${JSON.stringify(variables)}`

export const DEFAULT_OPTIONS = {
  errorRetryCount: 3,
  refreshWhenHidden: false,
  refreshWhenOffline: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: true,
}

export const useQuery = <Query = any, Variables = any>(
  operationName: string,
  variables: Variables,
  options?: QueryOptions
) =>
  useSWR<Query, any[]>(getKey(operationName, variables), {
    fetcher: () => request<Query, Variables>(operationName, variables, options),
    ...DEFAULT_OPTIONS,
    ...options,
  })
