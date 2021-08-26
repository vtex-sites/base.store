import { useCart } from '@vtex/store-sdk'
import React from 'react'
import { useUI } from 'src/sdk/ui'

import CartItem from '../CartItem'

function CartSidebar() {
  const { closeMinicart } = useUI()
  const { items, total, subTotal, totalUniqueItems, totalItems } = useCart()

  return (
    <div>
      <button onClick={closeMinicart}>Close</button>
      <div>Cart Item Detais</div>

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div>Cart Summary</div>

      <div>uniqueItems: {totalUniqueItems}</div>
      <div>items: {totalItems}</div>
      <div>subTotal: {subTotal}</div>
      <div>total: {total}</div>
    </div>
  )
}

export default CartSidebar
