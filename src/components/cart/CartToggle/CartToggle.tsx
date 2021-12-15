import React from 'react'
import Button from 'src/components/ui/Button'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'

import * as styles from './cart-toggle.module.scss'

function CartToggle() {
  const btnProps = useCartToggleButton()

  return (
    <Button {...btnProps} className={styles.buttonCart}>
      <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="" />
    </Button>
  )
}

export default CartToggle
