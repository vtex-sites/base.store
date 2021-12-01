const api = require('@faststore/api')
const graphql = require('graphql')

const persisted = require('../../@generated/graphql/persisted.json')
const options = require('../../store.config')

const schema = api.getSchema(options)
const contextFactory = api.getContextFactory(options)
const persistedQueries = new Map(Object.entries(persisted))

const execute = async ({ operationName, variableValues }) => {
  const query = persistedQueries.get(operationName)

  if (query == null) {
    throw new Error(`No query found for operationName: ${operationName}`)
  }

  return graphql.execute({
    schema: await schema,
    document: graphql.parse(query),
    contextValue: contextFactory({}),
    variableValues,
    operationName,
  })
}

module.exports = {
  execute,
  schema,
}
