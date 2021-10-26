import { useCart } from './useCart'

const storeId = process.env.GATSBY_STORE_ID
const environment = process.env.GATSBY_VTEX_ENVIRONMENT

export const useCheckoutButton = () => {
  const { isValidating, id } = useCart()

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!isValidating && id) {
      window.location.href = `https://${storeId}.${environment}.com.br/checkout?orderFormId=${id}`
    }
  }

  return {
    onClick,
    disabled: isValidating,
    'data-testid': 'checkout-button',
  }
}
