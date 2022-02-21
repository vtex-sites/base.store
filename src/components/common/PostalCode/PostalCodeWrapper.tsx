import React, { useEffect, useState, lazy, Suspense } from 'react'

const PostalCodeInput = lazy(() => import('./PostalCodeInput'))

function PostalCodeWrapper() {
  const [renderPostalCode, setRenderPostalCode] = useState(false)

  useEffect(() => {
    if (!window.location.search.includes('__performanceTest')) {
      setRenderPostalCode(true)
    }
  }, [])

  if (!renderPostalCode) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <PostalCodeInput />
    </Suspense>
  )
}

export default PostalCodeWrapper
