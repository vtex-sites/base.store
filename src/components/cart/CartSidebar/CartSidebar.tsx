import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import { useCheckoutButton } from 'src/sdk/cart/useCheckoutButton'
import Button from 'src/components/ui/Button'
import { ArrowRight as ArrowRightIcon, X as XIcon } from 'phosphor-react'
import { Badge } from 'src/components/ui/Badge'

import CartItem from '../CartItem'
import OrderSummary from '../OrderSummary'
import EmptyCart from '../EmptyCart'

import './cart-sidebar.scss'

function CartSidebar() {
  const btnProps = useCheckoutButton()
  const cart = useCart()
  const toggleProps = useCartToggleButton()
  const { items, gifts, totalItems, isValidating, subTotal, total } = cart

  return (
    <div className="cart-sidebar" data-testid="cart-sidebar">
      <div cart-sidebar-header>
        <p className="title-section">Your Cart</p>
        <Badge variant="new" small>
          {totalItems}
        </Badge>
        <Button
          data-cart-checkout-button
          variant="tertiary"
          icon={<XIcon size={18} weight="bold" />}
          iconPosition="right"
          {...toggleProps}
        />
      </div>
      {totalItems > 0 ? (
        <>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div>Gifts</div>
          {gifts.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div>Cart Summary</div>

          <OrderSummary
            subTotal={subTotal}
            total={total}
            numberOfItems={totalItems}
            checkoutButton={
              <Button
                data-cart-checkout-button
                variant="primary"
                icon={<ArrowRightIcon size={18} />}
                iconPosition="right"
                {...btnProps}
              >
                {isValidating ? 'loading...' : 'Checkout'}
              </Button>
            }
          />
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  )
}

export default CartSidebar
