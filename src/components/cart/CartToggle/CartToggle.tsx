import React from 'react'
import Button from 'src/components/ui/Button'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import { ShoppingCart } from 'phosphor-react'

import './cart-toggle.scss'

function CartToggle() {
  const btnProps = useCartToggleButton()

  return (
    <Button {...btnProps} className="cart-toggle">
      <ShoppingCart />
    </Button>
  )
}

export default CartToggle
