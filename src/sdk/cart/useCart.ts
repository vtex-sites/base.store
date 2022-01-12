import { useCart as useSDKCart } from '@faststore/sdk'
import { useCallback, useMemo } from 'react'

import { getItemId, isGift } from './validate'
import type { Cart, CartItem } from './validate'
import type { CartItemWithAnalytics } from './useBuyButton'

export const useCart = () => {
  const { addItem: addItemToCart, ...cart } =
    useSDKCart<CartItemWithAnalytics>()

  const addItem = useCallback(
    <Item extends Omit<CartItemWithAnalytics, 'id'>>(item: Item) => {
      const cartItem = {
        ...item,
        id: getItemId(item),
      }

      addItemToCart(cartItem)
    },
    [addItemToCart]
  )

  return useMemo(
    () => ({
      ...cart,
      addItem,
      messages: (cart as Cart<CartItem>).messages,
      gifts: cart.items.filter((item) => isGift(item)),
      items: cart.items.filter((item) => !isGift(item)),
      totalUniqueItems: cart.items.length,
      totalItems: cart.items.reduce(
        (acc, curr) => acc + (isGift(curr) ? 0 : curr.quantity),
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
