import React, { useCallback } from 'react'
import type { CartItem as ICartItem } from '@vtex/store-sdk'
import { useCart } from '@vtex/store-sdk'

interface Props {
  item: ICartItem
}

const useRemoveButton = (item: ICartItem | null | undefined) => {
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

  return { onClick }
}

function CartItem({ item }: Props) {
  const btnProps = useRemoveButton(item)

  return (
    <div>
      <div>id: {item.id}</div>
      <div>price: {item.price}</div>
      <div>listPrice: {item.listPrice}</div>
      <div>quantity: {item.quantity.selling}</div>
      <div>gifts: {item.quantity.gift}</div>
      <button {...btnProps}>Remove Item</button>
    </div>
  )
}

export default CartItem
