import { List } from '@faststore/ui'
import {
  ArrowRight as ArrowRightIcon,
  Truck as TruckIcon,
  X as XIcon,
} from 'phosphor-react'
import React, { useRef } from 'react'
import Alert from 'src/components/ui/Alert'
import { Badge } from 'src/components/ui/Badge'
import Button from 'src/components/ui/Button'
import IconButton from 'src/components/ui/IconButton'
import SlideOver from 'src/components/ui/SlideOver'
import { useCart } from 'src/sdk/cart/useCart'
import { useCheckoutButton } from 'src/sdk/cart/useCheckoutButton'
import { useUI } from 'src/sdk/ui'

import CartItem from '../CartItem'
import EmptyCart from '../EmptyCart'
import OrderSummary from '../OrderSummary'

import './cart-sidebar.scss'

type Callback = () => unknown

function CartSidebar() {
  const btnProps = useCheckoutButton()
  const cart = useCart()
  const { displayMinicart, closeMinicart } = useUI()
  const dismissTransition = useRef<Callback | undefined>()

  const { items, totalItems, isValidating, subTotal, total } = cart

  const isEmpty = items.length === 0

  return (
    <SlideOver
      isOpen={displayMinicart}
      onDismiss={closeMinicart}
      onDismissTransition={(callback) => (dismissTransition.current = callback)}
      size="partial"
      direction="rightSide"
      className={`cart-sidebar ${isEmpty ? 'cart-sidebar--empty' : ''}`}
    >
      <header data-testid="cart-sidebar">
        <div className="cart-sidebar__title">
          <p className="title-display">Your Cart</p>
          <Badge variant="new" small>
            {totalItems}
          </Badge>
        </div>
        <IconButton
          data-testid="cart-sidebar-button-close"
          aria-label="Close Cart"
          icon={<XIcon size={32} />}
          onClick={() => dismissTransition.current?.()}
        />
      </header>
      <Alert icon={<TruckIcon size={24} />}>Free shiping starts at $300</Alert>

      {isEmpty ? (
        <EmptyCart onDismiss={() => dismissTransition.current?.()} />
      ) : (
        <>
          <List>
            {items.map((item) => (
              <li key={item.id}>
                <CartItem item={item} />
              </li>
            ))}
          </List>

          <footer>
            <OrderSummary
              subTotal={subTotal}
              total={total}
              numberOfItems={totalItems}
              checkoutButton={
                <Button
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
        </>
      )}
    </SlideOver>
  )
}

export default CartSidebar
