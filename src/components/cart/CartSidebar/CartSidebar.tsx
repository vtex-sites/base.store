import React from 'react'
import Button from 'src/components/ui/Button'
import { ShoppingCart as ShoppingCartIcon } from 'phosphor-react'

function CartSidebar() {
  return (
    <div data-testid="cart-sidebar">
      <ShoppingCartIcon size="25" weight="bold" />
      <div>Your cart is empty</div>
      <Button>Start Shopping</Button>
    </div>
  )
}

export default CartSidebar
