import { useCart } from './useCart'

const storeId = process.env.GATSBY_STORE_ID
const environment = process.env.GATSBY_VTEX_ENVIRONMENT
const checkoutURL =
  process.env.GATSBY_CHECKOUT_URL ??
  `https://${storeId}.${environment}.com.br/checkout`

export const useCheckoutButton = () => {
  const { isValidating, id } = useCart()

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!isValidating && id) {
      window.location.href = `${checkoutURL}?orderFormId=${id}`
    }
  }

  return {
    onClick,
    disabled: isValidating,
    'data-testid': 'checkout-button',
  }
}
