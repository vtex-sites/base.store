import Icon from 'src/components/ui/Icon'
import IconButton from 'src/components/ui/IconButton'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'

function CartToggle() {
  const btnProps = useCartToggleButton()

  return (
    <IconButton
      {...btnProps}
      className="cart-toggle"
      aria-label={`Cart with ${btnProps['data-items']} items`}
      icon={<Icon name="ShoppingCart" width={32} height={32} />}
    />
  )
}

export default CartToggle
