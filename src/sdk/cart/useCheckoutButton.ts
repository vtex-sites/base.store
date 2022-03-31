import type { MouseEvent as ReactMouseEvent } from 'react'

import { useCart } from './useCart'
import * as storeConfig from '../../../store.config'

const { checkoutUrl } = storeConfig

export const useCheckoutButton = () => {
  const { isValidating, id } = useCart()

  const onClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
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
