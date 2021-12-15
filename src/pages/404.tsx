import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'

function Page() {
  const router = useRouter()
  const fromUrl = decodeURI(router.query.from?.toString() ?? router.pathname)

  return (
    <>
      <NextSeo noindex nofollow />

      <h1>Not Found: 404</h1>
      <div>This app could not find url {fromUrl}</div>
    </>
  )
}

export default Page
