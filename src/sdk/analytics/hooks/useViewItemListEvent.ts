import { useCallback } from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type { CurrencyCode, Item, ViewItemListEvent } from '@faststore/sdk'
import { sendAnalyticsEvent, useSession } from '@faststore/sdk'

type Props = {
  products: ProductSummary_ProductFragment[]
  title: string
}

export const useViewItemListEvent = ({ products, title }: Props) => {
  const {
    currency: { code },
  } = useSession()

  const sendViewItemListEvent = useCallback(() => {
    const productItems: Item[] = products.map((product) => {
      return {
        item_id: product.id,
        item_name: product.name,
        currency: code as CurrencyCode,
        discount:
          product.offers.offers[0].listPrice - product.offers.offers[0].price,
        item_brand: product.brand.name,
        item_variant: product.sku,
        location_id: product.id,
        price: product.offers.offers[0].price,
      }
    })

    const event: ViewItemListEvent = {
      name: 'view_item_list',
      params: {
        item_list_name: title,
        item_list_id: title,
        items: productItems,
      },
    }

    sendAnalyticsEvent(event)
  }, [code, products, title])

  return { sendViewItemListEvent }
}
