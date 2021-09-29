import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import { useCheckoutButton } from 'src/sdk/cart/useCheckoutButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import Button from 'src/components/ui/Button'

import CartItem from '../CartItem'

function CartSidebar() {
  const btnProps = useCheckoutButton()
  const cart = useCart()
  const subTotal = useFormattedPrice(cart.subTotal)
  const total = useFormattedPrice(cart.total)
  const toggleProps = useCartToggleButton()
  const { items, totalItems, totalUniqueItems, isValidating } = cart

  return (
    <div data-testid="cart-sidebar">
      <Button {...toggleProps}>Close</Button>
      <div>Cart Item Detais</div>

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div>Cart Summary</div>

      <div>uniqueItems: {totalUniqueItems}</div>
      <div>items: {totalItems}</div>
      <div>subTotal: {subTotal}</div>
      <div>total: {total}</div>
      <Button {...btnProps}>{isValidating ? 'loading...' : 'Checkout'}</Button>
    </div>
  )
}

export default CartSidebar
