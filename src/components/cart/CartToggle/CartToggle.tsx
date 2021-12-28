import React from 'react'
import Button from 'src/components/ui/Button'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import { ShoppingCart as ShoppingCartIcon } from 'phosphor-react'

import './cart-toggle.scss'

function CartToggle() {
  const btnProps = useCartToggleButton()

  return (
    <Button
      {...btnProps}
      className="cart-toggle"
      aria-label={`Cart with ${btnProps['data-items']} items`}
    >
      <ShoppingCartIcon size={32} />
    </Button>
  )
}

export default CartToggle
