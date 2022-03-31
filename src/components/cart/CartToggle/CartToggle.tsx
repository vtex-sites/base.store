import React from 'react'
import { ButtonIcon } from 'src/components/ui/Button'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import Icon from 'src/components/ui/Icon'

import './cart-toggle.scss'

function CartToggle() {
  const btnProps = useCartToggleButton()

  return (
    <ButtonIcon
      data-fs-button-cart="true"
      aria-label={`Cart with ${btnProps['data-items']} items`}
      icon={<Icon name="ShoppingCart" width={32} height={32} />}
      {...btnProps}
    />
  )
}

export default CartToggle
