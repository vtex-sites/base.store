import { useAnalyticsEvent } from '@faststore/sdk'
import type { PropsWithChildren } from 'react'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

export const AnalyticsHandler = ({ children }: PropsWithChildren<unknown>) => {
  useAnalyticsEvent((event) => {
    window.dataLayer.push({ event: event.name, ecommerce: event.params })
  })

  return children
}

export default AnalyticsHandler
