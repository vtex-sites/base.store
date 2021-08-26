import { useCart } from '@vtex/store-sdk'
import { useCallback } from 'react'
import type { CartItem } from '@vtex/store-sdk'

import { useUI } from '../ui'

export const useBuyButton = (item: CartItem | null | undefined) => {
  const { addItem } = useCart()
  const { openMinicart, pushToast } = useUI()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      if (!item) {
        return
      }

      addItem(item)
      openMinicart()
      pushToast({ message: `Item added to cart ${item.id}`, status: 'info' })
    },
    [addItem, item, openMinicart, pushToast]
  )

  return { onClick }
}
