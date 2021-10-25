import { navigate } from 'gatsby'

import { useCart } from './useCart'

export const useCheckoutButton = () => {
  const { isValidating } = useCart()

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!isValidating) {
      navigate('/checkout')
    }
  }

  return {
    onClick,
    disabled: isValidating,
    'data-testid': 'checkout-button',
  }
}
