import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const useApplySearchState = () => {
  const router = useRouter()

  return useCallback(
    (url: URL) => {
      const link = `${url.pathname}${url.search}`

      router.push(link)
    },
    [router]
  )
}
