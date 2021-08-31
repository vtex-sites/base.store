import { useMemo } from 'react'

interface Options {
  slug: string
  skuId: string
}

export const useProductLink = ({ slug, skuId }: Options) =>
  useMemo(() => {
    const onClick = () => {
      // TODO: Add onClick analytics event
    }

    return {
      to: `/${slug}/p`,
      state: { skuId },
      onClick,
      'data-testid': 'product-link',
    }
  }, [skuId, slug])
