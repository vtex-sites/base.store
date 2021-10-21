const {
  getSchema: storeApiGetSchema,
  getContextFactory: storeApiGetContextFactory,
} = require('@vtex/store-api')

const { apiOptions } = require('../../store-config')

const schema = storeApiGetSchema(apiOptions)
const contextFactory = storeApiGetContextFactory(apiOptions)

const getSchema = () => schema
const getContextFactory = () => contextFactory

module.exports = {
  getSchema,
  getContextFactory,
}
