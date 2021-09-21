const {
  getSchema: storeApiGetSchema,
  getContextFactory: storeApiGetContextFactory,
} = require('@vtex/store-api')

const options = {
  platform: process.env.GATSBY_COMMERCE_PLATFORM,
  account: process.env.GATSBY_STORE_ID,
  environment: process.env.GATSBY_VTEX_ENVIRONMENT,
  channel: process.env.GATSBY_VTEX_CHANNEL,
}

const schema = storeApiGetSchema(options)
const contextFactory = storeApiGetContextFactory(options)

const getSchema = () => schema
const getContextFactory = () => contextFactory

module.exports = {
  getSchema,
  getContextFactory,
}
