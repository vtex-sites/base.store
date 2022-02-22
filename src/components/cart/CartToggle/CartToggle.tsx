import React, { lazy } from 'react'
import IconButton from 'src/components/ui/IconButton'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import LazyIcon from 'src/components/common/LazyIcon'

import './cart-toggle.scss'

const ShoppingCartIcon = lazy(
  () => import('phosphor-react/src/icons/ShoppingCart')
)

function CartToggle() {
  const btnProps = useCartToggleButton()

  return (
    <IconButton
      {...btnProps}
      className="cart-toggle"
      aria-label={`Cart with ${btnProps['data-items']} items`}
      icon={<LazyIcon icon={ShoppingCartIcon} size={32} />}
    />
  )
}

export default CartToggle
