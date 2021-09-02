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
