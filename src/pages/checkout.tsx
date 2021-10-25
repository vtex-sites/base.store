import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import { useCart } from 'src/sdk/cart/useCart'

const platform = process.env.GATSBY_COMMERCE_PLATFORM ?? 'vtex'

const urlsByPlatform: Record<string, (id: string) => string> = {
  vtex: (cartId: string) =>
    `https://${process.env.GATSBY_STORE_ID}.${process.env.GATSBY_VTEX_ENVIRONMENT}.com.br/checkout?orderFormId=${cartId}`,
}

function Page() {
  const { id } = useCart()
  const src = useMemo(() => urlsByPlatform[platform]?.(id), [id])

  return (
    <>
      <GatsbySeo nofollow noindex />
      <iframe title="checkout" src={src} className="min-h-screen min-w-full" />
    </>
  )
}

export default Page
