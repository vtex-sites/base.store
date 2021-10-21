const platform = process.env.GATSBY_COMMERCE_PLATFORM

const account = 'fashioneurope'
const environment = 'vtexcommercestable'
const channel = '1'

module.exports = {
  // Primary default sales channel
  channel,
  // Proxy all requests from /api/ to the ecommerce platform
  platformProxy: `https://${account}.${environment}.com.br`,
  // Store API Options for schema and context factory
  apiOptions: {
    platform,
    account,
    environment,
    channel,
  },
  checkoutURL: (id) => `/checkout/?orderFormId=${id}`,
  // Redirects to make Smartcheckout to work
  redirects: [
    {
      fromPath: '/checkout/*',
      toPath: `https://${account}.${environment}.com.br/checkout/:splat`,
      statusCode: 200,
    },
    {
      fromPath: '/files/*',
      toPath: `https://${account}.vtexassets.com/files/:splat`,
      statusCode: 200,
    },
    {
      fromPath: '/arquivos/*',
      toPath: `https://${account}.vteximg.com.br/arquivos/:splat`,
      statusCode: 200,
    },
  ],
}
