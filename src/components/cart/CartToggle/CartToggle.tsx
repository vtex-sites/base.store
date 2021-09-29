import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'

function CartToggle() {
  const btnProps = useCartToggleButton()
  const { totalUniqueItems } = useCart()

  return (
    <button className="mx-3" {...btnProps}>
      cart: {totalUniqueItems}
    </button>
  )
}

export default CartToggle
