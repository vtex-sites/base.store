import React from 'react'
import Button from 'src/components/ui/Button'
import { ShoppingCart as ShoppingCartIcon } from 'phosphor-react'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'

import './empty-cart.scss'

function EmptyCart() {
  const toggleProps = useCartToggleButton()

  return (
    <div data-testid="cart-empty-state" data-empty-cart>
      <div data-empty-cart-title>
        <ShoppingCartIcon size="32" />
        <p>Your Cart is empty</p>
      </div>
      <Button {...toggleProps} variant="primary">
        Start Shopping
      </Button>
    </div>
  )
}

export default EmptyCart
