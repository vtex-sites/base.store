import React from 'react'
import Button from 'src/components/ui/Button'
import EmptyState from 'src/components/common/EmptyState'
import IconSVG from 'src/components/common/IconSVG'

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
        <IconSVG name="ShoppingCart" width={56} height={56} weight="thin" />
        <p>Your Cart is empty</p>
      </header>
      <Button onClick={onDismiss} variant="secondary">
        Start Shopping
      </Button>
    </EmptyState>
  )
}

export default EmptyCart
