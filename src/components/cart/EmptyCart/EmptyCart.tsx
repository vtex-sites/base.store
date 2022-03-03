import React from 'react'
import { ShoppingCart as ShoppingCartIcon } from 'phosphor-react'
import Button from 'src/components/ui/Button'
import EmptyState from 'src/components/common/EmptyState'

interface Props {
  /**
   * This function is called when `Start Shopping` button is clicked
   */
  onDismiss: () => void
}

function EmptyCart({ onDismiss }: Props) {
  return (
    <EmptyState>
      <header data-empty-cart-title>
        <ShoppingCartIcon size="56" weight="thin" />
        <p>Your Cart is empty</p>
      </header>
      <Button onClick={onDismiss} variant="secondary">
        Start Shopping
      </Button>
    </EmptyState>
  )
}

export default EmptyCart
