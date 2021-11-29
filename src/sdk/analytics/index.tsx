import type { AnalyticsEvent } from '@faststore/sdk'
import { useAnalyticsEvent } from '@faststore/sdk'
import type { PropsWithChildren } from 'react'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

export const AnalyticsHandler = ({ children }: PropsWithChildren<unknown>) => {
  useAnalyticsEvent((event: AnalyticsEvent) => {
    window.dataLayer.push(event)
    import(`./platform/${process.env.GATSBY_COMMERCE_PLATFORM}`).then(
      ({ default: sendEvent }) => {
        sendEvent(event)
      }
    )
  })

  return children
}

export default AnalyticsHandler
