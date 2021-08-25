import { useGlobalUIState, useCart } from '@vtex/store-sdk'
import React from 'react'

function CartToggle() {
  const { openMinicart } = useGlobalUIState()
  const { totalUniqueItems } = useCart()

  return <button onClick={openMinicart}>cart: {totalUniqueItems}</button>
}

export default CartToggle
