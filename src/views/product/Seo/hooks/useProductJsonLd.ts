import { useSession } from '@vtex/store-sdk'
import { useMemo } from 'react'
import { useLocation } from '@reach/router'

import type { Props } from '../index'

export const useProductJsonLd = (options: Props) => {
  const { pathname } = useLocation()
  const { currency } = useSession()
  const { product } = options

  return useMemo(() => {
    const { productName: name, items, description, brand } = product
    const sku = items?.[0]

    const images = sku?.images?.map((i) => i!.imageUrl!)
    const seller = sku?.sellers?.[0]
    const commercialOffer = seller?.commercialOffer

    if (!seller || !brand || !commercialOffer || !name || !description) {
      return null
    }

    const offers = {
      price: `${commercialOffer.spotPrice}`,
      priceCurrency: currency.code,
      url: pathname,
      priceValidUntil: commercialOffer.priceValidUntil?.slice(0, 10),
      availability:
        commercialOffer.availableQuantity! > 0
          ? ('InStock' as const)
          : ('OutOfStock' as const),
    }

    return {
      name,
      images,
      offers,
      sku: sku!.itemId!,
      brand,
      gtin13: sku!.ean!,
      description,
    }
  }, [currency, pathname, product])
}
