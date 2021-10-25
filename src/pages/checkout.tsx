import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'

const { GATSBY_STORE_ID: account, GATSBY_VTEX_ENVIRONMENT: environment } =
  process.env

function Page() {
  const { id } = useCart()

  return (
    <>
      <GatsbySeo nofollow noindex />
      <iframe
        title="checkout"
        src={`https://${account}.${environment}.com.br/checkout?orderFormId=${id}`}
        className="min-h-screen min-w-full"
      />
    </>
  )
}

export default Page
