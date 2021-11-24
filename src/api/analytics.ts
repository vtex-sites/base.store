import type { Next } from 'compose-middleware'
import { compose } from 'compose-middleware'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import sendRCEvent from '../server/RequestCapture'
import sendGAEvent from '../server/GoogleAnalytics'

const validateRequest = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
  next: Next<Promise<any> | undefined>
) => {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.send('')

    return
  }

  await next()

  res.setHeader('content-type', 'application/json')
  res.statusCode = 200
  res.send(JSON.stringify({ success: true }))
}

export default compose([validateRequest, sendGAEvent, sendRCEvent])
