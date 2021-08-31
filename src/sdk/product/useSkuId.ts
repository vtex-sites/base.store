import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { useMemo } from 'react'

export const useSkuId = () => {
  const { href, state } = useLocation()
  const skuId: string | null = (state as any)?.skuId ?? null

  return useMemo(
    () =>
      [
        skuId,
        (id: string) => navigate(href, { state: { skuId: id } }),
      ] as const,
    [href, skuId]
  )
}
