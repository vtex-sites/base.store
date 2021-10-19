import { useCallback } from 'react'
import type {
  AddToCartEvent,
  AddToCartData,
  Item as AnalyticsItem,
  CurrencyCode,
} from '@vtex/store-sdk'
import { sendAnalyticsEvent, useSession } from '@vtex/store-sdk'

import { useUI } from '../ui'
import { useCart } from './useCart'
import type { CartItem } from './validate'

type AdditionalItemProperties = {
  product_reference_id: string | null
  sku_name: string | null
}

interface VTEXAddToCartEvent extends AddToCartEvent {
  data: AddToCartData & {
    items: Array<AnalyticsItem & AdditionalItemProperties>
  }
}

type AdditionalAnalyticsProperties = {
  name: string
  brand: string
  referenceId: string
  productId: string
}

type AnalyticsCartItem = CartItem & AdditionalAnalyticsProperties

export const useBuyButton = (item: AnalyticsCartItem | null) => {
  const { addItem } = useCart()
  const { openMinicart } = useUI()
  const {
    currency: { code },
  } = useSession()

  const currency = code as CurrencyCode

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      if (!item) {
        return
      }

      sendAnalyticsEvent<VTEXAddToCartEvent>({
        type: 'add_to_cart',
        data: {
          currency,
          value: item.price * item.quantity, // TODO: In the future, we can explore more robust ways of calculating the value (gift items, discounts, etc.).
          items: [
            {
              currency,
              item_id: item.productId,
              quantity: item.quantity,
              item_variant: item.id,
              item_name: item.name,
              item_brand: item.brand,
              price: item.price,
              product_reference_id: item.referenceId,
              sku_name: item.itemOffered.name,
            },
          ],
        },
      })

      const { price, listPrice, seller, quantity, itemOffered } = item
      const cartItem: Omit<CartItem, 'id'> = {
        price,
        listPrice,
        seller,
        quantity,
        itemOffered,
      }

      addItem(cartItem)
      openMinicart()
    },
    [addItem, currency, item, openMinicart]
  )

  return {
    onClick,
    'data-testid': 'buy-button',
    'data-sku': item?.itemOffered.sku,
    'data-seller': item?.seller.identifier,
  }
}
