import { useCallback } from 'react'
import { sendAnalyticsEvent, useSession } from '@faststore/sdk'
import type { CurrencyCode } from '@faststore/sdk'
import type {
  AnalyticsCartItem,
  VTEXAddToCartEvent,
} from 'src/sdk/analytics/types'

import { useUI } from '../ui'
import { useCart } from './useCart'

export const useBuyButton = (item: AnalyticsCartItem | null) => {
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
          currency: code as CurrencyCode,
          // TODO: In the future, we can explore more robust ways of
          // calculating the value (gift items, discounts, etc.).
          value: item.price * item.quantity,
          items: [
            {
              currency: code as CurrencyCode,
              item_id: item.productId,
              quantity: item.quantity,
              item_variant: item.itemOffered.sku,
              item_name: item.name,
              item_brand: item.brand,
              price: item.price,
              product_reference_id: item.referenceId,
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
