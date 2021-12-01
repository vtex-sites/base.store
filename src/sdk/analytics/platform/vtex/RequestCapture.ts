import type { AnalyticsEvent } from '@faststore/sdk'

export function sendRCEvent(event: AnalyticsEvent) {
  // This runs if the rc.js script hasn't loaded yet.
  if (!window.NavigationCapture) {
    window.vtexrca = {
      q: [],
    }
    window.vtexrca.q.push('sendevent', event.type, event)
  }

  window.NavigationCapture.sendEvent(event.type, event)
}
