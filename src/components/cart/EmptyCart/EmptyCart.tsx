import React, { lazy } from 'react'
import LazyIcon from 'src/components/common/LazyIcon'
import Button from 'src/components/ui/Button'
import EmptyState from 'src/components/common/EmptyState'
import 'src/styles/icons.scss'
import './empty-cart.scss'

const ShoppingCartIcon = lazy(
  () => import('phosphor-react/src/icons/ShoppingCart')
)

interface Props {
  /**
   * This function is called when `Start Shopping` button is clicked
   */
  onDismiss: () => void
}

function EmptyCart({ onDismiss }: Props) {
  return (
<<<<<<< HEAD
    <EmptyState>
      <header data-empty-cart-title>
        <ShoppingCartIcon size="56" weight="thin" />
=======
    <div data-testid="cart-empty-state" data-empty-cart>
      <div data-empty-cart-title>
        <span className="icon__32">
          <LazyIcon icon={ShoppingCartIcon} size="32" />
        </span>
>>>>>>> 1fd8eb2 (Lazyload Phosphor-react icons)
        <p>Your Cart is empty</p>
      </header>
      <Button onClick={onDismiss} variant="secondary">
        Start Shopping
      </Button>
    </EmptyState>
  )
}

export default EmptyCart
