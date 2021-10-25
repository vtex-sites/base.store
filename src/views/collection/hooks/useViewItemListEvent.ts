import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type { CurrencyCode, Item, ViewItemListEvent } from '@vtex/store-sdk'
import { sendAnalyticsEvent, useSession } from '@vtex/store-sdk'
import { useMemo } from 'react'

export const useViewItemListEvent = (
  productList: ProductSummary_ProductFragment[]
) => {
  const {
    currency: { code },
  } = useSession()

  const currency = code as CurrencyCode
  const event: ViewItemListEvent = useMemo(() => {
    const products: Item[] =
      productList?.map((product) => {
        return {
          item_id: product.id,
          item_name: product.name,
          currency,
          discount:
            product.offers.offers[0].listPrice - product.offers.offers[0].price,
          item_brand: product.brand.name,
          item_variant: product.isVariantOf.name,
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
  }, [currency, productList])

  event.data.items?.length && sendAnalyticsEvent<ViewItemListEvent>(event)
}
