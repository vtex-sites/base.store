import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import { useCart } from 'src/sdk/cart/useCart'

const platform = process.env.GATSBY_COMMERCE_PLATFORM ?? 'vtex'
const account = process.env.GATSBY_STORE_ID
const environment = process.env.GATSBY_VTEX_ENVIRONMENT

const useCheckoutUrl = (cartId: string) =>
  useMemo(() => {
    switch (platform) {
      case 'vtex':
        return `https://${account}.${environment}.com.br/checkout?orderFormId=${cartId}`

      default:
        return ''
    }
  }, [cartId])

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
