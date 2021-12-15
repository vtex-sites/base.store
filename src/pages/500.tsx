import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'

function Page() {
  const router = useRouter()
  const errorId = router.query.errorId?.toString()
  const fromUrl = decodeURI(router.query.fromUrl?.toString() ?? router.pathname)

  return (
    <>
      <NextSeo noindex nofollow />

      <h1>500</h1>
      <h2>Internal Server Error</h2>

      <div>
        The server errored with id {errorId} when visiting page {fromUrl}
      </div>
    </>
  )
}

export default Page
