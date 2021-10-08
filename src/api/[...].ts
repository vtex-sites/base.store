import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware'

const store = process.env.GATSBY_STORE_ID
const environment = process.env.GATSBY_VTEX_ENVIRONMENT

const middleware = createProxyMiddleware({
  target: `https://${store}.${environment}.com.br`,
  changeOrigin: true,
  onProxyReq: fixRequestBody,
})

export default middleware
