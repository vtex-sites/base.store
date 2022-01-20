import React from 'react'
import Button from 'src/components/ui/Button'
import { ShoppingCart as ShoppingCartIcon } from 'phosphor-react'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'

function CartSidebar() {
  const toggleProps = useCartToggleButton()

  return (
    <div data-testid="cart-empty-state">
      <ShoppingCartIcon size="32" />
      <span>Your Cart is empty</span>
      <Button {...toggleProps}>Start Shopping</Button>
    </div>
  )
}

export default CartSidebar
