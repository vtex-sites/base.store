import React, { lazy, Suspense } from 'react'
import usePerformanceTestFlag from 'src/hooks/usePerformanceTestFlag'

const PostalCodeInput = lazy(() => import('./PostalCodeInput'))

export default function PostalCodeWrapper() {
  const renderPostalCode = usePerformanceTestFlag()

  if (!renderPostalCode) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <PostalCodeInput />
    </Suspense>
  )
}
