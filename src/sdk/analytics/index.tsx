import { useEffect } from 'react'
import { useAnalyticsEvent } from '@vtex/store-sdk'
import type { PropsWithChildren } from 'react'

export const AnalyticsProvider = ({ children }: PropsWithChildren<unknown>) => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
  }, [])

  useAnalyticsEvent((event) => {
    window.dataLayer.push(event)
  })

  return children
}

export default AnalyticsProvider
