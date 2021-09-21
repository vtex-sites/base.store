import { useCart as useSDKCart } from '@vtex/store-sdk'
import { useCallback, useMemo } from 'react'

import { getItemId } from './validate'
import type { Cart, CartItem } from './validate'

export const useCart = () => {
  const { addItem: addItemToCart, ...cart } = useSDKCart<CartItem>()

  const addItem = useCallback(
    (item: Omit<CartItem, 'id'>) => {
      const cartItem = {
        id: getItemId(item),
        ...item,
      }

      addItemToCart(cartItem)
    },
    [addItemToCart]
  )

  return useMemo(
    () => ({
      ...cart,
      addItem,
      messages: (cart as Cart).messages,
      // gifts: cart.items.filter((item) => item.giftQuantity > 0),
      totalUniqueItems: cart.items.length,
      totalItems: cart.items.reduce(
        // (acc, curr) => acc + curr.quantity + curr.giftQuantity,
        (acc, curr) => acc + curr.quantity,
        0
      ),
      total: cart.items.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      ),
      subTotal: cart.items.reduce(
        (acc, curr) => acc + curr.listPrice * curr.quantity,
        0
      ),
    }),
    [addItem, cart]
  )
}
