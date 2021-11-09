import { useEffect, useMemo, useState } from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type { CurrencyCode, Item, ViewItemListEvent } from '@faststore/sdk'
import { sendAnalyticsEvent, useSession } from '@faststore/sdk'
import { useDebounce } from 'use-debounce'

export const useViewItemListEvent = () => {
  const DEBOUNCE_DELAY = 1500

  const [viewedProducts, setViewedProducts] = useState<
    ProductSummary_ProductFragment[]
  >([])

  const [debouncedViewedProducts] = useDebounce(viewedProducts, DEBOUNCE_DELAY)

  const {
    currency: { code },
  } = useSession()

  const currency = code as CurrencyCode

  const event: ViewItemListEvent = useMemo(() => {
    const products: Item[] =
      debouncedViewedProducts.map((product) => {
        return {
          item_id: product.id,
          item_name: product.name,
          currency,
          discount:
            product.offers.offers[0].listPrice - product.offers.offers[0].price,
          item_brand: product.brand.name,
          item_variant: product.sku,
          location_id: product.id,
          price: product.offers.offers[0].price,
        }
      }) ?? []

    return {
      type: 'view_item_list',
      data: {
        items: products,
      },
    }
  }, [currency, debouncedViewedProducts])

  useEffect(() => {
    if (debouncedViewedProducts.length) {
      setViewedProducts([])
      sendAnalyticsEvent(event)
    }
  }, [code, debouncedViewedProducts, event])

  return { viewedProducts, setViewedProducts }
}
