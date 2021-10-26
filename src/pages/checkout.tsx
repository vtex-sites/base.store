import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'

const storeId = process.env.GATSBY_STORE_ID

function Page() {
  const { id } = useCart()

  return (
    <>
      <GatsbySeo nofollow noindex />
      <iframe
        title="checkout"
        src={`https://${storeId}.myvtex.com/checkout?orderFormId=${id}`}
        className="min-h-screen min-w-full"
      />
    </>
  )
}

export default Page
