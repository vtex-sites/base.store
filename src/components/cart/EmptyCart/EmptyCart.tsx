import React from 'react'
import Button from 'src/components/ui/Button'
import { ShoppingCart as ShoppingCartIcon } from 'phosphor-react'

import './empty-cart.scss'

interface Props {
  /**
   * This function is called when `Start Shopping` button is clicked
   */
  onDismiss: () => void
}

function EmptyCart({ onDismiss }: Props) {
  return (
    <div data-testid="cart-empty-state" data-empty-cart>
      <div data-empty-cart-title>
        <ShoppingCartIcon size="32" />
        <p>Your Cart is empty</p>
      </div>
      <Button onClick={onDismiss} variant="primary">
        Start Shopping
      </Button>
    </div>
  )
}

export default EmptyCart
