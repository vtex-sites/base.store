import type { AnalyticsEvent } from '@faststore/sdk'
import { useAnalyticsEvent } from '@faststore/sdk'
import type { PropsWithChildren } from 'react'

import useGetClientId from './hooks/useGetClientId'
import { getNavigationData } from './utils/navigation'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

export const AnalyticsHandler = ({ children }: PropsWithChildren<unknown>) => {
  const clientId = useGetClientId()

  useAnalyticsEvent((event: AnalyticsEvent) => {
    if (!clientId) {
      return
    }

    window.dataLayer.push(event)

    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        event,
        rcExtraData: getNavigationData(),
      }),
    })
  })

  return children
}

export default AnalyticsHandler
