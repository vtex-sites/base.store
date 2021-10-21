import { useAnalyticsEvent } from '@vtex/store-sdk'
import type { PropsWithChildren } from 'react'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

export const AnalyticsHandler = ({ children }: PropsWithChildren<unknown>) => {
  useAnalyticsEvent((event) => {
    window.dataLayer.push(event)
  })

  return children
}

export default AnalyticsHandler
