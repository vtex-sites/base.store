import type { AnalyticsEvent } from '@faststore/sdk'

if (typeof window !== 'undefined') {
  window.vtexrca =
    window.vtexrca ||
    function () {
      // RCA script
      // eslint-disable-next-line
      ;((window.vtexrca as any).q = window.vtexrca?.q || []).push(arguments)
    }

  window.vtexrca.l = +new Date()
}

export function sendRCEvent(event: AnalyticsEvent) {
  window.vtexrca('sendevent', event.type, event)
}
