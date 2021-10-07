import { useCallback } from 'react'
import type {
  AddToCartEvent,
  AddToCartData,
  Item as AnalyticsItem,
} from '@vtex/store-sdk'
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
  data: AddToCartData & {
    items: Array<AnalyticsItem & AdditionalItemProperties>
  }
}

export const useBuyButton = (item: CartItem | null) => {
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
          value: item.price * item.quantity, // TODO: In the future, we can explore more robust ways of calculating the value (gift items, discounts, etc.).
          items: [
            {
              item_id: item.id,
              quantity: item.quantity,
              item_variant: item.itemOffered.sku,
              item_name: item.itemOffered.name,
              price: item.price,
              currency: code,
              product_reference_id: item.id,
              sku_reference_id: item.itemOffered.sku,
              sku_name: item.itemOffered.name,
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
