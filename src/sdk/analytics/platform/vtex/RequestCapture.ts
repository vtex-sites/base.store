import type { AnalyticsEvent } from '@faststore/sdk'

if (typeof window !== 'undefined') {
  window.vtexrca =
    window.vtexrca ||
    function vtexrca(...args) {
      // RCA script
      // eslint-disable-next-line
      ;(window.vtexrca.q = window.vtexrca?.q || []).push(args)
    }

  window.vtexrca.l = +new Date()
}

export function sendRCEvent(event: AnalyticsEvent) {
  window.vtexrca('sendevent', event.type, event)
}
