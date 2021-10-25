import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'

const platform = process.env.GATSBY_COMMERCE_PLATFORM ?? 'vtex'
const storeId = process.env.GATSBY_STORE_ID
const environment = process.env.GATSBY_VTEX_ENVIRONMENT

const getCheckoutUrl = {
  vtex: (cartId: string) =>
    `https://${storeId}.${environment}.com.br/checkout?orderFormId=${cartId}`,
}[platform]

function Page() {
  const { id } = useCart()

  return (
    <>
      <GatsbySeo nofollow noindex />
      <iframe
        title="checkout"
        src={getCheckoutUrl?.(id)}
        className="min-h-screen min-w-full"
      />
    </>
  )
}

export default Page
