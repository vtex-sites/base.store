import type { AnalyticsEvent } from '@faststore/sdk'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

// https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag
const measurementId = ''
const secretApi = ''
const ANALYTICS_URL = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${secretApi}`

interface AnalyticsRequestData {
  client_id: string
  event: AnalyticsEvent
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

const validateRequest = (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.send('')

    return false
  }

  if (!req.body.client_id) {
    res.statusCode = 400
    res.send('')

    return false
  }

  return true
}

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (!validateRequest(req, res)) {
    return
  }

  const { body } = req

  fetch(ANALYTICS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parseEventToGA4(body)),
  })

  res.setHeader('content-type', 'application/json')
  res.statusCode = 200
  res.send(JSON.stringify({ success: true, body }))
}

export default handler
