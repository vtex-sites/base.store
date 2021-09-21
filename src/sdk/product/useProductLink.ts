import { useMemo } from 'react'

interface Options {
  slug: string
}

export const useProductLink = ({ slug }: Options) =>
  useMemo(() => {
    const onClick = () => {
      // TODO: Add onClick analytics event
    }

    return {
      to: `/${slug}/p`,
      onClick,
      'data-testid': 'product-link',
    }
  }, [slug])
