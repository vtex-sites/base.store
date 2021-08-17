import { useMemo } from 'react'
import { useLocation } from '@reach/router'

import type { Props } from '../index'

export const useBreadcrumbJsonLd = (options: Props) => {
  const { product } = options
  const { pathname } = useLocation()

  return useMemo(() => {
    const { categoryTree, productName } = product

    const itemListElements = categoryTree!.map((item, index: number) => ({
      position: index + 1,
      name: item!.name!,
      item: item!.href!,
    }))

    const len: number = itemListElements.length

    itemListElements.push({
      position: len + 1,
      name: productName!,
      item: pathname,
    })

    return {
      itemListElements,
    }
  }, [pathname, product])
}
