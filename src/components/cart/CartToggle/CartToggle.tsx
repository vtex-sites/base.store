import { Link } from 'gatsby'
import React from 'react'
import Button from 'src/components/ui/Button'
import { useCart } from 'src/sdk/cart/useCart'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'

function CartToggle() {
  const btnProps = useCartToggleButton()
  const { totalUniqueItems } = useCart()

  return (
    <>
      <Button {...btnProps} className="mx-3">
        cart: {totalUniqueItems}
      </Button>
      <Link to="http://chk.vtex-base1.tk/checkout">Go to checkout</Link>
    </>
  )
}

export default CartToggle
