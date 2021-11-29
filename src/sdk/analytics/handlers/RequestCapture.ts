import type { AnalyticsEvent } from '@faststore/sdk'

const getVTEXRC = () => {
  if (!window.vtexrca) {
    window.vtexrca =
      window.vtexrca ||
      function () {
        // RCA script
        // eslint-disable-next-line
        ;((window.vtexrca as any).q = window.vtexrca?.q || []).push(arguments)
      }

    window.vtexrca.l = +new Date()
  }

  return window.vtexrca
}

export function sendRCEvent(event: AnalyticsEvent) {
  if (process.env.GATSBY_COMMERCE_PLATFORM === 'vtex') {
    const vtexrca = getVTEXRC()

    vtexrca('sendEvent', event.type, event)
  }
}
