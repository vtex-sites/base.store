import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import { useCheckoutButton } from 'src/sdk/cart/useCheckoutButton'
import Button from 'src/components/ui/Button'
import { ArrowRight as ArrowRightIcon } from 'phosphor-react'

import CartItem from '../CartItem'
import OrderSummary from '../OrderSummary'

import './cart-sidebar.scss'

function CartSidebar() {
  const btnProps = useCheckoutButton()
  const cart = useCart()
  const toggleProps = useCartToggleButton()
  const { items, gifts, totalItems, isValidating, subTotal, total } = cart

  return (
    <div className="cart-sidebar" data-testid="cart-sidebar">
      <Button {...toggleProps}>Close</Button>
      <div>Cart Item Detais</div>

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div>Gifts</div>
      {gifts.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      {!!totalItems && (
        <>
          <div>Cart Summary</div>

          <OrderSummary
            subTotal={subTotal}
            total={total}
            numberOfItems={totalItems}
            checkoutButton={
              <Button
                data-cart-checkout-button
                variant="primary"
                icon={!isValidating && <ArrowRightIcon size={18} />}
                iconPosition="right"
                {...btnProps}
              >
                {isValidating ? 'Loading...' : 'Checkout'}
              </Button>
            }
          />
        </>
      )}
    </div>
  )
}

export default CartSidebar
