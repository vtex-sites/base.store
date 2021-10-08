/**
 * TODO: Add analytics events here
 * */
import { useCallback } from 'react'

import { useCart } from './useCart'
import type { CartItem } from './validate'

export const useRemoveButton = (item: CartItem | null | undefined) => {
  const { removeItem } = useCart()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      if (!item) {
        return
      }

      removeItem(item.id)
    },
    [item, removeItem]
  )

  return { onClick, 'data-testid': 'remove-from-cart-button' }
}
