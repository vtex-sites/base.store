import React from 'react'
import IconButton from 'src/components/ui/IconButton'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import { ShoppingCart as ShoppingCartIcon } from 'phosphor-react'

import './cart-toggle.scss'

function CartToggle() {
  const btnProps = useCartToggleButton()

  return (
    <IconButton
      {...btnProps}
      className="cart-toggle"
      aria-label={`Cart with ${btnProps['data-items']} items`}
      icon={<ShoppingCartIcon size={32} />}
    />
  )
}

export default CartToggle
