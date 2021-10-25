import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import { useCart } from 'src/sdk/cart/useCart'

const { GATSBY_STORE_ID: account, GATSBY_VTEX_ENVIRONMENT: environment } =
  process.env

const useCheckoutUrl = (cartId: string) =>
  useMemo(
    () =>
      `https://${account}.${environment}.com.br/checkout?orderFormId=${cartId}`,
    [cartId]
  )

function Page() {
  const { id } = useCart()
  const src = useCheckoutUrl(id)

  return (
    <>
      <GatsbySeo nofollow noindex />
      <iframe title="checkout" src={src} className="min-h-screen min-w-full" />
    </>
  )
}

export default Page
