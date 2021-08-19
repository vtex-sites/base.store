import type { Cart } from '@vtex/store-sdk'

// TODO: Add cart validation with backend in here
export const validateCart = async (cart: Cart): Promise<Cart> => {
  return cart
}
