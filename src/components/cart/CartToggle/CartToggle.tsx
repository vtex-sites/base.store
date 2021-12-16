import React from 'react'
import Button from 'src/components/ui/Button'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'

import './cart-toggle.scss'

function CartToggle() {
  const btnProps = useCartToggleButton()

  return (
    <Button {...btnProps} data-store-button-cart>
      <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="" />
    </Button>
  )
}

export default CartToggle
