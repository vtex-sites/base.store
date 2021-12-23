import { useAnalyticsEvent } from '@faststore/sdk'
import type { PropsWithChildren } from 'react'

export const AnalyticsHandler = ({ children }: PropsWithChildren<unknown>) => {
  useAnalyticsEvent((event) => {
    // eslint-disable-next-line
    console.log('EVENT', event)
    window.dataLayer.push(event)
  })

  return children
}

export default AnalyticsHandler
