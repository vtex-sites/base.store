/**
 * TODO: Add analytics events here
 * */
import { useCallback } from 'react'
import { sendAnalyticsEvent, useSession } from '@faststore/sdk'
import type { CurrencyCode } from '@faststore/sdk'
import type {
  AnalyticsCartItem,
  VTEXRemoveFromCartEvent,
} from 'src/sdk/analytics/types'

import { useCart } from './useCart'

export const useRemoveButton = (item: AnalyticsCartItem | null | undefined) => {
  const { removeItem } = useCart()
  const {
    currency: { code },
  } = useSession()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      if (!item) {
        return
      }

      sendAnalyticsEvent<VTEXRemoveFromCartEvent>({
        type: 'remove_from_cart',
        data: {
          currency: code as CurrencyCode,
          value: item.price * item.quantity, // TODO: In the future, we can explore more robust ways of calculating the value (gift items, discounts, etc.).
          items: [
            {
              item_id: item.productId,
              item_name: item.name,
              currency: code as CurrencyCode,
              item_brand: item.brand,
              item_variant: item.itemOffered.sku,
              price: item.price,
              quantity: item.quantity,
              product_reference_id: item.referenceId,
              sku_name: item.itemOffered.name,
            },
          ],
        },
      })

      removeItem(item.id)
    },
    [code, item, removeItem]
  )

  return {
    onClick,
    'data-testid': 'remove-from-cart-button',
    'data-sku': item?.itemOffered.sku,
  }
}
