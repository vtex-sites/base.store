import React, { useState } from 'react'
import { useCart } from 'src/sdk/cart/useCart'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import { useCheckoutButton } from 'src/sdk/cart/useCheckoutButton'
import Button from 'src/components/ui/Button'
import {
  ArrowRight as ArrowRightIcon,
  X as XIcon,
  Truck as TruckIcon,
} from 'phosphor-react'
import { Badge } from 'src/components/ui/Badge'
import Alert from 'src/components/ui/Alert'

import CartItem from '../CartItem'
import OrderSummary from '../OrderSummary'
import EmptyCart from '../EmptyCart'

import './cart-sidebar.scss'

function CartSidebar() {
  const btnProps = useCheckoutButton()
  const cart = useCart()
  const toggleProps = useCartToggleButton()
  const { items, gifts, totalItems, isValidating, subTotal, total } = cart
  const isBrowser = typeof window !== 'undefined'
  const [showAlert, setShowAlert] = useState<boolean>(() => {
    return (
      (isBrowser && !window?.localStorage.getItem('dismissed-alert-ALERTID')) ||
      true
    )
  })

  const onAlertClose = () => {
    setShowAlert(false)

    if (isBrowser) {
      window?.localStorage.setItem('dismissed-alert-ALERTID', 'true')
    }
  }

  return (
    <div cart-sidebar data-testid="cart-sidebar">
      <div cart-sidebar-header>
        <p className="title-section">Your Cart</p>
        <Badge variant="new" small>
          {totalItems}
        </Badge>
        <Button
          variant="tertiary"
          icon={<XIcon size={18} weight="bold" />}
          iconPosition="right"
          {...toggleProps}
        />
        {showAlert && (
          <Alert
            icon={<TruckIcon size={24} />}
            dismissible
            onClose={onAlertClose}
          >
            Free shiping starts at $300
          </Alert>
        )}
      </div>
      {totalItems > 0 ? (
        <>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          {/* TODO: add conditional here */}
          <div>Gifts</div>
          {gifts.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

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
