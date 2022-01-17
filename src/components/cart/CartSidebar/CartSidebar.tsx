import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import { useCheckoutButton } from 'src/sdk/cart/useCheckoutButton'
import Button from 'src/components/ui/Button'

import CartItem from '../CartItem'
import CartSummary from '../CartSummary'

function CartSidebar() {
  const btnProps = useCheckoutButton()
  const cart = useCart()
  const toggleProps = useCartToggleButton()
  const { items, gifts, totalItems, isValidating, subTotal, total } = cart

  return (
    <div data-testid="cart-sidebar">
      <Button {...toggleProps}>Close</Button>
      <div>Cart Item Detais</div>

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div>Gifts</div>
      {gifts.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div>Cart Summary</div>

      <CartSummary
        subTotal={subTotal}
        total={total}
        numberOfItems={totalItems}
        checkoutButton={
          <Button {...btnProps}>
            {isValidating ? 'loading...' : 'Checkout'}
          </Button>
        }
      />
    </div>
  )
}

export default CartSidebar
