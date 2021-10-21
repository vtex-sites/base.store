/* eslint-disable import/no-nodejs-modules */
import { Agent } from 'https'
import { stringify } from 'querystring'

import { createProxyMiddleware } from 'http-proxy-middleware'
import type { Options } from 'http-proxy-middleware'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import * as storeConfig from '../../store-config'

type Middleware = (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
  next: () => void
) => void

const keepAliveAgent = new Agent({
  keepAlive: true,
  maxSockets: 50,
  maxFreeSockets: 10,
})

// Fix request body before sending to the origin server
const onProxyReq: Options['onProxyReq'] = (proxyReq, req) => {
  const { body } = req as any

  if (!body) {
    return
  }

  const contentType = proxyReq.getHeader('Content-Type')
  const writeBody = (data: string) => {
    // deepcode ignore ContentLengthInCode: bodyParser fix
    proxyReq.setHeader('Content-Length', Buffer.byteLength(data))
    proxyReq.write(data)
  }

  if (
    typeof contentType === 'string' &&
    contentType.includes('application/json')
  ) {
    writeBody(JSON.stringify(body))
  }

  if (contentType === 'application/x-www-form-urlencoded') {
    writeBody(stringify(body))
  }
}

const proxy = createProxyMiddleware({
  target: storeConfig.platformProxy,
  logLevel: 'warn',
  xfwd: true,
  changeOrigin: true,
  agent: keepAliveAgent,
  onProxyReq,
}) as Middleware

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  // Copy connection to socket to work on older implementations, like AWS Lambda or Netlify
  req.socket = req.socket || req.connection

  proxy(req, res, () => null)
}

export default handler
