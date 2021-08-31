import { useCart as useSDKCart } from '@vtex/store-sdk'
import { useMemo, useCallback } from 'react'
import type { CartItem as ICartItem } from '@vtex/store-sdk'

export interface CartItem extends ICartItem {
  image: {
    src: string
    alt: string
  }
  skuId: string
  seller: string
  name: string
  price: number
  listPrice: number
  quantity: number
  giftQuantity: number
}

export interface CartMessages {
  status: 'error'
  text: string
  code: string
}

export interface Cart {
  id: string
  items: CartItem[]
  messages?: CartMessages[]
}

export const getItemId = (item: Pick<CartItem, 'skuId' | 'seller'>) =>
  `${item.skuId}:${item.seller}`

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
      gifts: cart.items.filter((item) => item.giftQuantity > 0),
      totalUniqueItems: cart.items.length,
      totalItems: cart.items.reduce(
        (acc, curr) => acc + curr.quantity + curr.giftQuantity,
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
