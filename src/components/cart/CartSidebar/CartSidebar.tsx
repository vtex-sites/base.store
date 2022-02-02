import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'
import { useCheckoutButton } from 'src/sdk/cart/useCheckoutButton'
import Button from 'src/components/ui/Button'
import IconButton from 'src/components/ui/IconButton'
import {
  ArrowRight as ArrowRightIcon,
  X as XIcon,
  Truck as TruckIcon,
} from 'phosphor-react'
import { Badge } from 'src/components/ui/Badge'
import Alert from 'src/components/ui/Alert'
import SlideOver from 'src/components/ui/SlideOver'
import { useUI } from 'src/sdk/ui'

import CartItem from '../CartItem'
import OrderSummary from '../OrderSummary'
import EmptyCart from '../EmptyCart'

import './cart-sidebar.scss'

function CartSidebar() {
  const btnProps = useCheckoutButton()
  const cart = useCart()
  const { displayMinicart, closeMinicart } = useUI()

  const { items, totalItems, isValidating, subTotal, total } = cart

  let onDismissTransition: () => unknown
  const isEmpty = items.length === 0

  return (
    <SlideOver
      isOpen={displayMinicart}
      onDismiss={closeMinicart}
      onDismissTransition={(callback) => (onDismissTransition = callback)}
      size="partial"
      direction="rightSide"
      className="cart-sidebar__content"
    >
      <div className="cart-sidebar" data-testid="cart-sidebar">
        <div
          className={`cart-sidebar__body ${
            isEmpty ? 'cart-sidebar__body--empty' : ''
          }`}
        >
          <div className="cart-sidebar__fixed-elements">
            <header className="cart-sidebar__header">
              <div className="cart-sidebar__title">
                <p className="title-display">Your Cart</p>
                <Badge variant="new" small>
                  {totalItems}
                </Badge>
              </div>
              <IconButton
                data-testid="cart-sidebar-button-close"
                classes="cart-sidebar__button"
                aria-label="Close Cart"
                icon={<XIcon size={32} />}
                onClick={() => onDismissTransition()}
              />
            </header>
            <Alert icon={<TruckIcon size={24} />}>
              Free shiping starts at $300
            </Alert>
          </div>

          {isEmpty ? (
            <EmptyCart onDismiss={() => onDismissTransition()} />
          ) : (
            <div className="cart-sidebar__items">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {!isEmpty && (
          <footer className="cart-sidebar__footer">
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
          </footer>
        )}
      </div>
    </SlideOver>
  )
}

export default CartSidebar
