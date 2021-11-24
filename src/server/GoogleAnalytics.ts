import type { AnalyticsEvent } from '@faststore/sdk'
import type { Next } from 'compose-middleware'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

// https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag
const measurementId = process.env.GA_MEASUREMENT_ID
const secretApi = process.env.GA_API_SECRET
const ANALYTICS_URL = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${secretApi}`

interface AnalyticsRequestData {
  client_id: string
  event: AnalyticsEvent
}

const validateEventData = ({ client_id }: AnalyticsRequestData) => {
  if (!client_id) {
    return false
  }

  return true
}

const parseEventToGA4 = ({ client_id, event }: AnalyticsRequestData) => ({
  client_id,
  events: [
    {
      name: event.type,
      params: {
        ...event.data,
      },
    },
  ],
})

const sendEvent = async (
  req: GatsbyFunctionRequest,
  _: GatsbyFunctionResponse,
  next: Next<Promise<any> | undefined>
) => {
  const { body: data } = req

  if (!validateEventData(data)) {
    return
  }

  fetch(ANALYTICS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parseEventToGA4(data)),
  })

  await next()
}

export default sendEvent
