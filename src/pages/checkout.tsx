import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import { useCart } from 'src/sdk/cart/useCart'

const storeId = process.env.GATSBY_STORE_ID
const environment = process.env.GATSBY_VTEX_ENVIRONMENT

function Page() {
  const { id } = useCart()

  return (
    <>
      <GatsbySeo nofollow noindex />
      {id && (
        <iframe
          title="checkout"
          src={`https://${storeId}.${environment}.myvtex.com/checkout?orderFormId=${id}`}
          className="min-h-screen min-w-full"
        />
      )}
    </>
  )
}

export default Page
