import type { AnalyticsEvent } from '@faststore/sdk'
import { useAnalyticsEvent } from '@faststore/sdk'
import type { PropsWithChildren } from 'react'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

export const AnalyticsHandler = ({ children }: PropsWithChildren<unknown>) => {
  useAnalyticsEvent((event: AnalyticsEvent) => {
    window.dataLayer.push(event)
    import('./handlers/RequestCapture').then(({ sendRCEvent }) =>
      sendRCEvent(event)
    )
  })

  return children
}

export default AnalyticsHandler
