import type { AnalyticsEvent } from '@faststore/sdk'
import { useAnalyticsEvent } from '@faststore/sdk'
import type { PropsWithChildren } from 'react'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

const GA_CLIENT_ID_KEY = 'main::store::ga::client_id'

// https://gist.github.com/kindy/35ccd6c60b650e7fd261
function generateClientId() {
  return `${Math.floor(Math.random() * 0x7fffffff)}.${Math.floor(
    Date.now() / 1000
  )}`
}

const getClientId = () => {
  let localClientId

  try {
    localClientId = localStorage.getItem(GA_CLIENT_ID_KEY)
  } catch (e) {
    console.error(e)
  }

  if (!localClientId) {
    localClientId = generateClientId()
    localStorage.setItem(GA_CLIENT_ID_KEY, localClientId)
  }

  return localClientId
}

export const AnalyticsHandler = ({ children }: PropsWithChildren<unknown>) => {
  useAnalyticsEvent((event: AnalyticsEvent) => {
    window.dataLayer.push(event)
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: getClientId(),
        event,
      }),
    })
  })

  return children
}

export default AnalyticsHandler
