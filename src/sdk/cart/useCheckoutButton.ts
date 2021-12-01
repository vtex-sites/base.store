import { useCart } from './useCart'
import config from '../../../store.config'

const { checkoutUrl } = config

export const useCheckoutButton = () => {
  const { isValidating, id } = useCart()

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!isValidating && id) {
      window.location.href = `${checkoutUrl}?orderFormId=${id}`
    }
  }

  return {
    onClick,
    disabled: isValidating,
    'data-testid': 'checkout-button',
  }
}
