import type { ProductGalleryQueryQuery } from '@generated/graphql'
import { useMemo, useRef } from 'react'

export const useTotalCount = (data?: ProductGalleryQueryQuery) => {
  const totalCount = useRef<number>(0)

  return useMemo(() => {
    if (data) {
      totalCount.current = data.search.products.pageInfo.totalCount
    }

    return totalCount.current
  }, [data, totalCount])
}
