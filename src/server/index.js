/* eslint-disable react-hooks/rules-of-hooks */

/**
 * Polyfill for dataloader.
 * TODO: Remove it once this is fixed: https://github.com/graphql/dataloader/issues/249
 * */
require('setimmediate')

const {
  envelop,
  useExtendContext,
  useMaskedErrors,
  useAsyncSchema,
} = require('@envelop/core')
const { useGraphQlJit } = require('@envelop/graphql-jit')
const { useParserCache } = require('@envelop/parser-cache')
const { useValidationCache } = require('@envelop/validation-cache')
const { getContextFactory, getSchema } = require('@faststore/api')
const { GraphQLError } = require('graphql')

const persisted = require('../../@generated/graphql/persisted.json')
const storeConfig = require('../../store.config')

const persistedQueries = new Map(Object.entries(persisted))

const apiOptions = {
  platform: storeConfig.platform,
  account: storeConfig.api.storeId,
  environment: storeConfig.api.environment,
  channel: storeConfig.channel,
  hideUnavailableItems: storeConfig.api.hideUnavailableItems,
}

const apiSchema = getSchema(apiOptions)

const apiContextFactory = getContextFactory(apiOptions)

const isBadRequestError = (err) => {
  return err.originalError && err.originalError.name === 'BadRequestError'
}

const formatError = (err) => {
  console.error(err)

  if (err instanceof GraphQLError && isBadRequestError(err)) {
    return err
  }

  return new GraphQLError('Sorry, something went wrong.')
}

const getEnvelop = async () =>
  envelop({
    plugins: [
      useAsyncSchema(apiSchema),
      useExtendContext(apiContextFactory),
      useMaskedErrors({ formatError }),
      useGraphQlJit(),
      useValidationCache(),
      useParserCache(),
    ],
  })

const envelopPromise = getEnvelop()

const execute = async (options, envelopContext = { req: {} }) => {
  const { operationName, variables, query: maybeQuery } = options
  const query = maybeQuery || persistedQueries.get(operationName)
  const {
    req: { headers },
  } = envelopContext

  if (query == null) {
    throw new Error(`No query found for operationName: ${operationName}`)
  }

  const enveloped = await envelopPromise
  const {
    parse,
    contextFactory,
    execute: run,
    schema,
  } = enveloped(envelopContext)

  return run({
    schema,
    document: parse(query),
    variableValues: variables,
    contextValue: await contextFactory({ headers }),
    operationName,
  })
}

module.exports = {
  execute,
  schema: apiSchema,
}
