const {
  getSchema: storeApiGetSchema,
  getContextFactory: storeApiGetContextFactory,
} = require('@faststore/api')

const {
  platform,
  channel,
  api: { storeId, environment },
} = require('../../store.config')

const options = {
  platform,
  account: storeId,
  environment,
  channel,
}

const schema = storeApiGetSchema(options)
const contextFactory = storeApiGetContextFactory(options)

const getSchema = () => schema
const getContextFactory = () => contextFactory

module.exports = {
  getSchema,
  getContextFactory,
}
