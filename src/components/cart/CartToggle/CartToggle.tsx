import { useCart } from '@vtex/store-sdk'
import React from 'react'
import { useUI } from 'src/sdk/ui'

function CartToggle() {
  const { openMinicart } = useUI()
  const { totalUniqueItems } = useCart()

  return <button onClick={openMinicart}>cart: {totalUniqueItems}</button>
}

export default CartToggle
