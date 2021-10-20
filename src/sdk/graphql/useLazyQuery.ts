import useSWR from 'swr'

import { request } from './request'
import { DEFAULT_OPTIONS, getKey } from './useQuery'
import type { QueryOptions } from './useQuery'

export const useLazyQuery = <Query = any, Variables = any>(
  operationName: string,
  variables: Variables,
  options?: QueryOptions
) => {
  const response = useSWR<Query | null, any[]>(
    getKey(operationName, variables),
    () => null,
    DEFAULT_OPTIONS
  )

  const execute = async (v: Variables) => {
    const data = await request<Query, Variables>(operationName, v, options)

    response.mutate(data, false)
  }

  return [execute, response] as [typeof execute, typeof response]
}
