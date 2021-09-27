import { useCallback } from 'react'
import type { AddToCartEvent, Item as AnalyticsItem } from '@vtex/store-sdk'
import { sendAnalyticsEvent, useSession } from '@vtex/store-sdk'

import { useUI } from '../ui'
import { useCart } from './useCart'
import type { CartItem } from './validate'

type AdditionalItemProperties = {
  product_reference_id: string | null
  sku_reference_id: string | null
  sku_name: string | null
}

interface VTEXAddToCartEvent extends AddToCartEvent {
  data: AddToCartEvent['data'] & {
    items: Array<AnalyticsItem & AdditionalItemProperties>
  }
}

type Item = CartItem & {
  brand: string
  categories: Array<Maybe<{ name: Maybe<string> }>>
}

export const useBuyButton = (item: Item | null) => {
  const { addItem } = useCart()
  const { openMinicart } = useUI()
  const {
    currency: { code },
  } = useSession()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      if (!item) {
        return
      }

      sendAnalyticsEvent<VTEXAddToCartEvent>({
        type: 'add_to_cart',
        data: {
          currency: code,
          value: item.price * item.quantity,
          items: [
            {
              item_id: item.id,
              quantity: item.quantity,
              item_variant: item.skuId,
              item_brand: item.brand,
              item_category: item?.categories?.[0]?.name ?? undefined,
              item_category2: item?.categories?.[1]?.name ?? undefined,
              item_category3: item?.categories?.[2]?.name ?? undefined,
              item_category4: item?.categories?.[3]?.name ?? undefined,
              item_category5: item?.categories?.[4]?.name ?? undefined,
              item_name: item.name,
              price: item.price,
              currency: code,
              product_reference_id: item.id,
              sku_reference_id: item.skuId,
              sku_name: item.name,
            },
          ],
        },
      })

      addItem(item)
      openMinicart()
    },
    [addItem, code, item, openMinicart]
  )

  return {
    onClick,
    'data-testid': 'buy-button',
    'data-sku': item?.itemOffered.sku,
    'data-seller': item?.seller.identifier,
  }
}
