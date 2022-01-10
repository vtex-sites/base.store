import type { AnalyticsEvent } from '@faststore/sdk'

export default function sendEvent(event: AnalyticsEvent) {
  window.NavigationCapture.sendEvent(event.name, event.params)
}
