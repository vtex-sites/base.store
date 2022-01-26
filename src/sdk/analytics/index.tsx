import React from 'react'
import type { AnalyticsEvent } from '@faststore/sdk'
import { useAnalyticsEvent } from '@faststore/sdk'
import { GoogleTagManager } from '@builder.io/partytown/react'

import storeConfig from '../../../store.config'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

const GTM_DEBUG_QUERY_STRING = 'gtm_debug'

export const AnalyticsHandler = () => {
  useAnalyticsEvent((event: AnalyticsEvent) => {
    // Cleans the ecommerce object before pushing a new one
    // This prevents the new data from getting perged with the previous one
    // which could lead do inacurate and old data being sent with events
    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push({ event: event.name, ecommerce: event.params })

    import(`./platform/${storeConfig.platform}`).then(
      ({ default: sendEvent }) => {
        sendEvent(event)
      }
    )
  })

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <GoogleTagManager
      key="gtm"
      containerId={storeConfig.analytics.gtmContainerId}
      enablePartytown={!window.location.search.includes(GTM_DEBUG_QUERY_STRING)}
    />
  )
}

export default AnalyticsHandler
