import type { Cart } from './useCart'

export const validateCart = async (cart: Cart) => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(cart),
    credentials: 'omit',
  })

  if (response.ok) {
    return response.json()
  }

  throw new Error('Something went wrong while validating cart')
}
