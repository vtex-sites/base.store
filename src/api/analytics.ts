import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import sendGAEvent from '../server/GoogleAnalytics'

const validateRequest = (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (req.method !== 'POST') {
    res.statusCode = 405
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

  sendGAEvent(body)

  res.setHeader('content-type', 'application/json')
  res.statusCode = 200
  res.send(JSON.stringify({ success: true }))
}

export default handler
