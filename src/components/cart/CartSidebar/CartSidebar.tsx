import { List } from '@faststore/ui'
import React, { lazy, Suspense, useRef } from 'react'
import { useCart } from 'src/sdk/cart/useCart'
import { useCheckoutButton } from 'src/sdk/cart/useCheckoutButton'
import Button from 'src/components/ui/Button'
import IconButton from 'src/components/ui/IconButton'
import { Badge } from 'src/components/ui/Badge'
import Alert from 'src/components/ui/Alert'
import SlideOver from 'src/components/ui/SlideOver'
import { useUI } from 'src/sdk/ui'

import CartItem from '../CartItem'
import EmptyCart from '../EmptyCart'
import OrderSummary from '../OrderSummary'

import './cart-sidebar.scss'

type Callback = () => unknown

const ArrowRightIcon = lazy(() => import('phosphor-react/src/icons/ArrowRight'))
const XIcon = lazy(() => import('phosphor-react/src/icons/X'))
const TruckIcon = lazy(() => import('phosphor-react/src/icons/Truck'))

const LazyIcon = ({
  icon: Icon,
  size = 32,
}: PropsWithChildren<{
  size?: number
  icon: ElementType<{ size: number }>
}>) => {
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <Suspense fallback={null}>
      <Icon size={size} />
    </Suspense>
  )
}

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
      className="cart-sidebar"
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
          icon={
            <div style={{ width: '32px', height: '32px' }}>
              <LazyIcon icon={XIcon} />
            </div>
          }
          onClick={() => dismissTransition.current?.()}
        />
      </header>
      <Alert
        icon={
          <div style={{ width: '24px', height: '24px' }}>
            <LazyIcon icon={TruckIcon} size={24} />
          </div>
        }
      >
        Free shiping starts at $300
      </Alert>

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
                  icon={
                    !isValidating && (
                      <div style={{ width: '18px', height: '18px' }}>
                        <LazyIcon icon={ArrowRightIcon} size={18} />
                      </div>
                    )
                  }
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
