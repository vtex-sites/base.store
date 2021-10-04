import { useMemo } from 'react'
import { useSession } from '@vtex/store-sdk'

export type Options = { productID: string } | { slug: string }

const isSlug = (x: any): x is { slug: string } => typeof x.slug === 'string'

export const useProductVariables = (options: Options) => {
  const { channel } = useSession()
  const slug = isSlug(options)
  const value = slug ? options.slug : options.productID
  const key = slug ? 'slug' : 'id'

  return useMemo(
    () => [
      { key, value },
      { key: 'channel', value: channel },
    ],
    [channel, key, value]
  )
}
