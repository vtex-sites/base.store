import type { AnalyticsEvent } from '@faststore/sdk'

export default function sendEvent(event: AnalyticsEvent) {
  window.sendrc(event.name, event.params)
}
