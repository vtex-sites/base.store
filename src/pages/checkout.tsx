import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'

function Page() {
  const { id } = useCart()

  return (
    <>
      <GatsbySeo nofollow noindex />
      <iframe
        title="checkout"
        src={`https://${process.env.GATSBY_STORE_ID}.${process.env.GATSBY_VTEX_ENVIRONMENT}.com.br/checkout?orderFormId=${id}`}
        className="min-h-screen min-w-full"
      />
    </>
  )
}

export default Page
