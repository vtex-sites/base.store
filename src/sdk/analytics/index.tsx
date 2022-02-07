import type { AnalyticsEvent } from '@faststore/sdk'
import { useAnalyticsEvent } from '@faststore/sdk'

import storeConfig from '../../../store.config'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

const GTM_DEBUG_QUERY_STRING = 'gtm_debug'

/**
 * Google Tag Manager script adapted to be executed only when necessary.
 *
 * https://developers.google.com/tag-manager/quickstart
 */
export const googleTagManager = (opts: {
  containerId: string
  partytownScript: boolean
  dataLayerName?: string
}) =>
  `${
    opts.partytownScript ? '!' : ''
  }window.location.search.includes('${GTM_DEBUG_QUERY_STRING}=')&& 
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
 new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
 })(window,document,'script',${JSON.stringify(
   opts.dataLayerName ?? 'dataLayer'
 )},${JSON.stringify(opts.containerId)});`

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

  return null
}

export default AnalyticsHandler
