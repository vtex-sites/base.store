import type { ViewItemListEvent } from '@faststore/sdk'
import { useAnalyticsEvent } from '@faststore/sdk'
import type { PropsWithChildren } from 'react'

import type { SelectItemEvent, ViewItemEvent } from '../product/useProductLink'
import type { VTEXAddToCartEvent, VTEXRemoveFromCartEvent } from './types'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

export type AnalyticsEvent =
  | ViewItemListEvent
  | ViewItemEvent
  | SelectItemEvent
  | VTEXAddToCartEvent
  | VTEXRemoveFromCartEvent

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
