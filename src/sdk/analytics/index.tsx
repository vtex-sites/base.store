import type { AnalyticsEvent } from '@faststore/sdk'
import { useAnalyticsEvent } from '@faststore/sdk'
import type { PropsWithChildren } from 'react'

import useGetClientId from './hooks/useGetClientId'

export const AnalyticsHandler = ({ children }: PropsWithChildren<unknown>) => {
  const clientId = useGetClientId()

  useAnalyticsEvent((event: AnalyticsEvent) => {
    if (!clientId) {
      return
    }

    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        event,
      }),
    })
  })

  return children
}

export default AnalyticsHandler
