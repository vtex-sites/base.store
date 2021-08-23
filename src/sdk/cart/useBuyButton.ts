import { useCart, useGlobalUIState } from '@vtex/store-sdk'
import { useCallback } from 'react'
import type { CartItem } from '@vtex/store-sdk'

export const useBuyButton = (item: CartItem | null | undefined) => {
  const { addItem } = useCart()
  const { openMinicart } = useGlobalUIState()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      if (!item) {
        return
      }

      addItem(item)
      openMinicart()
    },
    [item, addItem, openMinicart]
  )

  return { onClick }
}
