import type { AnalyticsEvent } from '@faststore/sdk'

export function sendRCEvent(event: AnalyticsEvent) {
  window.vtexrca('sendevent', event.type, event)
}
